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
        act7: resolve(root, "pages", "actividad007", "act.html"),
        act8: resolve(root, "pages", "actividad008", "act.html"),
        act9: resolve(root, "pages", "actividad009", "act.html"),
        act10: resolve(root, "pages", "actividad010", "act.html"),
        act11: resolve(root, "pages", "actividad011", "act.html"),
        act12: resolve(root, "pages", "actividad012", "act.html"),
        act13: resolve(root, "pages", "actividad013", "act.html"),
        act14: resolve(root, "pages", "actividad014", "act.html"),
        act15: resolve(root, "pages", "actividad015", "act.html"),
        act16: resolve(root, "pages", "actividad016", "act.html"),
        act17: resolve(root, "pages", "actividad017", "act.html"),
        act18: resolve(root, "pages", "actividad018", "act.html"),
        act19: resolve(root, "pages", "actividad019", "act.html"),
        act20: resolve(root, "pages", "actividad020", "act.html"),
        act21: resolve(root, "pages", "actividad021", "act.html"),
        act22: resolve(root, "pages", "actividad022", "act.html"),
        act23: resolve(root, "pages", "actividad023", "act.html"),
        act24: resolve(root, "pages", "actividad024", "act.html"),
        act25: resolve(root, "pages", "actividad025", "act.html"),
        act26: resolve(root, "pages", "actividad026", "act.html"),
        act27: resolve(root, "pages", "actividad027", "act.html"),
        act28: resolve(root, "pages", "actividad028", "act.html"),
        act29: resolve(root, "pages", "actividad029", "act.html"),
        act30: resolve(root, "pages", "actividad030", "act.html"),
        act31: resolve(root, "pages", "actividad031", "act.html"),
        act32: resolve(root, "pages", "actividad032", "act.html"),
        act33: resolve(root, "pages", "actividad033", "act.html"),
        act34: resolve(root, "pages", "actividad034", "act.html"),
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
