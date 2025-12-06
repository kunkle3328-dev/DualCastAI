import React, { useEffect, useState } from 'react';
import EpisodeList from '../components/EpisodeList.jsx';
import { getEpisodes } from '../lib/episodeManager.js';

/**
 * Dashboard page displays a list of previously generated episodes.  Episodes are
 * retrieved from localStorage on mount.  A call to action encourages users
 * without episodes to create a new one.
 */
export default function Dashboard() {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    setEpisodes(getEpisodes());
  }, []);
  return (
    <div>
      <h2 className="section-title">Episode Library</h2>
      <EpisodeList episodes={episodes} />
    </div>
  );
}