# AYLA — Wildlife Crime Investigation (alpha 0.1)

Prototype of a free, multilingual 3D investigation game about wildlife trafficking. **Ayla** is the playable investigator; **Winston** is her mentor.

## What works in this alpha

- Four illustrated, skippable prologue scenes explaining Ayla's backstory
- A procedurally built 3D intelligence center with third-person camera
- Ayla movement with **WASD** or arrow keys; drag mouse to rotate; **E** or clicking a glowing ring to interact
- On-screen movement pad for touchscreens
- Winston conversation; fictional OSINT terminal with four sources; map of route hypotheses; evidence board
- Evidence-based final assessment with three questions and an ending
- Portuguese, English and Spanish (English default); browser-local progress storage

**Training integrity:** Mission AY-001 is fictional. No identifiable real person, open investigation or real arrest is represented. Unverified claims remain labeled as leads. Future evidence from real public cases must be separately checked and adapted safely.

## Deploy using GitHub Pages

1. Upload the full contents of this folder to the **root** of `wcsbrintel/Ayla`, preserving `assets/`.
2. Open repository **Settings → Pages**.
3. Select **Deploy from a branch**, branch **main**, folder **/(root)**. Save.
4. Visit `https://wcsbrintel.github.io/Ayla/` after GitHub Pages reports a successful deployment.

Do not publish the game before reviewing the complete code and mission content. The initial prototype is intended for desktop browsers; mobile layout is experimental.

## Local development

Start a local static HTTP server in the folder (for example `python3 -m http.server 8080`) and open `http://localhost:8080/`. Babylon.js is loaded from `https://cdn.babylonjs.com/babylon.js`, so the first load requires internet access.

## Project structure

- `index.html` — screens, dialogs and case board
- `style.css` — UI, prologue and responsive design
- `game.js` — Babylon.js scene, story translations, player controls and evidence workflow
- `assets/intro-1.svg` … `intro-4.svg` — original vector prologue art

## Future enhancements

Model and animation improvements, voices, character customization, real public case adaptation with privacy review, additional chapters and accessibility testing. No analytics, paid platform or external account required.

The code and story in this prototype are provided for review and further editing. Do not treat its fictional evidence as a real-world allegation.