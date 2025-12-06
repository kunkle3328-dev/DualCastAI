import { hostProfiles } from './hostProfiles.js';

/*
 * conversationEngine.js
 *
 * The conversation engine is responsible for procedurally generating a
 * semi‑scripted conversation between Nova and Atlas based on a user‑provided
 * topic, tone, length and difficulty.  It uses lightweight heuristics and
 * phrase banks to construct a believable back‑and‑forth dialogue.  Because
 * there is no external language model available in this environment, the
 * generated content relies on predefined patterns and randomised phrasing.
 */

// Utility for random selection
function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate a simple timestamped ID for episodes
function generateId() {
  return 'ep-' + Date.now().toString(36);
}

/**
 * Compose a line of dialogue for a host based on their persona and current
 * settings.  Adjust humour, energy and formality by injecting keywords and
 * punctuation.  This helper demonstrates a rudimentary approach to stylistic
 * variation without a full natural‑language generator.
 *
 * @param {string} hostKey - 'nova' or 'atlas'
 * @param {string} content - the base content of the line
 * @param {object} settings - the hostSettings slice for this host
 * @returns {string}
 */
function styleLine(hostKey, content, settings) {
  let line = content;
  // Adjust energy: more energy yields more exclamation marks and shorter
  // sentences; lower energy yields longer sentences and more pauses.
  if (settings.energy > 0.7) {
    line = line.replace(/\./g, '!');
  } else if (settings.energy < 0.4) {
    line = line.replace(/,/g, ', and');
  }
  // Inject humour by adding a playful aside
  if (settings.humor > 0.6) {
    line += ' (just saying)';
  }
  // Adjust formality: lower formality uses contractions
  if (settings.formality < 0.5) {
    line = line.replace(/\bwill not\b/gi, "won't").replace(/\bis not\b/gi, "isn't");
  }
  return line;
}

/**
 * Generate an episode object based on user input and host settings.
 * @param {object} options - user selected parameters
 * @param {string} options.topic
 * @param {string} options.tone - e.g. 'fun', 'deep', 'investigative', 'motivational'
 * @param {string} options.length - 'short', 'standard', or 'long'
 * @param {string} options.difficulty - 'beginner', 'intermediate', 'advanced'
 * @param {object} hostSettings - current settings from the HostContext
 * @returns {object} episode with id, title, description, showNotes, highlights, suggestions and script
 */
export function generateEpisode({ topic, tone, length, difficulty }, hostSettings) {
  const id = generateId();
  // Determine approximate number of exchanges based on length
  const segmentCount = length === 'long' ? 14 : length === 'standard' ? 10 : 6;

  // Title and description construction
  const titleTemplates = [
    `The Future of ${topic}`,
    `${topic} Deep Dive`,
    `${topic}: What You Need to Know`,
    `${topic} Trends and Insights`,
  ];
  const title = pick(titleTemplates);
  const description = `Nova Reed and Atlas Wynn explore ${topic} in a ${tone} conversation geared toward ${difficulty} learners.`;

  // Script generation
  const script = [];
  // Cold open / teaser
  script.push({ speaker: 'nova', text: styleLine('nova', `Welcome back! Today we’re diving into ${topic}. Stay tuned!`, hostSettings.nova) });
  script.push({ speaker: 'atlas', text: styleLine('atlas', `It’s going to be an enlightening chat about ${topic}, from fundamentals to future implications.`, hostSettings.atlas) });
  // Branded intro
  script.push({ speaker: 'nova', text: styleLine('nova', `You’re listening to DualCast AI Studio Pro Max — I’m Nova Reed.`, hostSettings.nova) });
  script.push({ speaker: 'atlas', text: styleLine('atlas', `And I’m Atlas Wynn. Let’s get started.`, hostSettings.atlas) });
  // Topic setup
  script.push({ speaker: 'nova', text: styleLine('nova', `To kick things off, what exactly is ${topic}?`, hostSettings.nova) });
  script.push({ speaker: 'atlas', text: styleLine('atlas', `Great starting point. ${topic} refers to...`, hostSettings.atlas) });
  // Generate mid‑conversation exchanges
  const midPhrasesNova = [
    `I’ve seen ${topic} transform entire industries recently.`,
    `People often think about ${topic} in isolation, but it’s really part of a larger ecosystem.`,
    `One startup I spoke with compared ${topic} to “the new electricity.”`,
    `Let’s consider how ${topic} impacts creators and builders.`,
  ];
  const midPhrasesAtlas = [
    `From a systems perspective, ${topic} exposes both strengths and weaknesses in our assumptions.`,
    `Historically, similar phenomena to ${topic} followed predictable patterns.`,
    `When we abstract away the hype, ${topic} is about solving real problems with robust frameworks.`,
    `Let’s decompose ${topic} into its core components and see where the leverage lies.`,
  ];
  for (let i = 0; i < segmentCount; i++) {
    script.push({ speaker: 'nova', text: styleLine('nova', pick(midPhrasesNova), hostSettings.nova) });
    script.push({ speaker: 'atlas', text: styleLine('atlas', pick(midPhrasesAtlas), hostSettings.atlas) });
  }
  // Optional debate / tension
  script.push({ speaker: 'nova', text: styleLine('nova', `Some people argue that ${topic} is overhyped. What do you think, Atlas?`, hostSettings.nova) });
  script.push({ speaker: 'atlas', text: styleLine('atlas', `I’d caution against dismissing ${topic} outright, but scepticism forces us to refine our thinking.`, hostSettings.atlas) });
  // Live caller Q&A placeholder
  script.push({ speaker: 'nova', text: styleLine('nova', `Let’s bring in our caller. What’s on your mind?`, hostSettings.nova) });
  script.push({ speaker: 'user', text: `{{userQuestion}}` });
  script.push({ speaker: 'atlas', text: styleLine('atlas', `Thanks for that question! Here’s how ${topic} relates...`, hostSettings.atlas) });
  // Closing thoughts + CTA
  script.push({ speaker: 'nova', text: styleLine('nova', `This has been an amazing discussion on ${topic}. Any final thoughts, Atlas?`, hostSettings.nova) });
  script.push({ speaker: 'atlas', text: styleLine('atlas', `Stay curious and keep exploring. Until next time.`, hostSettings.atlas) });
  script.push({ speaker: 'nova', text: styleLine('nova', `Thanks for tuning in! Don’t forget to like and subscribe.`, hostSettings.nova) });

  // Extract highlight quotes (simple selection of some lines)
  const highlightIndices = [2, 4, Math.floor(script.length / 2), script.length - 3];
  const highlights = highlightIndices.map((i) => script[i].text);

  // Suggested next topics – naive suggestions based on the same domain
  const suggestions = [
    `How ${topic} intersects with ethics`,
    `${topic} and the creator economy`,
    `Scaling ${topic} for beginners`,
  ];

  // Compile show notes
  const showNotes = `In this episode, Nova and Atlas discuss ${topic}, exploring its nuances and implications. They answer listener questions and offer actionable insights.`;

  return {
    id,
    title,
    description,
    showNotes,
    highlights,
    suggestions,
    script,
    createdAt: new Date().toISOString(),
  };
}