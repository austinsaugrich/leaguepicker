import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8008,
    strictPort: true,
    host: true,
  },
  build: {
    // The roster JSON is small enough to inline rather than emit as an asset.
    assetsInlineLimit: 4096,
  },
});
