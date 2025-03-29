// vite.config.js
import { defineConfig, splitVendorChunkPlugin } from "file:///C:/Users/DELL/Desktop/Raw%20web%203/web3_D/web3_D/front/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/DELL/Desktop/Raw%20web%203/web3_D/web3_D/front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import obfuscatorPlugin from "file:///C:/Users/DELL/Desktop/Raw%20web%203/web3_D/web3_D/front/node_modules/vite-plugin-javascript-obfuscator/dist/index.cjs.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    obfuscatorPlugin({
      include: ["src/path/to/file.js", "path/anyjs/**/*.js", /foo.js$/],
      exclude: [/node_modules/],
      apply: "build",
      debugger: true,
      options: {
        debugProtection: true
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: void 0
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxERUxMXFxcXERlc2t0b3BcXFxcUmF3IHdlYiAzXFxcXHdlYjNfRFxcXFx3ZWIzX0RcXFxcZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXERFTExcXFxcRGVza3RvcFxcXFxSYXcgd2ViIDNcXFxcd2ViM19EXFxcXHdlYjNfRFxcXFxmcm9udFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvREVMTC9EZXNrdG9wL1JhdyUyMHdlYiUyMDMvd2ViM19EL3dlYjNfRC9mcm9udC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyxzcGxpdFZlbmRvckNodW5rUGx1Z2luICB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgb2JmdXNjYXRvclBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tamF2YXNjcmlwdC1vYmZ1c2NhdG9yXCI7XG5cbiBleHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgICAgb2JmdXNjYXRvclBsdWdpbih7XG4gICAgaW5jbHVkZTogW1wic3JjL3BhdGgvdG8vZmlsZS5qc1wiLCBcInBhdGgvYW55anMvKiovKi5qc1wiLCAvZm9vLmpzJC9dLFxuICAgIGV4Y2x1ZGU6IFsvbm9kZV9tb2R1bGVzL10sXG4gICAgYXBwbHk6IFwiYnVpbGRcIixcbiAgICBkZWJ1Z2dlcjogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBkZWJ1Z1Byb3RlY3Rpb246IHRydWUsXG4gICAgfSxcbiAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNjAwLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4gICJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1YsU0FBUyxjQUFhLDhCQUErQjtBQUNwWixPQUFPLFdBQVc7QUFDbEIsT0FBTyxzQkFBc0I7QUFFNUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQUMsTUFBTTtBQUFBLElBQU0saUJBQWlCO0FBQUEsTUFDckMsU0FBUyxDQUFDLHVCQUF1QixzQkFBc0IsU0FBUztBQUFBLE1BQ2hFLFNBQVMsQ0FBQyxjQUFjO0FBQUEsTUFDeEIsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1AsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNEO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCx1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
