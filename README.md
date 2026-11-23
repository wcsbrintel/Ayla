## AYLA 5.6.2 — Original character walking animations

- Fixed a motion issue affecting original realistic Rocketbox avatars (Ayla, Winston, Clara and Theo): the old transition code started the new Walk animation group at zero weight and gradually faded it in, which could leave the character visually sliding on some browsers.
- The new loader uses each GLB's authored **Idle**, **Walk**, **Talk**, **Confident**, and **Think** animation groups directly, at full weight. It also normalizes clip names with namespace prefixes and numeric suffixes.
- The loader checks for a native Walk clip with animation tracks before marking a realistic avatar ready. It does not create new skeleton poses or change any character's appearance, rig, scene navigation, collision, or saved mission state.
- Script cache version changed in `index.html` to ensure the updated loader is fetched by Windows browsers.
- Validation: JavaScript syntax and simulated transitions `Idle → Walk → Idle` passed for plain and namespaced clip identifiers. Actual visual rendering in Windows browsers still requires user verification.

## AYLA 5.6.1 — Correção de personagens ausentes em Windows

- **Causa confirmada no código:** o carregador escondia os personagens locais assim que começava a baixar modelos GLB externos do jsDelivr. Em redes lentas, bloqueios corporativos ou falhas de carregamento, Ayla, Winston, Clara e Theo podiam permanecer invisíveis.
- **Correção:** os personagens procedurais locais continuam visíveis e animados durante o carregamento; os modelos externos só os substituem após importação, verificação de geometria e preparação do material. Falhas restauram a representação local.
- **Compatibilidade manual:** o cabeçalho da Central tem agora o botão **3D: AUTO / 3D: LOCAL**. O modo LOCAL evita as tentativas de carregar os modelos externos e mantém os modelos locais. A escolha é persistida no navegador; a troca reinicia somente a página, sem apagar as missões.
- **Cache:** o carregador e o arquivo `game.js` receberam uma nova versão na página de entrada.
- **Validação:** sintaxe JavaScript e testes simulados de carregamento bloqueado e modo local passaram. Um teste visual em Windows/Edge/Chrome reais ainda é necessário.

## AYLA 5.6 — PEC MAN arcade

- Added **PEC MAN**, an original maze-chase mini-game available from the **PEC MAN** button inside the 3D operations center and from a small interactive arcade cabinet on the east side of the room.
- Player navigates an independently generated maze with arrow keys or WASD (on-screen direction buttons on touchscreens), collects clues, avoids three pursuers, and activates temporary protection through special clues.
- Includes level progression, points (10 for ordinary clues, 50 for special clues, 200 for neutralizing an opponent during protection, a 250-point bonus dossier, and 500 points for clearing a level), three lives, pause/resume, restart, and a high score.
- Provides Portuguese, English and Spanish UI strings; pressing **P** pauses and **Escape** returns to the operations center. The arcade pauses automatically when the browser tab loses focus.
- The **high score is saved locally** in `ayla-pec-man-record-v1`, independently from the five case missions, their checkpoints, authorization and the restricted Observatory.
- Files: `pec-man.js`, `pec-man.css`; links, arcade cabinet and interaction integration: `index.html` and `game.js`.
- Validated in an isolated JavaScript DOM/Canvas simulation: initial HUD, playable start, RAF ticks, pause, resume, exit callback, and presence of application integration hooks. A live browser/GitHub Pages render could not be independently verified in this session.

## AYLA 5.5 — More active Clara and Theo behavior

- Corrected Clara's initial position from a collision-blocked point near the right side of the room to a navigable coordinate (x=6.25, z=-1.10).
- Added **five Clara patrol/work destinations** and **four Theo destinations**, all checked against the current scene collision map, and three alternating clear meeting locations.
- Characters walk around the operations center between conversations, replan when mobile obstacles interfere, turn toward their interlocutor and use the existing talking animation.
- The first meeting begins after roughly 9–13 seconds of activity; subsequent encounters are scheduled after about 8–15 seconds of roaming/work, with mixed shorter and longer dialogue packs, rather than extended silent idle periods.
- A deterministic simulation with the actual navigation logic over 600 seconds recorded **10 conversations, approximately 110 meters of Clara movement**, and no stalled NPC meeting states; actual runtime varies because conversation order and destinations are random.
- Keeps the eight PT/EN/ES dialogue topics in `clara-theo-dialogues.js`. NPC conversation timing pauses when a mission panel or a Winston interaction is active.
- Sources: `crowd-v9.js` (version 2.2.0), loaded through `index.html`. 3D WebGL visual verification in a browser is still pending.

## AYLA 5.4 — Clara & Theo ambient intelligence conversations

