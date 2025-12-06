import React from 'react';
import { useHostSettings } from '../context/HostContext.jsx';

/**
 * HostSettings component exposes sliders and dropdowns to tune each host’s
 * personality traits and voice.  Changes propagate through the HostContext
 * enabling dynamic adjustment of the conversation engine without editing code.
 */
export default function HostSettings() {
  const { hostSettings, updateHostSetting } = useHostSettings();

  const hosts = [
    { key: 'nova', name: 'Nova Reed', colorClass: 'text-neon-teal' },
    { key: 'atlas', name: 'Atlas Wynn', colorClass: 'text-electric-purple' },
  ];

  const sliders = [
    { key: 'humor', label: 'Humor' },
    { key: 'energy', label: 'Energy' },
    { key: 'formality', label: 'Formality' },
    { key: 'debate', label: 'Debate Intensity' },
    { key: 'empathy', label: 'Empathy' },
  ];

  return (
    <div className="space-y-8">
      {hosts.map((host) => (
        <div key={host.key} className="glass-panel p-4">
          <h2 className={`text-xl font-semibold mb-4 ${host.colorClass}`}>
            {host.name}
          </h2>
          <div className="space-y-4">
            {sliders.map((slider) => (
              <div key={slider.key} className="flex items-center">
                <label className="w-40 text-sm">{slider.label}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={hostSettings[host.key][slider.key]}
                  onChange={(e) => updateHostSetting(host.key, slider.key, parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 w-8 text-right text-xs">{hostSettings[host.key][slider.key].toFixed(1)}</span>
              </div>
            ))}
            <div className="flex items-center mt-4">
              <label className="w-40 text-sm">Voice Preset</label>
              <select
                value={hostSettings[host.key].voicePreset}
                onChange={(e) => updateHostSetting(host.key, 'voicePreset', e.target.value)}
                className="flex-1 p-2 rounded-md bg-panel-bg border border-white/10 focus:outline-none focus:ring-2 focus:ring-neon-teal"
              >
                <option value="Warm Female">Warm Female</option>
                <option value="Calm Male">Calm Male</option>
                <option value="Energetic Neutral">Energetic Neutral</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}