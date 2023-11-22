import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths"

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react({
      fastRefresh: !process.env.VITEST,
    }), tsConfigPaths()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.ts",
    },
  }),
);
