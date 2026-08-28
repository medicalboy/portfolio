import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  // No /api proxy: profile data is a static file generated into public/api by
  // scripts/gen-profile.mjs, so dev, preview and production all serve it the
  // same way and the site needs no backend.
});
