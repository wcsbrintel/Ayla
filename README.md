# AYLA — Wildlife Crime Investigation

AYLA is a free, multilingual, browser-based third-person 3D investigation game focused on wildlife trafficking and open-source intelligence (OSINT). **Ayla** is the playable investigator; **Winston** is her mentor.

## Alpha 0.2 — current features

- Four-scene illustrated opening about Ayla's background, with skip control
- Third-person exploration of a cinematic intelligence operations center built with Babylon.js
- Workstations, screens, source-review terminal, route-analysis display, evidence board, and dossier station
- Movement with **WASD** or arrow keys; mouse drag to orbit camera; **E** or highlighted interactions to inspect
- On-screen controls for touchscreens
- Dialogue with Winston; four case materials; source-reliability assessment; route hypotheses and evidence board
- Three-question evidence-based final assessment, mission ending, and browser-local progress
- Portuguese, English, and Spanish interfaces (English default)

## Narrative and source policy

AY-001 is a self-contained **investigative training scenario**. The characters, case materials, and locations belong to the game's narrative. Do not treat them as historical records, evidence against actual persons, or a basis for real-world allegations. Future missions may incorporate checked, publicly documented events, with clear source provenance and appropriate safeguards. The player must distinguish verified case evidence from unconfirmed leads.

## Deployment

The game is hosted via GitHub Pages using the root of the `main` branch:

https://wcsbrintel.github.io/Ayla/

No Netlify service or separate backend is needed. Babylon.js is loaded from its official CDN, and typefaces are loaded from Google Fonts, so these external resources require internet access.

## Project structure

- `index.html`: screens, user interface, and game entry point
- `style.css`: core interface and responsive layout
- `ui-v2.css`: upgraded cinematic theme
- `game.js`: three-language narrative, evidence workflow, and 3D scene
- `assets/intro-*.svg`: illustrated prologue images
- `assets/title-visual.svg`: opening illustration
- `.nojekyll`: serve assets directly through GitHub Pages

## Local development

Run a static HTTP server in the project root:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080/ . Avoid testing through `file://`, because modern browser restrictions may prevent asset loading.

## Next milestones

Replace the initial procedural character geometry with original rigged animated models, add cinematic camera transitions and environmental audio, refine navigation and collision geometry, strengthen the evidence viewer, and test performance on multiple devices.

All code and source materials in this repository should be reviewed before production use.
