import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
  },
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
});
