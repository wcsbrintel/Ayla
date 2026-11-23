#!/usr/bin/env python3
"""Curate and bundle independently verified CC0 Chopin recordings from Wikimedia Commons.

Not a YouTube rip. Every track must have explicit CC0 metadata on its exact
Wikimedia Commons recording page. Output is same-origin MP3 for browser support.
"""
import hashlib
import html
import json
import pathlib
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
AGENT = "AYLA-Chopin-Curator/1.0 (https://github.com/wcsbrintel/Ayla; rights audit)"
ROOT = pathlib.Path(__file__).resolve().parents[1]
AUDIO = ROOT / "assets" / "music" / "chopin"
CATALOG = ROOT / "assets" / "music" / "chopin-playlist.json"
CREDITS = ROOT / "assets" / "music" / "CHOPIN-LICENSES.md"
TARGET = 4 * 60 * 60
# Order matters: prefer contemplative, solo-piano works for the intelligence room.
FAMILIES = [
    ("nocturnes", "Category:Audio files of nocturnes by Frédéric Chopin"),
    ("preludes", "Category:Audio files of preludes by Frédéric Chopin"),
    ("waltzes", "Category:Audio files of waltzes by Frédéric Chopin"),
    ("mazurkas", "Category:Audio files of mazurkas by Frédéric Chopin"),
    ("etudes", "Category:Audio files of études by Frédéric Chopin"),
    ("piano", "Category:Audio files of music by Frédéric Chopin"),
]
EXTENSIONS = (".ogg", ".oga", ".mp3", ".flac")
REJECT_WORDS = ("scale durations", "variation.mid", "variation.", "short", "excerpt", "sample", "ringtone", "synth", "demonstration", "reversed", "retuned", "432hz", "chiptune")


def request(url, retry=3):
    for attempt in range(retry):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": AGENT}), timeout=75) as r:
                return r.read()
        except Exception as error:
            print("RETRY", attempt + 1, url[:130], str(error), flush=True)
            if attempt == retry - 1:
                raise
            time.sleep(2 + attempt * 3)


def api(params):
    payload = {"format": "json", "formatversion": "2", **params}
    url = API + "?" + urllib.parse.urlencode(payload)
    return json.loads(request(url).decode("utf-8"))


def fetch_category(category):
    names = []
    cont = {}
    while True:
        doc = api({"action": "query", "list": "categorymembers", "cmtitle": category, "cmtype": "file", "cmlimit": "500", **cont})
        names.extend(page["title"] for page in doc.get("query", {}).get("categorymembers", []))
        if "continue" not in doc:
            break
        cont = doc["continue"]
    return sorted(set(names))


def details(names):
    for index in range(0, len(names), 30):
        doc = api({"action": "query", "prop": "imageinfo", "titles": "|".join(names[index:index+30]),
                   "iiprop": "url|mime|size|extmetadata", "iiextmetadatafilter": "LicenseShortName|Artist|Credit"})
        yield from doc.get("query", {}).get("pages", [])


def metadata(meta, key):
    value = meta.get(key, {})
    return html.unescape(re.sub("<[^>]+>", "", str(value.get("value", "")))).strip()


def collect():
    candidates = {}
    for family, category in FAMILIES:
        try:
            names = [name for name in fetch_category(category)
                     if name.lower().endswith(EXTENSIONS)
                     and not any(word in name.lower() for word in REJECT_WORDS)]
            print("CATEGORY", family, len(names), flush=True)
            for page in details(names):
                title = page.get("title", "")
                info = (page.get("imageinfo") or [{}])[0]
                license_name = metadata(info.get("extmetadata", {}), "LicenseShortName")
                mime = info.get("mime", "")
                if "CC0" not in license_name.upper() and not ("CC-ZERO" in license_name.upper()):
                    continue
                if not (mime.startswith("audio/") or mime in ("application/ogg", "application/x-flac")):
                    continue
                size = int(info.get("size") or 0)
                if size < 100_000 or size > 75_000_000:
                    continue
                key = re.sub(r"\.(oga|ogg|mp3|flac)$", "", title, flags=re.I)
                key = re.sub(r"\s*\([^)]*\)", "", key)
                key = re.sub(r"[^a-z0-9]+", "", key.lower())
                if key in candidates:
                    continue
                performers = metadata(info.get("extmetadata", {}), "Artist")[:220]
                if "Frédéric Chopin" in performers and len(performers)<40:
                    performers = ""
                candidates[key] = {"title":title, "family":family, "url":info.get("url"),
                                   "size":size, "performer":performers,
                                   "page":"https://commons.wikimedia.org/wiki/"+urllib.parse.quote(title.replace(" ","_"),safe=":/()"),
                                   "license":"CC0 1.0"}
        except Exception as error:
            print("CATEGORY_ERROR", category, str(error), flush=True)
    by_family = {}
    for item in candidates.values():
        by_family.setdefault(item["family"], []).append(item)
    for items in by_family.values():
        items.sort(key=lambda x:(x["size"] > 15_000_000, len(x["title"]), x["title"].lower()))
    ordered = []
    # Interleave genres so the selection remains varied throughout the session.
    while any(by_family.values()):
        for family,_ in FAMILIES:
            items=by_family.get(family,[])
            if items:
                ordered.append(items.pop(0))
    print("LICENSED_ELIGIBLE",len(ordered),"FAMILIES",{k:sum(x["family"]==k for x in ordered) for k,_ in FAMILIES},flush=True)
    return ordered


