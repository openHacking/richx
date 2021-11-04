import { defineConfig } from "vite";
import path from "path";
import { name, version } from "./package.json";
import createExternal from "vite-plugin-external";

const resolve = (url: string) => path.resolve(__dirname, url);

export default defineConfig({
  build: {
    lib: {
      entry: resolve("src/index.ts"),
      name: "toolbar",
      formats: ["es", "umd"],
      fileName: "richx-toolbar",
    },
    outDir: "./lib",
  },
  define: {
    pkgJson: { name, version },
  },
  esbuild: {
    jsxFactory: "_jsx",
    jsxFragment: "Fragment",
    jsxInject: `import {jsx as _jsx,Fragment} from 'react/jsx-runtime';`,
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly", // 开启dash到camelCase转换，// .apply-color -> applyColor
    },
  },
  server: {
    port: 3103,
    open: true, // Automatically open the app in the browser on server start.
  },
  plugins: [
    // createExternal({
    //   externals: {
    //     "@richx/core": "@richx/core",
    //   },
    // }),
  ],
});
