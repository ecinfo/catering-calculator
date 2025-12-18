import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enables external network access
    allowedHosts: [
      "349bbdf76349.ngrok-free.app",
      ".ngrok-free.app", // Covers all ngrok-free.app subdomains
    ],
  },
});
