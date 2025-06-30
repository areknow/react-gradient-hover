const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const path = require("path");

module.exports = defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "example"),
  resolve: {
    alias: {
      "react-gradient-hover": path.resolve(__dirname, "src/index.ts"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: path.resolve(__dirname, "example-dist"),
  },
  base: process.env.NODE_ENV === "production" ? "/react-gradient-hover/" : "/",
});
