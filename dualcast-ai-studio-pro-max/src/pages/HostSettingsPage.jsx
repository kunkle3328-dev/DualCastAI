import React from 'react';
import HostSettings from '../components/HostSettings.jsx';

/**
 * HostSettingsPage provides controls to tune the personalities of Nova and
 * Atlas.  Sliders adjust humour, energy, formality, debate intensity and
 * empathy.  A dropdown selects the voice preset for each host.
 */
export default function HostSettingsPage() {
  return (
    <div>
      <h2 className="section-title">Host Settings</h2>
      <p className="mb-4 text-white/80">
        Fine‑tune the behaviour of our hosts. Slide the controls to change how
        Nova and Atlas express themselves during episodes.
      </p>
      <HostSettings />
    </div>
  );
}