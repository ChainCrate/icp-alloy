import { defineConfig } from "vite";
import dotenv from "dotenv";
// import environment from "vite-plugin-environment";
// import viteReact from "@vitejs/plugin-react";
import path from "path"
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'
dotenv.config({ path: ".env" });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/frontend"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            {
              export: 'jsx',
              import: '__cssprop',
              module: '@emotion/react',
            },
          ],
          [
            '@babel/plugin-transform-react-jsx',
            { pragma: '__cssprop' },
            'twin.macro',
          ],
        ],
      },
    }),
    macrosPlugin(),
  ],
});


