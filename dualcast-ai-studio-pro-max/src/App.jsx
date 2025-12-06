import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';

// Page components
import Dashboard from './pages/Dashboard.jsx';
import CreateEpisode from './pages/CreateEpisode.jsx';
import LiveStudioPage from './pages/LiveStudioPage.jsx';
import HostSettingsPage from './pages/HostSettingsPage.jsx';
import EpisodeDetailPage from './pages/EpisodeDetailPage.jsx';

/**
 * Root application component.
 *
 * Renders a navigation bar at the top and switches between different pages
 * using React Router. The pages include a dashboard for saved episodes,
 * an episode generator, a live studio for call‑in sessions, a host settings
 * panel and an episode detail viewer.
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-studio-bg text-white font-sans">
      <Navigation />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateEpisode />} />
          <Route path="/studio" element={<LiveStudioPage />} />
          <Route path="/settings" element={<HostSettingsPage />} />
          <Route path="/episode/:id" element={<EpisodeDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}