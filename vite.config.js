import { resolve } from 'path';
import { defineConfig } from 'vite';

// Vite config
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                tools: resolve(__dirname, 'tools.html'),
                timeline: resolve(__dirname, 'timeline.html'),
            },
        },
    },
    base: '/class-website/',
})