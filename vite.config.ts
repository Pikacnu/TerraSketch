import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      nodePolyfills(
      ), 
      sveltekit(),
    ],
    build: {
      rollupOptions: {
        treeshake: false,
        // output: {
        //   preserveModules: true
        // }
      }
    }
  };
});
