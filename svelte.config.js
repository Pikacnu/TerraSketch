import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			prerender: {
				default: true
			},
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: false
		})
	}
};