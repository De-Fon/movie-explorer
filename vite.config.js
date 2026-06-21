/**
 * 🏗️ vite.config.js — "The Construction Foreman"
 * This file tells the build tool (Vite) how to package your code for the
 * internet. It configures the React plugin for fast refresh during development,
 * and sets up the PWA (installable app) settings like icons and theme colors.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Movie Explorer',
        short_name: 'Movies',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#aa3bff',
        icons: [
          { src: '/icons/192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
