# AYLA — Wildlife Crime Investigation

AYLA is a free, multilingual, browser-based third-person 3D investigation game focused on wildlife trafficking and open-source intelligence (OSINT). **Ayla** is the playable investigator; **Winston** is her mentor.

## Alpha 0.6 — current features

- Alpha 0.6: Ayla smoothly approaches and sits at the OSINT workstation, using sustained typing gestures during source review
- Winston now follows a short roaming patrol within the open west corridor and stops to speak with Ayla
- Cinematic camera transitions focus on Winston, the terminal, routes, evidence board and dossier before the panel opens; exploration camera is restored when panels close
- Localized cinematic cues in Portuguese, English and Spanish, with accessible close-camera mode (C)

- Four-scene illustrated opening about Ayla's background, with skip control
- Third-person exploration of a cinematic intelligence operations center built with Babylon.js
- Workstations, screens, source-review terminal, route-analysis display, evidence board, and dossier station
- Movement with **WASD** or arrow keys; mouse drag to orbit camera; **E** or highlighted interactions to inspect
- On-screen controls for touchscreens
- Dialogue with Winston; four case materials; source-reliability assessment; route hypotheses and evidence board
- Three-question evidence-based final assessment, mission ending, and browser-local progress
- Portuguese, English, and Spanish interfaces (English default)
- Articulated original 3D characters for Ayla and Winston, with refined facial and outfit details based on approved visual references
- Alpha 0.4 improves head movement, natural blinking, breathing, gait transitions, separately animated knees, idle states and dialogue gestures
- Alpha 0.5 adds lightweight procedurally generated PBR microtextures, finer facial and hair contours, outfit stitching and equipment details, contextual gestures at the OSINT terminal, GEOINT display, evidence board and dossier, and a close-up camera toggle with **C** or the camera button
- Improved facial features, individual hairstyles, field jackets, cargo trousers, boots, backpack and credentials
- Free built-in walk/run and idle motion, with character portraits on the opening screen and Winston dialogue
- Character generator uses built-in Babylon.js geometry, no paid or proprietary 3D model service

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
- `characters-v4.js`: baseline free 3D actors and articulated animation
- `character-fidelity-v5.js`: procedural materials and interaction poses
- `character-cinematics-v6.js`: sitting animation and contextual dialogue/work gestures
- `cinematics-v6.css`: accessible cinematic scene cues
- `visual-v5.css`: current visual enhancements and camera control
- `visual-v4.css`: current fine-tuning of the interface
- `characters-v3.js`: previous original character meshes retained as a rollback reference
- `characters-v3.css`: locally embedded approved character portrait assets
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

Further refine the procedural character geometry, potentially replace it with independently created rigged GLB meshes later, and add cinematic camera transitions and environmental audio, refine navigation and collision geometry, strengthen the evidence viewer, and test performance on multiple devices.

All code and source materials in this repository should be reviewed before production use.

## Character rendering limitations

The current AYLA characters are higher-detail procedural 3D characters, not photorealistic scans or image-to-3D conversions. Their proportions, clothing and hair are inspired by the approved concept art; facial likeness is approximate. Both characters can be explored and animated in-engine without external services or additional model fees.

## Validation

The character system was checked with automated JavaScript syntax and mock-scene tests for both Ayla and Winston (including idle, walk, and run cycles). GitHub Pages build validation is tracked in repository Actions. Full interactive browser/visual QA is still needed before treating this as a production release.

Alpha 0.5: Node-based simulated Babylon.js rig tests passed for both characters with idle, walk, run and interaction animation states. Full browser visual QA remains necessary; source textures are procedural, not scans of real people.

Alpha 0.6: JavaScript syntax checks and GitHub asset-link checks passed. Cinematic navigation and scene transitions still need full interactive browser visual QA across desktop and mobile. The mission remains a self-contained training scenario, not a case record describing a real investigation.
