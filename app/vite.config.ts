import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  define: {
    "process.env": {
      BACKEND_URL:
        process.env.BACKEND_URL ||
        "https://weather-web-application-api.vercel.app",
    },
  },
});
