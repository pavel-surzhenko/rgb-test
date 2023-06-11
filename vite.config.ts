import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/rgb-test',
    css: {
        postcss: {
            plugins: [
                autoprefixer({}) // add options if needed
            ],
        }
    }

});
