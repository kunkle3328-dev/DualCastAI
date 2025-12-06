import React, { useEffect, useState, useCallback } from 'react';
import { generateEpisode } from '../lib/conversationEngine.js';
import { playHostSpeech } from '../lib/ttsEngine.js';
import { approximateLipSync } from '../lib/lipSyncEngine.js';
import HostAvatar from './HostAvatar.jsx';
import { useHostSettings } from '../context/HostContext.jsx';
import { hostProfiles } from '../lib/hostProfiles.js';

/**
 * LiveStudio orchestrates a real‑time conversation between Nova and Atlas and
 * incorporates user questions as they arrive.  The component plays each
 * utterance through the speech synthesis engine and animates the avatars in
 * sync.  When the script reaches a {{userQuestion}} placeholder, playback
 * pauses until the user submits a question via the input bar.  After the
 * question is added to the transcript, the conversation resumes.
 */
export default function LiveStudio({ initialTopic = 'the latest in AI' }) {
  const { hostSettings } = useHostSettings();
  const [script, setScript] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transcript, setTranscript] = useState([]);
  const [speakingHost, setSpeakingHost] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [awaitingQuestion, setAwaitingQuestion] = useState(false);

  // Generate a default episode when component mounts
  useEffect(() => {
    const episode = generateEpisode({ topic: initialTopic, tone: 'fun', length: 'short', difficulty: 'beginner' }, hostSettings);
    setScript(episode.script);
  }, []);

  // Playback loop: whenever currentIndex changes, speak the next line
  useEffect(() => {
    async function playNext() {
      if (currentIndex >= script.length) return;
      const line = script[currentIndex];
      // If we encounter the user placeholder, pause until user submits
      if (line.speaker === 'user') {
        setAwaitingQuestion(true);
        return;
      }
      setSpeakingHost(line.speaker);
      // Play speech and then update transcript
      await playHostSpeech({ hostId: line.speaker, text: line.text, preset: hostSettings[line.speaker].voicePreset });
      setTranscript((prev) => [...prev, line]);
      setSpeakingHost(null);
      setCurrentIndex((idx) => idx + 1);
    }
    playNext();
    // dependencies include script and currentIndex; hostSettings intentionally
    // excluded since voices rarely change mid‑session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, script]);

  // Handle user submitting a question
  const handleQuestionSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!userQuestion.trim()) return;
      // Insert the user question into the transcript
      const userLine = { speaker: 'user', text: userQuestion.trim() };
      setTranscript((prev) => [...prev, userLine]);
      setAwaitingQuestion(false);
      setUserQuestion('');
      // Skip over the placeholder and continue playback
      setCurrentIndex((idx) => idx + 1);
    },
    [userQuestion],
  );

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Avatars */}
      <div className="flex justify-center space-x-8">
        <HostAvatar hostId="nova" hostColor="#00FFC6" isSpeaking={speakingHost === 'nova'} label="Nova" />
        <HostAvatar hostId="atlas" hostColor="#A600FF" isSpeaking={speakingHost === 'atlas'} label="Atlas" />
      </div>
      {/* Transcript */}
      <div className="flex-1 overflow-y-auto glass-panel p-4 space-y-2 text-sm">
        {transcript.map((line, idx) => (
          <div key={idx} className="flex">
            <span className={`font-bold mr-2 ${line.speaker === 'nova' ? 'text-neon-teal' : line.speaker === 'atlas' ? 'text-electric-purple' : 'text-cyan-400'}`}>
              {line.speaker === 'user' ? 'You' : hostProfiles[line.speaker].name}:
            </span>
            <span className="flex-1">{line.text}</span>
          </div>
        ))}
        {awaitingQuestion && (
          <div className="text-center text-neutral-400 italic">Waiting for your question…</div>
        )}
      </div>
      {/* Input bar */}
      <form onSubmit={handleQuestionSubmit} className="flex space-x-2">
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          disabled={!awaitingQuestion}
          className="flex-1 p-3 rounded-lg bg-panel-bg border border-white/10 focus:outline-none focus:ring-2 focus:ring-neon-teal"
          placeholder={awaitingQuestion ? 'Ask a question to the hosts…' : 'Listening…'}
        />
        <button
          type="submit"
          disabled={!awaitingQuestion || !userQuestion.trim()}
          className="px-4 py-3 rounded-lg bg-neon-teal text-black font-semibold disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}