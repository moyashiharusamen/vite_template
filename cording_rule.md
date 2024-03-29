# # 0.前提条件

先方指定のコーディングルール、または仕様書の指定がある場合、そちらを優先して作成してください


# 1.HTML / CSS のバージョン

以下を準拠として作業してください

- HTML Living Standard
- CSS3

# 2.エディタ

Visual Studio Code の使用を推奨します

# 3.ディレクトリ構造

html ファイルは案件ディレクトリのルートに、
リソースファイル（img, css, js）は「asset」ディレクトリ内に格納してください

# 4.HTML, CSS, JavaScript 共通

## 4.1 基本

文字コード : utf-8
改行コード : LF
インデント : スペース2

## 4.2 パス

指定方法はルート相対パスを使用してください
各階層における index ファイルを指定する場合、ファイル名（index.html）を直接指定せずに 「/」にて指定する

## 4.3 不要な文字の削除

以下のような不要な文字は納品物から削除してください

- 空白文字
  - エディタの機能などで視覚的に確認できるようにしてください
- 説明用でないコメントアウト

## 4.4 セルフチェック

ブラウザの検証ツールにて、コンソールエラーが出ていないことを確認してください
既存ファイルなどでのエラーの場合は対応不要です

# 5.HTML

## 5.1 コメントアウト

必要に応じて適切な説明文をコメントアウトにて記述してください

例 :
<!-- メインビジュアル -->

## 5.3 alt 属性

alt 属性は値が空だとしても必ず記述してください

✗
`<img src="__dummy__">`

○
`<img src="__dummy__" alt="">`

## 5.3.1 値

画像を説明する代替となるテキストです
以下を参考に正しい値を入れるようにしてください

https://developer.mozilla.org/ja/docs/Web/HTML/Element/img

## 5.4 br 要素

br 要素自体にも意味があるので、デザインのためだけに利用しないでください

https://developer.mozilla.org/ja/docs/Web/HTML/Element/br

## 5.5 button 要素

押下可能であり、かつリンクではない要素（JavaScript で動作するトグルのボタン部分など）は a 要素ではなく、 button 要素で実装してください

## 5.6 セルフチェック

コード作成後、ツールなどを使用してのセルフチェックは必ず行ってください

# 6.CSS

## 6.1 基本

css ファイルは全て外部ファイル化し、 link 要素で読み込んで使用してください
基本的には HTML 内にて style 要素での書き込みは行わないでください

## 6.2 コメントアウト

必要に応じて適切な説明文をコメントアウトにて記述してください

例 :
// ---------- ブロックの基底要素 ----------

// ---------- 見出し要素 ----------

// ---------- 画像要素 ----------

## 6.3 CSS設計

BEM （Block, Element, Modifier）を使用してください

## 6.3.1 クラスの命名時の考え方

命名は状態ではなく役割ですることを意識してください

✗
block__red
block__wide

○
block__header
block__list

## 6.3.2 状態別のクラス

基本設計は同様だが状態が違うことを表す場合、マルチクラスでの作成を行ってください
マルチクラスを作成する場合、「-（ハイフン）」始まりのクラス名としてください

例 :
`<div class="block__emelent -wide">`

## 6.3.3 単語の省略

単語の省略は行っていただいて構いませんが、他の人が見たときに意味が通じないものにはしないでください。

過度な省略
省略後の単語が一般的でない

以下例

○
background → bg
image → img

✗
content → cont

## 6.4 記述時のルール

- !important の使用は禁止
- カラーコード
  - 小文字
  - 16 進数表記で 6 桁全て同じ場合は 3 桁で省略表示する
- line-height は絶対値を使用せず相対値で指定する
  - ○ 1.5
  - ✗ 32px
- ショートハンド
  - 必要である場合（メディアクエリでの上書き、など）を除き、 1 つの値のためだけにショートハンドを使用しない
    - ✗ margin: 0 0 10px 0;
  - 打ち消すときの記述が増える、指定しなくてもよい箇所に 0 を指定することになる、など保守性が損なわれるため


## 6.5 セルフチェック

コード作成後、ツールなどを使用してのセルフチェックは必ず行ってください

# 7.JavaScript

記述ルールは [JavaScript Standard Style](https://standardjs.com/rules-ja.html) に準拠しています
js ファイルは全て外部ファイル化し、 script 要素で読み込んで使用してください
基本的には HTML 内にて script 要素での書き込みは行わないでください

## 7.1 ライブラリ

基本的には最新版を使用してください
既存ファイルとの兼ね合いで特定のバージョンや古いバージョンを参照するのか可です

# 8.画像

## 8.1 書き出した画像の拡張子

基本的には [webp](https://developers.google.com/speed/webp?hl=ja) を使用してください

## 8.2 命名規則

使用場所での意味が通るような命名にしてください
また、単語間の記号は「_（アンダースコア）」を使用してください

メインビジュアルで使用する → mv_xxx_01.jpg
ページ全般で使用する → index_xxx_02.png

## 8.2.1 連番

将来的に同名の画像が増えることを見越して、連番は必ず付与してください
付与する連番は1桁の場合、接頭辞として 0 をつけてください

description_05.png
graph_10.png

## 8.2.2 単語の省略

「## 5.3.3 単語の省略」と同様

## 8.3 画像の軽量化

納品する画像にはツールにて軽量化を行ってください
