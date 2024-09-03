import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";

export default {
  // Compiles TypeScript, SASS to JavaScript, CSS.
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      prerender: {
        default: true,
      },
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: false,
      strict: true,
    }),
  },
};
