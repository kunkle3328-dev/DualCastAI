import React, { createContext, useState, useContext } from 'react';

/**
 * HostContext stores tunable parameters for each AI host.  The sliders exposed in
 * the Host Settings page update these values, which the conversation engine can
 * reference when generating dialogue.  Voice presets are also stored here to
 * allow runtime selection of speech synthesis voices.
 */
const HostContext = createContext();

// Default settings for Nova Reed and Atlas Wynn.
const defaultSettings = {
  nova: {
    humor: 0.7,
    energy: 0.8,
    formality: 0.3,
    debate: 0.6,
    empathy: 0.7,
    voicePreset: 'Warm Female',
  },
  atlas: {
    humor: 0.4,
    energy: 0.5,
    formality: 0.7,
    debate: 0.7,
    empathy: 0.5,
    voicePreset: 'Calm Male',
  },
};

export function HostProvider({ children }) {
  const [hostSettings, setHostSettings] = useState(defaultSettings);

  /**
   * Update a single setting for a host.
   * @param {string} host - either 'nova' or 'atlas'
   * @param {string} key - property name (humor, energy, formality, debate, empathy, voicePreset)
   * @param {number|string} value - new value for the property
   */
  function updateHostSetting(host, key, value) {
    setHostSettings((prev) => ({
      ...prev,
      [host]: {
        ...prev[host],
        [key]: value,
      },
    }));
  }

  return (
    <HostContext.Provider value={{ hostSettings, updateHostSetting }}>
      {children}
    </HostContext.Provider>
  );
}

export function useHostSettings() {
  return useContext(HostContext);
}