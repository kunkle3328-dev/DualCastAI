import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEpisodeById, deleteEpisode } from '../lib/episodeManager.js';
import { hostProfiles } from '../lib/hostProfiles.js';

/**
 * Displays the full transcript and metadata of a saved episode.  Users can
 * review highlights, read the show notes and jump to suggested topics.  A
 * delete button removes the episode from storage and returns to the library.
 */
export default function EpisodeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  useEffect(() => {
    setEpisode(getEpisodeById(id));
  }, [id]);
  if (!episode) {
    return <div>Loading…</div>;
  }
  const created = new Date(episode.createdAt);
  const dateStr = created.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold neon-text mb-1">{episode.title}</h2>
          <div className="text-sm text-white/60">{dateStr}</div>
        </div>
        <button
          onClick={() => {
            deleteEpisode(id);
            navigate('/');
          }}
          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <p className="text-white/80">{episode.description}</p>
      <div>
        <h3 className="text-xl font-semibold mb-2 neon-text">Transcript</h3>
        <div className="glass-panel p-4 space-y-2 text-sm">
          {episode.script.map((line, idx) => (
            <div key={idx} className="flex">
              <span className={`font-bold mr-2 ${line.speaker === 'nova' ? 'text-neon-teal' : line.speaker === 'atlas' ? 'text-electric-purple' : 'text-cyan-400'}`}>
                {line.speaker === 'user' ? 'You' : hostProfiles[line.speaker].name}:
              </span>
              <span className="flex-1">{line.text}</span>
            </div>
          ))}
        </div>
      </div>
      {episode.highlights && episode.highlights.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2 neon-text">Highlights</h3>
          <ul className="list-disc pl-6 space-y-1 text-white/80">
            {episode.highlights.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        </div>
      )}
      {episode.showNotes && (
        <div>
          <h3 className="text-xl font-semibold mb-2 neon-text">Show Notes</h3>
          <p className="text-white/80">{episode.showNotes}</p>
        </div>
      )}
      {episode.suggestions && (
        <div>
          <h3 className="text-xl font-semibold mb-2 neon-text">Suggested Topics</h3>
          <ul className="list-disc pl-6 space-y-1 text-white/80">
            {episode.suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}