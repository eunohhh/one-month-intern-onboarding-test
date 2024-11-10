import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), sentryVitePlugin({
    org: "eunoh",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
});