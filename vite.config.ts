import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(), 
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.65, 0.8] },
      svgo: {
        plugins: [
          { name: 'preset-default', params: { overrides: { removeViewBox: false } } }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // three.js is huge and has no React deps — safe to isolate
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            // Everything else in one chunk — avoids circular inter-chunk deps
            // (react-router → @remix-run/router, loose-envify → js-tokens, etc.)
            return 'vendor';
          }

          if (id.includes('crossy-road')) return 'game-crossy';
          if (id.includes('flappy-bird')) return 'game-flappy';
          if (id.includes('chess')) return 'game-chess';
          if (id.includes('memory-card')) return 'game-memory';
          if (id.includes('tictactoe')) return 'game-tictactoe';

          if (id.includes('components/ui')) return 'ui-components';
          if (id.includes('assets')) return 'assets';
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react']
  }
}));
