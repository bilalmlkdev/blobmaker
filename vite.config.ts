import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Three.js/R3F is lazy-loaded only in 3D mode; its chunk is expected to be large.
    chunkSizeWarningLimit: 900,
  },
});
