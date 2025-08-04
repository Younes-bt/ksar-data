import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"


const isGitHubPages = process.env.GITHUB_PAGES === 'true';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: isGitHubPages ? '/ksar-data/' : '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})
