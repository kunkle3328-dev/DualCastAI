import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { HostProvider } from './context/HostContext.jsx';
import './index.css';

// Entry point for the DualCast AI Studio Pro Max application.
// Wraps the root component in a BrowserRouter to enable client‑side routing.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HostProvider>
        <App />
      </HostProvider>
    </BrowserRouter>
  </React.StrictMode>,
);