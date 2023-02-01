import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePluginFonts } from 'vite-plugin-fonts'

export default defineConfig({
  plugins: [
    react(),
    VitePluginFonts({
      custom: {
        families: [
          {
            name: 'Campton',
            local: 'Campton',
            src: './src/fonts/*.{otf,woff,woff2}',
          }
        ],
        display: 'auto',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
  ],
})