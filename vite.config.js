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
        pages: resolve(root, "pages", "actividad001", "act1.html"),
        
      },
    },
  },
  assetsDir: "img",
  assetsInclude: ["./interprete/acorn.js", "./interprete/interpreter.js","**/*.css?type=text/css"],
});
