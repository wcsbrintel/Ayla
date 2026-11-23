/* AYLA 5.7 — Chopin piano soundtrack with rights-verified, same-origin recordings.
 * Track metadata and per-recording CC0 sources: assets/music/chopin-playlist.json.
 * The user-provided YouTube video is a repertoire reference, not an audio source.
 * No copyrighted YouTube audio is downloaded, streamed or extracted by this script.
 * If the verified local playlist is not available, the pre-existing CC0 piano
 * recording by Indieteur remains a temporary fallback.
 */
(function(){
  'use strict';
  const MANIFEST='assets/music/chopin-playlist.json';
  const ORIGINAL='https://opengameart.org/sites/default/files/Mystical%20Piano.mp3';
  const ENABLED_KEY='ayla-music-enabled';
  const VOLUME_KEY='ayla-music-volume';
  const CHECKPOINT_KEY='ayla-chopin-track-index';
  const START_VOLUME=12;
  const text={
    pt:{on:'LIG.',off:'DESL.',title:'Chopin · piano ambiente (gravações CC0)',fallback:'Piano ambiente CC0',volume:'Volume da música',track:'Próxima peça de Chopin'},
    en:{on:'ON',off:'OFF',title:'Chopin · ambient piano (CC0 recordings)',fallback:'CC0 ambient piano',volume:'Music volume',track:'Next Chopin piece'},
    es:{on:'ACT.',off:'DES.',title:'Chopin · piano ambiental (grabaciones CC0)',fallback:'Piano ambiental CC0',volume:'Volumen de la música',track:'Siguiente pieza de Chopin'}
  };
  const $=id=>document.getElementById(id);
  const lang=()=>text[(document.documentElement.lang||'en').slice(0,2)]||text.en;
  let wanted=true,volume=START_VOLUME,playing=false,mode='none',manifest=null,fetching=null,index=0;
  let requestSerial=0,consecutiveFailures=0;
  try{
    if(localStorage.getItem(ENABLED_KEY)==='false')wanted=false;
    const saved=localStorage.getItem(VOLUME_KEY);
    if(saved!==null&&Number.isFinite(Number(saved)))volume=Math.max(0,Math.min(100,Number(saved)));
    const stored=Number(localStorage.getItem(CHECKPOINT_KEY));
    if(Number.isSafeInteger(stored)&&stored>=0)index=stored;
  }catch(e){}
  const music=new Audio();
  music.preload='none';music.loop=false;music.volume=volume/100;
  music.setAttribute('aria-hidden','true');
  const button=document.createElement('button');
  button.type='button';button.id='ambienceButton';button.className='icon-button ambience-button';
  button.setAttribute('aria-pressed','false');
  const slider=document.createElement('input');
  slider.type='range';slider.id='ambienceVolume';slider.className='ambience-volume';
  slider.min='0';slider.max='100';slider.step='1';slider.value=String(volume);
  const host=document.querySelector('#topbar .header-actions');
  if(host){host.prepend(slider);host.prepend(button);}
  // One quiet, accessible skip control adjacent to the existing music UI.
  const nextButton=document.createElement('button');
  nextButton.id='chopinNext';nextButton.className='icon-button chopin-next hidden';nextButton.type='button';
  nextButton.textContent='⏭';nextButton.style.minWidth='34px';nextButton.style.padding='9px 8px';
  if(host)host.insertBefore(nextButton,slider.nextSibling);
  function persist(){
    try{
      localStorage.setItem(ENABLED_KEY,String(wanted));
      localStorage.setItem(VOLUME_KEY,String(volume));
      localStorage.setItem(CHECKPOINT_KEY,String(index));
    }catch(e){}
  }
  function currentTrack(){return manifest?.tracks?.[index]||null;}
  function paint(){
    const t=lang();
    button.textContent='♫ '+(playing?t.on:t.off);
    const current=currentTrack();
    const label=(mode==='chopin'&&current)?' — '+current.title:t.fallback;
    button.title=(mode==='chopin'?t.title:t.fallback)+label;
    button.setAttribute('aria-label',button.title);
    button.setAttribute('aria-pressed',String(playing));
    slider.title=t.volume;
    slider.setAttribute('aria-label',t.volume);
    nextButton.classList.toggle('hidden',!(manifest?.tracks?.length>1));
    nextButton.title=t.track;
    nextButton.setAttribute('aria-label',t.track);
  }
  function isValidManifest(data){
    if(!data||!Array.isArray(data.tracks)||data.tracks.length<1)return false;
    return data.tracks.every(t=>t&&t.license==='CC0 1.0'&&
      typeof t.src==='string'&&/^assets\/music\/chopin\/chopin-\d{3}\.mp3$/.test(t.src)&&
      typeof t.title==='string'&&Number.isFinite(t.seconds)&&t.seconds>60&&
      typeof t.source==='string'&&t.source.startsWith('https://commons.wikimedia.org/wiki/'));
  }
  async function getManifest(){
    if(manifest)return manifest;
    if(fetching)return fetching;
    fetching=fetch(MANIFEST,{cache:'no-cache'}).then(r=>{
      if(!r.ok)throw Error('No local licensed Chopin playlist ('+r.status+')');
      return r.json();
    }).then(data=>{
      if(!isValidManifest(data))throw Error('Invalid rights-audited Chopin manifest');
      manifest=data;
      index%=data.tracks.length;
      paint();
      return data;
    }).catch(err=>{
      console.warn('[AYLA music] Chopin playlist unavailable. Preserving existing CC0 piano:',err);
      return null;
    }).finally(()=>{fetching=null});
    return fetching;
  }
  function setTrackSrc(path){
    const target=new URL(path,document.baseURI).href;
    if(music.src!==target){music.pause();music.src=target;music.load();}
  }
  async function playCurrent(serial){
    if(!wanted||serial!==requestSerial)return;
    const data=await getManifest();
    if(!wanted||serial!==requestSerial)return;
    try{
      if(data){
        mode='chopin';
        setTrackSrc(currentTrack().src);
      }else{
        mode='fallback';
        setTrackSrc(ORIGINAL);
      }
      music.volume=volume/100;
      await music.play();
      if(!wanted||serial!==requestSerial){music.pause();return;}
      playing=true;consecutiveFailures=0;paint();persist();
    }catch(err){
      if(serial!==requestSerial||!wanted)return;
      if(err?.name==='NotAllowedError'){playing=false;mode='none';paint();return;}
      console.warn('[AYLA music] Could not play track:',err);
      playing=false;
      if(data&&consecutiveFailures++<Math.min(data.tracks.length,5)){
        index=(index+1)%data.tracks.length;
        persist();
        playCurrent(++requestSerial);
      }else{
        mode='none';paint();
      }
    }
  }
  function start(){
    if(!wanted||playing)return;
    const serial=++requestSerial;
    // Trigger the manifest retrieval within the opening user gesture;
    // browsers may require a second gesture for the first actual playback.
    playCurrent(serial);
    paint();
  }
  function stop(){
    wanted=false;playing=false;mode='none';requestSerial++;
    music.pause();persist();paint();
  }
  function toggle(){
    if(playing){stop();return;}
    wanted=true;persist();start();
  }
  function setVolume(value){
    volume=Math.max(0,Math.min(100,Number(value)||0));
    music.volume=volume/100;
    persist();paint();
  }
  function next(){
    if(!manifest?.tracks?.length)return;
    index=(index+1)%manifest.tracks.length;
    persist();
    const shouldPlay=wanted&&playing;
    playing=false;requestSerial++;music.pause();
    if(shouldPlay)playCurrent(++requestSerial);
    paint();
  }
  music.addEventListener('ended',()=>{
    if(!wanted||!playing)return;
    if(mode==='chopin'&&manifest?.tracks?.length){
      index=(index+1)%manifest.tracks.length;persist();
    }else music.currentTime=0;
    playing=false;playCurrent(++requestSerial);
  });
  music.addEventListener('error',()=>{
    if(!wanted||mode==='none'||!playing)return;
    if(mode==='chopin'&&manifest?.tracks?.length){
      console.warn('[AYLA music] Track missing; skipping safely.');
      playing=false;index=(index+1)%manifest.tracks.length;
      persist();playCurrent(++requestSerial);
    }else{playing=false;mode='none';paint();}
  });
  button.addEventListener('click',toggle);
  slider.addEventListener('input',()=>setVolume(slider.value));
  nextButton.addEventListener('click',next);
  new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  document.addEventListener('click',event=>{
    const target=event.target;
    if(!target?.closest||!wanted||playing)return;
    if(target.closest('#startButton,#resumeButton,#nextIntro,#skipIntro,[id^="missionPlay"],#aftermathContinue,#promotionRoom,#promotionArchive,#replayIntroduction'))start();
  },true);
  window.addEventListener('pagehide',()=>{requestSerial++;music.pause();playing=false;mode='none';});
  paint();
  window.AYLAAudioV9={
    start(){wanted=true;persist();start();},
    stop,
    enabled:()=>playing,
    setVolume,
    next,
    source:()=>mode==='chopin'?currentTrack()?.src:mode==='fallback'?ORIGINAL:null,
    title:()=>mode==='chopin'?currentTrack()?.title:'Mystical Piano — Indieteur (CC0)',
    credits:()=>manifest?.tracks?.map(t=>({title:t.title,performer:t.performer,source:t.source,license:t.license}))||[],
    playlist:()=>manifest
  };
})();