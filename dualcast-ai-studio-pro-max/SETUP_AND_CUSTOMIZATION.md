# Setup & Customization Guide

This document explains how to install dependencies, run the development
environment, and customise key aspects of **DualCast AI Studio Pro Max**.  The
project ships as a standard [Vite](https://vitejs.dev/) React application and
assumes you have a recent version of Node.js (`>=18`) and npm installed on
your machine.

## Installation

1. **Install dependencies**

   Navigate into the project directory and run:

   ```bash
   npm install
   ```

   This command installs React, React Router, Three.js, Tailwind CSS and other
   supporting libraries as defined in `package.json`.

2. **Start the development server**

   Launch a hot‑reloading development server on <http://localhost:5173> (port
   may vary) with:

   ```bash
   npm run dev
   ```

   You can now open a browser and explore the app.  Changes to source files
   under `src/` will trigger instantaneous reloads.

3. **Create a production build**

   To build an optimised version of the app for deployment, run:

   ```bash
   npm run build
   ```

   The generated files will be placed into a `dist/` folder.  Serve these
   statically from your preferred hosting platform (e.g. Firebase Hosting,
   Vercel, Netlify) or package them into a ZIP for Google AI Studio export.

## Configuring Text‑to‑Speech (TTS)

The default TTS implementation leverages the browser’s built‑in
[SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)【871081819255246†L611-L766】, which works offline and
requires no API keys.  Voices available to the end user depend on the
operating system and browser.  You can list voices or set a specific voice
preset in `Host Settings`.

To plug in a cloud TTS provider such as ElevenLabs or Google Cloud TTS:

1. Open `src/lib/ttsEngine.js`.
2. Replace the `playHostSpeech()` function with your own implementation that
   sends the text to your TTS API and plays back the streamed or returned
   audio.  Use the Web Audio API or HTML5 `<audio>` element to handle
   playback.
3. Store sensitive API keys and secrets securely (e.g. via environment
   variables or a backend proxy) and avoid hardcoding them into the client.

## Tuning Lip Sync

The included lip sync engine approximates mouth movement by sampling vowel
frequency across the spoken text and generating a sequence of mouth openness
values.  This simple heuristic is sufficient for basic jaw animation but can
be upgraded using viseme data:

1. If your TTS provider exposes phoneme or viseme timing data, parse it in
   your TTS module and pass the resulting events to the avatar component.
2. Implement mouth shapes (e.g. **O**, **EE**, **AH**) in place of the box
   geometry used in `HostAvatar.jsx`.
3. Map viseme IDs to shape weights and interpolate smoothly between them.

The `approximateLipSync()` function is defined in `src/lib/lipSyncEngine.js` and
can be modified to adjust the number of samples or the vowel‑to‑openness
mapping.

## Modifying Host Personas

Persistent host personas are defined in `src/lib/hostProfiles.js`.  Each
profile contains:

* **id** – short identifier used internally (`nova`, `atlas`).
* **name** – human‑readable display name.
* **description** – summary of the host’s style and interests.
* **tone** – high‑level description used when generating dialogue.
* **speakingStyle** – parameters controlling speech rate and story‑telling.
* **interests** – topics the host likes to reference.

Adjust these values to create new hosts or tweak existing personalities.  For
runtime adjustments such as humour or energy, use the sliders in the **Host
Settings** page.  These settings are stored in `HostContext` and passed to
the conversation engine when generating episodes.

## Changing the Theme

Colours, shadows and other stylistic values are defined in
`tailwind.config.cjs` and extended via Tailwind’s theming system.  The
glassmorphism effect relies on the CSS `backdrop-filter` property and
semi‑transparent backgrounds【832107668889395†L109-L146】.  To rebrand the studio:

1. Modify the accent colour definitions (`neon-teal`, `electric-purple`,
   `magenta`, `cyan`) in `tailwind.config.cjs`.
2. Adjust the `glass-panel` utility class in `src/index.css` to change blur
   intensity, opacity or borders.
3. Replace backgrounds or add new gradients in your components as desired.

## Using and Extending Episodes

Episodes are persisted to `localStorage` via `episodeManager.js`.  If you
intend to persist data server‑side, replace the storage functions with
calls to your backend API.  Each episode object contains:

* `id` – unique identifier
* `title`, `description`, `showNotes`
* `highlights` – an array of memorable quotes
* `suggestions` – suggested topics for future episodes
* `script` – array of `{ speaker: string, text: string }`

You can add additional metadata fields (tags, transcripts, audio URLs) and
update the UI accordingly.

## Advanced Customisation

* **Routing** – Additional pages can be added by extending the routes in
  `src/App.jsx`.
* **3D Avatars** – Replace the placeholder mesh in `HostAvatar.jsx` with a
  GLTF/VRM model loaded via `@react-three/drei`’s `useGLTF` hook.  Ensure the
  model has morph targets or bones for mouth animation.
* **State Management** – For larger applications consider replacing the simple
  context store with a library such as Zustand or Redux.

## Browser Compatibility and Performance

The glassmorphism design uses the `backdrop-filter` CSS property.  According
to OpenReplay’s guide on glassmorphism【832107668889395†L109-L146】, this feature is
widely supported in modern browsers (Chrome 76+, Safari 9+, Firefox 103+) but
requires fallbacks for older versions.  Mobile performance can be improved
by limiting the number of frosted panels and reducing blur radii.  Keep
animations lightweight and test on mid‑range devices to ensure smooth
playback【832107668889395†L109-L146】.

---

With these instructions you can install, run and customise DualCast AI Studio
Pro Max to suit your needs.  Happy podcasting!