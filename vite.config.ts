import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/countries": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
