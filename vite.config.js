import { defineConfig,splitVendorChunkPlugin  } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

 export default defineConfig({
  plugins: [react(),    obfuscatorPlugin({
    include: ["src/path/to/file.js", "path/anyjs/**/*.js", /foo.js$/],
    exclude: [/node_modules/],
    apply: "build",
    debugger: true,
    options: {
      debugProtection: true,
    },
  }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
  