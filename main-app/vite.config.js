// main-app/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        // must match preview build URL of music-library
        musicLibrary: "https://musiclib-demo.netlify.app/assets/remoteEntry.js",
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { port: 5000 },
})
