import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import path from "path";
import handlebars from "vite-plugin-handlebars";
import page from "./page";


const files = [];
const readDirectory = (dirPath) => {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);

    if (fs.statSync(itemPath).isDirectory()) {
      if (item === "components") continue;

      readDirectory(itemPath);
    } else {
      let name;

      if (path.extname(itemPath) !== ".html") continue;

      // nameを決定する
      if (dirPath === path.resolve(__dirname, "src")) {
        name = path.parse(itemPath).name;
      } else {
        const relativePath = path.relative(path.resolve(__dirname, "src"), dirPath);
        const dirName = relativePath.replace(/\//g, "_");
        name = `${dirName}_${path.parse(itemPath).name}`;
      }

      // pathを決定する
      const relativePath = path.relative(path.resolve(__dirname, "src"), itemPath);
      const filePath = `/${relativePath}`;

      files.push({ name, path: filePath });
    }
  }
};
readDirectory(path.resolve(__dirname, "src"));
const inputFiles = {};
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  inputFiles[file.name] = resolve(__dirname, "./src" + file.path );
}

//HTML上で出し分けたい各ページごとの情報
const pageData = page;

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["/src/main.ts"],
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];

          // ビルド時の CSS 名を明記してコントロールする
          if(extType === "css") {
            return "assets/style/main.css";
          }
          return "assets/script/[name][extname]";
        },
        chunkFileNames: "assets/script/main.js",
        entryFileNames: "assets/script/main.js",
      },
      // 生成オブジェクトを渡す
      input: inputFiles,
    },
  },
  /*
    プラグインの設定を追加
  */
  plugins: [
    handlebars({
      //コンポーネントの格納ディレクトリを指定
      partialDirectory: resolve(__dirname, "./src/components"),
      //各ページ情報の読み込み
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
});
