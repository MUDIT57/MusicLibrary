
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        musicLibrary: "https://music-library-59si.vercel.app/assets/remoteEntry.js",
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { port: 5000 },
})