def probe(path):
    result = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries",
                                      "format=duration", "-of", "default=noprint_wrappers=1:nokey=1",
                                      str(path)], text=True).strip()
    return round(float(result), 3)


def build():
    candidates=collect()
    if not candidates:
        raise RuntimeError("No independently licensed CC0 recordings found. Do not publish empty soundtrack.")
    AUDIO.mkdir(parents=True,exist_ok=True)
    temp = AUDIO / "_candidate_download"
    tracks=[]
    duration=0
    for item in candidates:
        if duration>=TARGET:
            break
        try:
            blob=request(item["url"], retry=2)
            if len(blob)<100_000 or len(blob)>80_000_000:
                raise ValueError("Unexpected recording size")
            temp.write_bytes(blob)
            original_duration=probe(temp)
            if not 75 <= original_duration <= 1300:
                raise ValueError("Recording length outside full-work bounds")
            i=len(tracks)+1
            name="chopin-%03d.mp3"%i
            output=AUDIO/name
            subprocess.run(["ffmpeg","-hide_banner","-nostdin","-loglevel","error","-y",
                            "-i",str(temp),"-vn","-ac","2","-ar","44100",
                            "-b:a","96k","-map_metadata","-1",str(output)],check=True,timeout=95)
            seconds=probe(output)
            if abs(seconds-original_duration)>3:
                raise ValueError("Audio duration mismatch")
            duration+=seconds
            record={"src":"assets/music/chopin/"+name,
                    "title":re.sub(r"^File:","",re.sub(r"\.(ogg|oga|mp3|flac)$","",item["title"],flags=re.I)),
                    "performer":item["performer"],
                    "genre":item["family"],"seconds":seconds,"source":item["page"],
                    "license":"CC0 1.0","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/",
                    "sha256":hashlib.sha256(output.read_bytes()).hexdigest()}
            tracks.append(record)
            print("ADDED",i,record["genre"],round(seconds,1),"seconds; total minutes",round(duration/60,1),record["title"][:85],flush=True)
        except Exception as error:
            print("SKIP",item["title"],str(error)[:180],flush=True)
        finally:
            temp.unlink(missing_ok=True)
    if len(tracks)<15 or duration<3600:
        raise RuntimeError("Insufficient verified recordings to enable soundtrack safely: tracks=%d minutes=%.2f"%(len(tracks),duration/60))
    # No incomplete tracks are published. Current session loops when the set ends.
    manifest={"title":"AYLA | Chopin — CC0 piano collection",
              "composer":"Frédéric Chopin (1810–1849)",
              "sourceReference":"https://www.youtube.com/watch?v=fzDqfdmvw2o",
              "referenceNote":"Style reference only; the YouTube recording is not copied.",
              "licenseFilter":"CC0 1.0, verified on individual Wikimedia Commons file metadata",
              "trackCount":len(tracks),"totalSeconds":round(duration,3),"loop":True,
              "tracks":tracks}
    CATALOG.parent.mkdir(parents=True,exist_ok=True)
    CATALOG.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    lines=["# AYLA — Chopin soundtrack / recording rights","",
           "The video supplied by the user is **not copied**. These independently selected",
           "performances are drawn from Wikimedia Commons. Every included recording was",
           "marked **CC0 1.0** in the exact file's machine-readable licence metadata.",
           "Composition: Frédéric Chopin (1810–1849); recordings: individual performers below.",
           "",
           "Total: **%.1f hours of unique recordings**, %d tracks."%(duration/3600,len(tracks)),
           "Playback restarts at the first track once the licensed set ends.","",
           "| # | Work / recording | Performer (Commons metadata) | Duration | Source |",
           "|---|---|---|---:|---|"]
    for i,t in enumerate(tracks,1):
        title=t["title"].replace("|","/")[:125]
        performer=t["performer"].replace("|","/").replace("\n"," ")[:95] or "See source file"
        lines.append("| %d | %s | %s | %.1f min | [Commons / CC0](%s) |"%(i,title,performer,t["seconds"]/60,t["source"]))
    CREDITS.write_text("\n".join(lines)+"\n",encoding="utf-8")
    print("SUCCESS",len(tracks),"tracks",round(duration/3600,3),"hours",flush=True)

if __name__=="__main__":
    build()
