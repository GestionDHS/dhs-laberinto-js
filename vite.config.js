import { defineConfig } from "vite";
import { resolve } from "path";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  base: "/dhs-laberinto-js/",
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        "pages/actividad001/act": resolve(root, "pages", "actividad001", "act.html"),
        "pages/actividad002/act": resolve(root, "pages", "actividad002", "act.html"),
        "pages/actividad003/act": resolve(root, "pages", "actividad003", "act.html"),
        "pages/actividad004/act": resolve(root, "pages", "actividad004", "act.html"),
        "pages/actividad005/act": resolve(root, "pages", "actividad005", "act.html"),
        "pages/actividad006/act": resolve(root, "pages", "actividad006", "act.html"),
        "pages/actividad007/act": resolve(root, "pages", "actividad007", "act.html"),
        "pages/actividad008/act": resolve(root, "pages", "actividad008", "act.html"),
        "pages/actividad009/act": resolve(root, "pages", "actividad009", "act.html"),
        "pages/actividad010/act": resolve(root, "pages", "actividad010", "act.html"),
        "pages/actividad011/act": resolve(root, "pages", "actividad011", "act.html"),
        "pages/actividad012/act": resolve(root, "pages", "actividad012", "act.html"),
        "pages/actividad013/act": resolve(root, "pages", "actividad013", "act.html"),
        "pages/actividad014/act": resolve(root, "pages", "actividad014", "act.html"),
        "pages/actividad015/act": resolve(root, "pages", "actividad015", "act.html"),
        "pages/actividad016/act": resolve(root, "pages", "actividad016", "act.html"),
        "pages/actividad017/act": resolve(root, "pages", "actividad017", "act.html"),
        "pages/actividad018/act": resolve(root, "pages", "actividad018", "act.html"),
        "pages/actividad019/act": resolve(root, "pages", "actividad019", "act.html"),
        "pages/actividad020/act": resolve(root, "pages", "actividad020", "act.html"),
        "pages/actividad021/act": resolve(root, "pages", "actividad021", "act.html"),
        "pages/actividad022/act": resolve(root, "pages", "actividad022", "act.html"),
        "pages/actividad023/act": resolve(root, "pages", "actividad023", "act.html"),
        "pages/actividad024/act": resolve(root, "pages", "actividad024", "act.html"),
        "pages/actividad025/act": resolve(root, "pages", "actividad025", "act.html"),
        "pages/actividad026/act": resolve(root, "pages", "actividad026", "act.html"),
        "pages/actividad027/act": resolve(root, "pages", "actividad027", "act.html"),
        "pages/actividad028/act": resolve(root, "pages", "actividad028", "act.html"),
        "pages/actividad029/act": resolve(root, "pages", "actividad029", "act.html"),
        "pages/actividad030/act": resolve(root, "pages", "actividad030", "act.html"),
        "pages/actividad031/act": resolve(root, "pages", "actividad031", "act.html"),
        "pages/actividad032/act": resolve(root, "pages", "actividad032", "act.html"),
        "pages/actividad033/act": resolve(root, "pages", "actividad033", "act.html"),
        "pages/actividad034/act": resolve(root, "pages", "actividad034", "act.html"),
        "pages/actividad035/act": resolve(root, "pages", "actividad035", "act.html"),
        "pages/actividad036/act": resolve(root, "pages", "actividad036", "act.html"),
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
