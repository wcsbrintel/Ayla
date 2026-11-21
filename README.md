# AYLA — Wildlife Crime Investigation

AYLA is a free, multilingual, browser-based third-person 3D investigation game focused on wildlife trafficking and open-source intelligence (OSINT). **Ayla** is the playable investigator; **Winston** is her mentor.

## Alpha 0.9 — vintage intelligence headquarters

- Replaced the fluorescent laboratory atmosphere with a historic investigation study: warm plaster, dark oak floors, ceiling beams, fitted bookcases, reference books, desk lamps, period telephone, archival folders, optical equipment, a clock, and other furnishings.
- Added **Theo** (male analyst) and **Clara** (female analyst) as independent full-body NPCs with movement routes, a seated work interval, face-to-face encounters, and short PT/EN/ES dialogues. Their movements use the existing collision and pathfinding engine.
- Added opt-in procedural ambience: quiet keyboard clicks and low, unintelligible office conversation with an accessible on/off control and volume slider. The Web Audio Context starts only after a user gesture.
- Updated Ayla's and Winston's model material tinting and rig animation blending. Normalized horizontal root motion in donated animation clips to reduce startling walk-start jumps.
- Ensured Ayla and Winston orient toward one another during their discussions.
- Removed all distracting dynamic **Winston, OSINT, Evidence, GEOINT and Dossier** signboards and floor hoops. Invisible click targets and the E interaction prompt keep the workstations usable.
- Restored the correct viewing direction of the Observatory carpet mark, replaced poorly oriented caricature posters with archival prints and credited licensed animal photographs where network access permits.
- Archived wildlife reference images: *Ara macao* by Adam Jackson (CC0) and *Panthera onca* by Eduardo Estrada (CC BY-SA 3.0). See [Wikimedia Commons Macaw](https://commons.wikimedia.org/wiki/File:Ara_macao_408004141.jpg) and [Wikimedia Commons Jaguar](https://commons.wikimedia.org/wiki/File:Jaguar,_Panthera_Onca.jpg). External photographs are loaded on the client and fall back to archival designs if unavailable.
- Added a broader actor-collision check so all four characters respect others' occupied positions, and corrected the NPC exit/return routes for workstation chairs.
- Nothing relies on a paid 3D or audio platform.

**Technical status:** Syntax checks passed and the historic scene passed a deterministic mock-Babylon execution test with ~720 static/dynamic objects. Full WebGL/rendering, downloadable avatar asset loads, photoposter CORS availability and live NPC animations must be visually verified in the published game.

## Alpha 0.8 — current features

- Movement is now controlled by acceleration/deceleration rather than instantaneous jumps. Character rotation eases into walking direction, and rigged animation clips are blended.
- Circle-vs-AABB capsule-like collision against walls, desks, cabinets, chairs, racks, plants, the grounded backpack, and character-vs-character collision prevent movement through major solid objects.
- Ayla approaches the OSINT workstation along a collision-aware path before sitting. The sitting pose is driven by the imported character skeleton where the required bones are available.
- Winston uses collision-aware movement during his patrol and stops when another character blocks his path.
- A field backpack sits beside the OSINT workstation on the floor.
- Central floor rug uses the uploaded Observatory emblem; four wall posters contain wildlife reference artwork and anonymous investigative lead silhouettes.
- The previously dark wall now hosts a **local rotating 3D Earth visualization** with land outlines, geographic graticules, sample markers and illustrative routes. This is a game display inspired by the Observatory, **not a live feed or a representation of confirmed criminal routes**.
- Added walls, restrained flooring, timber accents, warm/neutral light sources, and more architectural details.
- Original model, CSS, and narrative systems remain in the repository. All features use free code and resources.



- **New primary gameplay characters:** textured, rigged, articulated full-body 3D avatars replacing visible procedural heroes, with animation clips for idle, walking, conversation and thought.
- Ayla uses an adapted female Rocketbox character base; Winston uses an adapted male base with gray hair materials. Both need further likeness and outfit refinement against the approved character references.
- Balanced, restrained lighting and tone mapping; no more excessive green/cyan floodlighting.
- Full procedural avatars kept as contingency only if the externally hosted GLB fails to load. An in-game 3D status indicator helps diagnose this.
- Free MIT-licensed character assets. No accounts, subscriptions or new service costs.



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

The primary characters now use freely licensed rigged GLB humans with textured surfaces and animation tracks; they are substantially more natural than the initial procedural meshes, but not photorealistic scans and not facially identical to the approved concept art. The GLBs are currently loaded from jsDelivr's public GitHub CDN; online access is required. The old procedural figures are retained only as fallback. Attribution and terms appear in THIRD_PARTY_NOTICES.md.

## Validation

The character system was checked with automated JavaScript syntax and mock-scene tests for both Ayla and Winston (including idle, walk, and run cycles). GitHub Pages build validation is tracked in repository Actions. Full interactive browser/visual QA is still needed before treating this as a production release.

Alpha 0.5: Node-based simulated Babylon.js rig tests passed for both characters with idle, walk, run and interaction animation states. Full browser visual QA remains necessary; source textures are procedural, not scans of real people.

Alpha 0.6: JavaScript syntax checks and GitHub asset-link checks passed. Cinematic navigation and scene transitions still need full interactive browser visual QA across desktop and mobile. The mission remains a self-contained training scenario, not a case record describing a real investigation.

Alpha 0.7.1: Rigged characters and restrained lighting are integrated in code, the model source is pinned to a public MIT-licensed GitHub commit, and scripts are cache-busted. JavaScript syntax and GitHub Pages deployment have been checked. In-game character rendering on desktop/mobile still requires visual verification: asset CDN availability, material appearance, glTF parser, and animation track names are not asserted as tested in a browser.

Alpha 0.8 implementation note: movement/collision paths passed deterministic local Node tests. JavaScript was syntax checked. Full live-browser testing of imported skinned-asset seating, globe geometry and textures remains necessary; the headless environment could not load the required remote Babylon.js and avatar packages. Collisions cover walls, major furniture, props and characters with simplified radii/boxes rather than per-triangle physics.
