/*
 * ttsEngine.js
 *
 * Abstraction layer for text‑to‑speech.  By default this implementation uses
 * the browser’s built‑in Web Speech API (SpeechSynthesis) to speak text aloud.
 * A pluggable architecture allows you to swap in an external TTS service (e.g.
 * ElevenLabs, Google Cloud TTS) by replacing the speak() implementation.
 */

// Cache voices once they have been loaded
let cachedVoices = [];

function loadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      cachedVoices = voices;
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        cachedVoices = window.speechSynthesis.getVoices();
        resolve(cachedVoices);
      };
    }
  });
}

/**
 * Speak a given text for a particular host using a specified voice preset.  The
 * returned promise resolves once the utterance has finished.  If you wish to
 * integrate a streaming external TTS API, replace the body of this function
 * with calls to your provider and playback of the returned audio.
 *
 * @param {object} params
 * @param {string} params.hostId - 'nova' or 'atlas'
 * @param {string} params.text - text to synthesise
 * @param {string} params.preset - voice preset name
 */
export async function playHostSpeech({ hostId, text, preset }) {
  await loadVoices();
  const utterance = new SpeechSynthesisUtterance(text);
  // Attempt to find a matching voice by name substring
  if (preset) {
    const voice = cachedVoices.find((v) => v.name.toLowerCase().includes(preset.toLowerCase()));
    if (voice) {
      utterance.voice = voice;
    }
  }
  // Adjust rate and pitch based on host persona for subtle differences
  if (hostId === 'nova') {
    utterance.rate = 1.3;
    utterance.pitch = 1.1;
  } else if (hostId === 'atlas') {
    utterance.rate = 0.9;
    utterance.pitch = 0.95;
  }
  return new Promise((resolve) => {
    utterance.onend = resolve;
    window.speechSynthesis.speak(utterance);
  });
}

export function getAvailableVoices() {
  return new Promise((resolve) => {
    loadVoices().then(() => resolve(cachedVoices));
  });
}

/*
 * TODO: External TTS
 *
 * To integrate with an external TTS provider such as ElevenLabs or Google
 * Cloud TTS, replace the implementation of playHostSpeech() with a function
 * that sends the text to your API endpoint, receives a streaming or
 * complete audio file, and plays it using the Web Audio API.  Ensure that
 * your API keys and credentials are stored securely in environment variables
 * and never hardcoded into the client.
 */