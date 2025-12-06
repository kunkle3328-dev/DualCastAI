/*
 * lipSyncEngine.js
 *
 * A lightweight lip sync approximation that converts text into a series of
 * mouth openness values over a given duration.  This is not a phoneme‑level
 * solution but provides enough variation to animate a simple jaw or mouth
 * geometry in sync with speech playback.  For more precise results, plug in
 * viseme data from your TTS provider if available.
 */

/**
 * Approximate lip sync data by splitting the input text into tokens and
 * assigning a jaw open value based on the presence of vowel sounds.  The
 * returned array contains objects with a timestamp (0–1 normalised) and an
 * openness value between 0 and 1.  The consumer is responsible for scaling
 * timestamps to the actual audio duration.
 *
 * @param {string} text - the text being spoken
 * @param {number} steps - number of samples to return
 */
export function approximateLipSync(text, steps = 20) {
  const vowels = /[aeiouy]/i;
  const tokens = text.split(/\s+/);
  const total = tokens.length;
  const result = [];
  for (let i = 0; i < steps; i++) {
    const progress = i / (steps - 1);
    // Determine which token corresponds to this time slice
    const tokenIndex = Math.floor(progress * total);
    const token = tokens[tokenIndex] || '';
    // Count vowels in the token to determine openness
    const vowelCount = (token.match(vowels) || []).length;
    const openness = Math.min(1, vowelCount / 3);
    result.push({ time: progress, openness });
  }
  return result;
}

/*
 * TODO: Viseme Mapping
 *
 * If your TTS provider returns viseme or phoneme timing data, you can use
 * that information instead of this approximation.  Map viseme IDs to
 * specific mouth shapes (e.g. O, EE, AH) and interpolate between shapes.
 */