import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  root: "./src",
  build: {
    outDir: `../dist`,
    rollupOptions: {
      external: ["/src/main.ts"],
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];

          // ビルド時の CSS 名を明記してコントロールする
          if(extType === "css") {
            return `assets/style/main.css`;
          }
          return `assets/script/[name][extname]`;
        },
        chunkFileNames: "assets/script/[name].js",
        entryFileNames: "assets/script/[name].js",
      },
    },
  },
});