- Replaced the old three-line dialogue loop with **eight randomized, fully localized conversation topics** in `clara-theo-dialogues.js`. PT, EN and ES each contain 67 dialogue turns distributed across 8 scenes; the long-form topics run roughly 40–75 seconds.
- Topics: WCS Brasil **IWT Global Observatory** and weekly reports; **CITES Appendices / Species+**; **TRAFFIC Wildlife Trade Portal**; **CITES Trade Database**; **GBIF** and taxonomy; **UNODC World Wildlife Crime Report**; container-movement inference limits; and a 2027 congress exchange.
- The congress conversation includes Theo asking Clara if she will attend next year, Clara saying she is overwhelmed by investigations and risks remaining behind a computer forever without strong results, and natural replies from Theo.
- `crowd-v9.js` now selects topics at random, avoids repeating the immediately previous scene, mixes short and long exchanges, varies work and conversation breaks, turns actors to face each other and switches captions with the selected language.
- Dialogue playback is paused and captions hidden while the player uses an investigation panel or talks to Winston; no new player-facing interaction is required.
- References are thematic learning sources, not claimed primary evidence about the missions.
- JavaScript syntax and a simulated 3D NPC update loop were validated. Full live browser/WebGL visual verification remains pending.

## AYLA 5.3 — Soft piano soundtrack

- Switched to **Mystical Piano**, by **Indieteur**, CC0, from OpenGameArt: https://opengameart.org/content/mystical-piano .
- The artist recommends replaying at **95 seconds** to make the music loop; the controller now follows this cue.
- Volume default is 12%; enable/mute and volume controls are unchanged, with saved user preferences.
- If the external track cannot load, AYLA plays a quiet original, synthesized piano-melody fallback (no space drones or office clicks). Playback is started by a user gesture.
- The previous Space Graveyard track is no longer used. The third-party MP3 source URL may be subject to host availability; full audio playback on GitHub Pages has not been verified.


## AYLA 5.1 — Observatory mark, replay introduction, full progress reset

- The game start screen displays a **background-free Observatory mark**, cropped from the existing Central rug SVG (`assets/observatory-rug.svg`) into `assets/observatory-mark-transparent.svg`. The mark is shown at 95% opacity (5% transparency), in the top-left corner.
- **Back to Home** reopens Ayla's visual introduction directly from the operations center or mission archive. **Replay introduction** is available on the start screen. Neither changes mission completion, saved evidence, promotion or level, and completing/skipping the introduction returns to the mission archive.
- **Reset progress** is available on the start screen and in the mission archive. It presents a localized confirmation in Portuguese, English or Spanish. Cancel changes nothing; confirmation resets all five missions, discoveries, unlocks, AY-003 follow-up and Level 2 promotion, returning Ayla to Level 1 and making only Mission 1 available.
- The full reset explicitly deletes the legacy `ayla-alpha-v01` storage key to prevent unwanted restoration, then writes a clean `ayla-missions-v2` state. Language preference and separate restricted-area authentication are unaffected.
- JavaScript syntax and UI behavior were simulated for introduction replay, cancellation, complete reset, Level 1 restoration and locked/unlocked mission states. Full graphical browser verification remains pending.

## AYLA 5.0 — Advanced SOCMINT: The Hidden Farm

