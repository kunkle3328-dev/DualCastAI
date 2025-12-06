import React from 'react';
import LiveStudio from '../components/LiveStudio.jsx';

/**
 * LiveStudioPage wraps the LiveStudio component in a page container.  It
 * explains the live call‑in mode and invites the user to interact with Nova
 * and Atlas in real time.
 */
export default function LiveStudioPage() {
  return (
    <div>
      <h2 className="section-title">Live Studio</h2>
      <p className="mb-4 text-white/80">
        Join Nova and Atlas live. Ask questions, interrupt the hosts and enjoy a
        dynamic conversation.
      </p>
      <LiveStudio />
    </div>
  );
}