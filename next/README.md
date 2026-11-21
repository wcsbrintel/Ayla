# AYLA — Visual Lab

This is an **isolated visual prototype** for the next browser-based version of AYLA. It lives at `/next/` and does not overwrite or modify the existing playable version at the root of the repository.

## Preview

When GitHub Pages finishes deploying, open:

https://wcsbrintel.github.io/Ayla/next/

## Current prototype

- Standalone third-person 3D headquarters in a historical study, using physically based materials and balanced cinematic lighting.
- Wood-paneled interiors, bookcases, carpet, archival maps, desks, computers and four animated characters.
- AYLA and Winston, plus two research staff, use freely licensed Rocketbox human models when available. An in-engine low-detail alternative remains if the external model CDN is unavailable.
- Camera orbit, WASD navigation, shift-to-run, keyboard E interaction, limited collision, and touch controls.
- Simple independent NPC movement, multilingual PT/EN/ES UI, and a short evidence-review demonstration.
- Optional low-volume room ambience; no autoplay.
- No paid engine or model generation service.

## Limitations

This is a *technical and visual foundation*, **not** a Rockstar/RDR2-quality game. The initial meshes and animations remain placeholders for later art-directed, rigged assets; collisions are simplified; UI panels are an initial demonstration; real-time ray tracing and sophisticated AI are not included.

The Rocketbox characters are part of Microsoft's MIT-licensed avatar library, through the Avatar Studio repository. The specific model CDN dependency and parent-project attribution are documented in [../THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). The characters are downloaded at runtime and require internet access. The room design and coding are original.

A successful static GitHub Pages deployment does **not** demonstrate the correctness of GPU rendering or animations. Full visual QA must be done in a supported browser. The old `/index.html` stays unchanged.

## Next steps

1. Validate rendering, movement, and collision in a browser on macOS.
2. Replace generic human avatars with approved original character likenesses and consistent outfits.
3. Improve locomotion using root-motion-aware animation blending or a state machine.
4. Build the study from optimized modular meshes and licensed realistic materials.
5. Bring across the OSINT evidence/provenance system and investigative narrative in stages.
