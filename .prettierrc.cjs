module.exports = {
  overrides: [
    {
      files: '*.html, *.scss, *.js, *.ts',
    },
  ],
  // 行末にセミコロン
  semi: true,
  // 末尾のカンマ
  trailingComma: "none",
  // アロー関数の引数のカッコを可能な限り省略する
  arrowParens: "avoid",
  // 長い行の折り返し位置
  printWidth: 100,
  // インデントのサイズ
  tabWidth: 2,
  // 改行コードの指定
  endOfLine: "lf",
  // 属性の改行
  singleAttributePerLine: true,
};
