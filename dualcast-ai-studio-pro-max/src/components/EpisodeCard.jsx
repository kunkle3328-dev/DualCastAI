import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Displays a summary card for a podcast episode.  Clicking the card navigates
 * to the episode detail page.  The card shows the title, creation date,
 * highlights and basic metadata.
 */
export default function EpisodeCard({ episode }) {
  const created = new Date(episode.createdAt);
  const dateStr = created.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <Link to={`/episode/${episode.id}`} className="block glass-panel p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-1 neon-text bg-clip-text leading-snug">
        {episode.title}
      </h3>
      <div className="text-xs text-white/70 mb-2">{dateStr}</div>
      <p className="text-sm text-white/80 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {episode.description}
      </p>
      {episode.highlights && (
        <ul className="mt-2 text-xs text-neon-teal list-disc pl-4 space-y-1">
          {episode.highlights.slice(0, 2).map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>
      )}
    </Link>
  );
}