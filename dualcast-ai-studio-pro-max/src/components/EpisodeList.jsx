import React from 'react';
import EpisodeCard from './EpisodeCard.jsx';

/**
 * Renders a grid of episodes.  When no episodes exist, displays a friendly
 * message inviting the user to create their first episode.
 */
export default function EpisodeList({ episodes }) {
  if (!episodes || episodes.length === 0) {
    return (
      <div className="text-center py-10 text-white/70">
        You haven’t recorded any episodes yet. Click <span className="text-neon-teal font-medium">Create</span> to get started!
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {episodes.map((ep) => (
        <EpisodeCard key={ep.id} episode={ep} />
      ))}
    </div>
  );
}