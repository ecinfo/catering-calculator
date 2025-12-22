import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // Allows access from LAN / ngrok
    port: 3000,
    open: true,

    // Allow ngrok and similar tunneling hosts
    allowedHosts: [
      ".ngrok-free.app", // allows all ngrok-free subdomains
    ],
  },

  preview: {
    port: 4173,
    host: true,
    allowedHosts: [".ngrok-free.app"],
  },
});
