import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

const siteBasePath = process.env.SITE_BASE_PATH || '/';
const base = siteBasePath.endsWith('/') ? siteBasePath : `${siteBasePath}/`;

// https://vitejs.dev/config/
export default defineConfig({
	base,
	plugins: [
		tailwindcss(),
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
	],
});
