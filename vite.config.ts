import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@/algorithms", replacement: path.resolve(__dirname, "src/algorithms") },
      { find: "@/lib", replacement: path.resolve(__dirname, "src/lib") },
      { find: "@/test", replacement: path.resolve(__dirname, "tests") },
      { find: "@/components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@/hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@/styles", replacement: path.resolve(__dirname, "src/styles") },
    ],
  },
});
