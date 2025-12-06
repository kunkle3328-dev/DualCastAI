import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for DualCast AI Studio Pro Max.
// The alias resolves "@" to the /src directory for convenient imports.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});