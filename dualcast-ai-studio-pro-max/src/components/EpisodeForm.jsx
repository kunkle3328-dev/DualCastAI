import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateEpisode } from '../lib/conversationEngine.js';
import { saveEpisode } from '../lib/episodeManager.js';
import { useHostSettings } from '../context/HostContext.jsx';
import HostAvatar from './HostAvatar.jsx';

/**
 * Form for creating a new episode.  Users specify a topic, tone, length and
 * difficulty.  On submission the conversation engine generates a script and
 * persists it to localStorage via the episode manager.  A preview of the
 * hosts is shown to build excitement before generation.
 */
export default function EpisodeForm() {
  const navigate = useNavigate();
  const { hostSettings } = useHostSettings();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('fun');
  const [length, setLength] = useState('standard');
  const [difficulty, setDifficulty] = useState('beginner');
  const [generating, setGenerating] = useState(false);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!topic.trim()) return;
    setGenerating(true);
    // Generate the episode script and metadata
    const episode = generateEpisode({ topic, tone, length, difficulty }, hostSettings);
    // Save to localStorage
    saveEpisode(episode);
    setGenerating(false);
    // Navigate to the new episode detail page
    navigate(`/episode/${episode.id}`);
  }

  return (
    <form onSubmit={handleGenerate} className="max-w-xl mx-auto space-y-4">
      <div className="text-center flex justify-center space-x-8 my-4">
        <HostAvatar hostId="nova" hostColor="#00FFC6" label="Nova" />
        <HostAvatar hostId="atlas" hostColor="#A600FF" label="Atlas" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Topic</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 rounded-md bg-panel-bg border border-white/10 focus:outline-none focus:ring-2 focus:ring-neon-teal"
          placeholder="e.g. Artificial General Intelligence"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-2 rounded-md bg-panel-bg border border-white/10 focus:outline-none focus:ring-2 focus:ring-neon-teal"
          >
            <option value="fun">Fun</option>
            <option value="deep">Deep</option>
            <option value="investigative">Investigative</option>
            <option value="motivational">Motivational</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Length</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-2 rounded-md bg-panel-bg border border-white/10 focus:outline-none focus:ring-2 focus:ring-neon-teal"
          >
            <option value="short">Short (5–10 min)</option>
            <option value="standard">Standard (20–30 min)</option>
            <option value="long">Long (45–60 min)</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 rounded-md bg-panel-bg border border-white/10 focus:outline-none focus:ring-2 focus:ring-neon-teal"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-neon-teal text-black font-semibold shadow-md hover:shadow-neon disabled:opacity-50"
          disabled={generating}
        >
          {generating ? 'Generating…' : 'Generate Episode'}
        </button>
      </div>
    </form>
  );
}