- **AY-005 — The Hidden Farm** unlocks after completing AY-004, reading the AY-003 follow-up, and receiving **Level 2 / Intelligence Analyst** from Winston. It remains independently replayable and uses the same browser and export/import progress system.
- This is a **fictional in-game visual-location puzzle**, not an identification of a real person's property. The town **Vale das Garças**, sector **C4**, plot **07**, and alternatives **Campo Verde / A2 / 11** and **Serra Azul / B3 / 02** are invented references with no coordinates linked to real property.
- Two original generated and locally hosted photographic clues (`assets/mission5-social-1.webp` and `assets/mission5-social-2.webp`) depict the gate and aviary from different angles. They share a **yellow footbridge, red water tower, blue barn, and creek**. Four records in the OSINT terminal explain source provenance, feature correlation and a fictional land-register comparison.
- The terminal and fictional map provide a **direct, explicitly external link** to [Google Lens](https://lens.google.com/), [Google Earth](https://earth.google.com/web/) and [OpenStreetMap](https://www.openstreetmap.org/). These websites open in another tab and do **not** query game data automatically. No invented scene should be presented as a real Lens match or satellite site.
- Inside the integrated SOCMINT map workspace, the player selects the matching **town and plot**; the verified pairing is stored in `m5Town`, `m5Plot` and `m5Solved`. The final dossier is disabled until the player has solved the grid alongside the normal four-source, Winston, map and evidence-board checkpoints.
- Available in PT/EN/ES. Case material is in `mission5.js`, page styling in `missions-v2.css`, mission state in `missions-v2.js` and gameplay integration in `game.js`.
- The experience does not offer workflows for pinpointing an actual private property from social posts. If a real suspected wildlife offense is being investigated, attribution, location, identity and criminal activity require lawful independent verification by responsible authorities.

## AYLA 4.2 — Post-AY-004 case development and promotion

- After completing the **AY-004** dossier, a new **AY-003 case-development bulletin** becomes accessible both from the mission-completion screen and the mission archive; it is not a fifth mission.
- Narrative supplied for the game: Brazilian Federal Revenue (Customs) intercepts a man identified as **Ovir Mukalbahr** at Guarulhos, São Paulo, attempting to board with **38 parrot eggs**, after arriving from **Foz do Iguaçu, Paraná**. He is linked within the story to the masked telephone contact ending **6142** examined in AY-003. No actual airport seizure or real person's identity was independently verified for this storyline.
- The authorities' means of identification remain **undisclosed**. The story never claims AYLA's OSINT report led to the interception.
- The player must review the bulletin, return to the 3D operations center, interact with **Winston**, and complete a three-part debrief. Only then is Ayla promoted to **Level 2 — Intelligence Analyst**. The rank is visible in the HUD.
- The promotion, bulletin-seen flag, and pending-debrief status persist in the existing `ayla-missions-v2` browser save; export/import also transfers rank, and replay never revokes a previously awarded promotion.
- PT/EN/ES strings in `postmission.js`; new display screens are in `index.html` and `missions-v2.css`. Syntax, unlocking, bulletin, three dialogue steps, rank promotion, replay persistence and progress transfer were validated with JavaScript state and UI simulations. Full browser render remains unverified.

## AYLA 4.0 — The Six Crossings / Shark Fins

- **AY-004 — The Six Crossings** becomes available after AY-003 and preserves its own progress, replay status, and backup/export code within the existing local save.
- Scenario: field intelligence points to a Santa Catarina shipyard as a possible receipt, processing and storage site for shark fins awaiting Asian shipment. A retrospective check of an associated container shows **six voyages to Asia during 2025 and a port call at Hong Kong**. Hong Kong was also mentioned as a *probable* fin destination.
- **Important evidentiary distinction:** the container's travel record does not independently establish that any of the voyages carried shark fins, that Hong Kong was the final destination, or that an offense was committed at the site. This case is a fictionalized game narrative based on supplied scenario details, not an independently verified public accusation against an identifiable business or person.
- Four interactive records: shipyard lead, six-voyage container history, Hong Kong destination hypothesis, and urgent facility verification recommendation. The visual timeline intentionally uses six voyage slots **without inventing voyage dates, shipment weights, companies, IDs, or ports**.
- Completion requires Winston briefing, review of all four sources, geographic and evidence boards, and a three-question intelligence dossier. Priority response is a prompt **lawful referral to competent authorities** for facility checks and evidence preservation, not independent intervention.
- Available in PT/EN/ES. Assets: `mission4.js` and `assets/mission4-shipyard.svg`.
- Verified programmatically: JavaScript syntax, locked/unlocked state, progress retention, 6-slot exhibit, case evidence and urgency panel, and localization. Full visual browser render has not been independently verified.

## AYLA 3.0 — Online international wildlife trafficking

- **AY-003 — The International Offer** unlocks on completion of AY-002. The three-mission archive now supports independently saved progress, mission-by-mission replay and backup-code transfer across browsers.
- Ayla and Winston review **two original photographic illustrations** presented as social account posts; a masked contact identifier in the listing; an informant-supplied conversation referencing the same identifier; and an analytical note concerning a proposed airport movement of eggs. These visual assets are creative game characters, **not photographs or allegations involving an identifiable real person**.
- Four distinct evidence sources, four reviewed checkpoints, an international route-hypothesis panel, evidence board and three-question dossier are available in **Portuguese, English and Spanish**.
- The gameplay explicitly distinguishes the observed posts and recorded attempted recruitment from unverified ownership, identity, itinerary, actual boarding or international delivery. An informant's identifying details are not displayed.
- Assets: `assets/mission3-social-1.webp`, `assets/mission3-social-2.webp`, and `mission3.js`. The originals are stored locally in this GitHub repository and do not rely on external image hosting.
- Release logic was checked for syntax, mission unlocking, preserved achievements, existing save migration, exported progress import, and display of photos and message excerpts. Live browser rendering has **not** been visually verified here.

## AYLA 2.0.1 — Missions, unlocks, and saved progress

- **AY-001 — The Inconsistent Manifest** retains the original fictional OSINT evidence workflow.
- **AY-002 — The Duplicated Code** unlocks after completion of AY-001. This new fictional training case concerns a repeated bird-ring identifier; players analyze four independent records, an observed inspection location, possible documentation errors, and chain of custody. It does not allege a real seizure, individual, route, or criminal network.
- The mission archive distinguishes locked, available, in-progress, and completed missions. Each mission keeps its own checklist and submitted dossier status.
- Mission data is saved automatically using browser `localStorage` under `ayla-missions-v2`; existing `ayla-alpha-v01` saves migrate on load. A completed mission remains unlocked when replayed; replay resets only that mission's checklist.
- Returning players can choose a mission without replaying the introduction. A **MISSIONS** control in the scene and a **NEXT MISSION** control on the completion screen provide navigation.
- **COPY PROGRESS CODE** and **IMPORT PROGRESS** enable user-directed transfer between browsers/devices. There is currently **no cloud-sync or per-account saved state**; private browsing, cleared site data, or another device will not see local progress unless a code is imported. The code is a convenience backup, not a tamper-resistant credential.
- The protected Observatory communications access remains independent of the public training missions.

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
