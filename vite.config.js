import { defineConfig } from "vite";
import { resolve } from "path";
const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
/*saco la base
root:"src"
outDir:"../dist"
*/
export default defineConfig({
  base: "/dhs-laberinto-js/",
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        act1: resolve(root, "pages", "actividad001", "act.html"),
        act2: resolve(root, "pages", "actividad002", "act.html"),
        act3: resolve(root, "pages", "actividad003", "act.html"),
        act4: resolve(root, "pages", "actividad004", "act.html"),
        act5: resolve(root, "pages", "actividad005", "act.html"),
        act6: resolve(root, "pages", "actividad006", "act.html"),
      },
    },
  },
  assetsDir: "img",
  assetsInclude: [
    "./interprete/acorn.js",
    "./interprete/interpreter.js",
    "**/*.css?type=text/css",
  ],
});
