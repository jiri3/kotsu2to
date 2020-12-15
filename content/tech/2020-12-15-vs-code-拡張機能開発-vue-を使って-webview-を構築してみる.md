---
category: tech
date: 2020-12-15T02:41:07.903Z
updatedate: 2020-12-15T02:55:21.555Z
title: "[VS Code 拡張機能開発]Vue を使って Webview を構築してみる"
description: Visual Studio Code（VS Code） 拡張機能の開発において、Vue を使って Webview
  を構築してみました。その環境構築方法について紹介します。
tags:
  - Visual Studio Code
---
Visual Studio Code（VS Code） 拡張機能の開発において、Vue を使って Webview を構築してみたので、本記事にて紹介します。  
構築した Webview は、トップページに２つのリンクを配置しており、リンクを押すとそれぞれのページに切り替わるだけです（下の gif を参照下さい）。  
また、構築した環境は Vue(SFC) + TypeScript の環境です。  
[Github](https://github.com/jiri3/vscode-extension-practice/tree/master/vue-try) にて公開しています。

![サンプルとして構築したWebview](/media/vscode-extension-vue-sample.gif)

#### 環境構築のポイント

VS Code の Webview は通常のブラウザと同様の動きをするので、
webpack でバンドルした js ファイルを生成することがポイントです。  
あとは、その生成した js ファイルを HTML に読み込ませるだけです。

#### npm パッケージの依存性

VS Code 拡張機能開発のジェネレーター実行後（`$ yo code`後）、下記のパッケージを追加しました（`$ yarn add`しました）。

##### [webpack](https://webpack.js.org/)

- webpack
- webpack-cli

[公式のインストール手順](https://webpack.js.org/guides/installation/)に従いました。  
webpack v4 以降は、webpack-cli のインストールも必要とのことです。

##### [Loaders](https://webpack.js.org/concepts/#loaders)

- ts-loader
- vue-loader
- vue-template-compiler
- css-loader
- style-loader

webpack は、Javascript と JSON ファイルしかデフォルトでは処理できないので、
Loader を追加して他の形式のファイルも処理できるよう設定します。  
**ts-loader**は TypeScript 用です。  
[vue-loader](https://vue-loader-v14.vuejs.org/ja/)は、
[SFC（単一ファイルコンポーネント）](https://jp.vuejs.org/v2/guide/single-file-components.html)で Vue コンポーネントを開発するために利用します。また、**vue-template-compiler**は、Vue Loader の公式サイトの[Manual Setup](https://vue-loader.vuejs.org/guide/#manual-setup)に従いインストールしています。vue-template-compiler は vue パッケージ とバージョンの同期をとる必要があるとのことです。  
**css-loader**、**style-loader**は css 用です。[こちら（ics.media）](https://ics.media/entry/17376/)が参考になりました。

##### Vue

- vue
- vue-class-component
- vue-property-decorator
- vue-router

**vue**は Vue を利用するためで、
**vue-class-component**、**vue-property-decorator**は Vue で TypeScript 環境で開発するためにインストールしています。  
そして、**vue-router**は、シングルページアプリケーションを構築するためにインストールしています。

#### webpack の設定

webpack.config.js は次の通りです。

```javascript
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: `./media/main.ts`,
  output: {
    path: `${__dirname}/media/dist`,
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.vue$/,
        use: [{ loader: "vue-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".vue", ".ts"],
    alias: {
      vue$: `vue/dist/vue.esm.js`,
    },
  },
  plugins: [new VueLoaderPlugin()],
};
```

webpack の設定は下記の情報を参考にしています。

- [さまざまなビルドについて](https://jp.vuejs.org/v2/guide/installation.html#%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%93%E3%83%AB%E3%83%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [webpack Configuration](https://vue-loader.vuejs.org/guide/#manual-setup)
- [Module](https://webpack.js.org/configuration/module/)
- [TypeScript Vue Starter](https://github.com/microsoft/TypeScript-Vue-Starter#adding-webpack)

#### webpack のエントリーファイル

エントリーファイルでは、Vue の生成と、VueRouter の設定をしています。  
vue ファイルを import する際、`//@ts-ignore`を利用していますが、
ts ファイルから vue ファイルの import が上手くいかないようなので、
`//@ts-ignore`で警告を無視しています。
`//@ts-ignore`に抵抗がある場合は、[こちら](https://github.com/microsoft/TypeScript-Vue-Starter#single-file-components)に記載あるように、
定義ファイルを利用する方法もあります。

```javascript
// media/main.ts

//@ts-ignore
import Top from "./Top";
//@ts-ignore
import Example from "./Example";
//@ts-ignore
import Example2 from "./Example2";

import Vue from "vue";
import VueRouter, { RouterOptions } from "vue-router";

const routerOption: RouterOptions = {
  routes: [
    { path: "/", component: Top },
    { path: "/example", component: Example },
    { path: "/example2", component: Example2 },
  ],
};
const router = new VueRouter(routerOption);
Vue.use(VueRouter);
router.push("/");
new Vue({
  el: `#entry`,
  template: `<router-view></router-view>`,
  router,
});
```

#### [extension.ts](https://github.com/jiri3/vscode-extension-practice/blob/master/vue-try/src/extension.ts)

こちらは拡張機能のエントリーファイルです。  
ここで、Webview のパネルを生成して、Webview の html を設定します。  
そして、設定する html にて、webpack で生成した script ファイルの読み込みと、
Vueインスタンスをマウントする要素を定義しておくだけです。  
Webview はセキュリティの観点上、ローカルファイルに直接アクセスできない仕様なので、script ファイルの読み込み方法については[こちら](https://code.visualstudio.com/api/extension-guides/webview#loading-local-content)を参照ください。

```javascript
import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension-practice.vue-try",
    () => {
      const panel = vscode.window.createWebviewPanel(
        `vue-practice`,
        `Vue Practice`,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          // VS Codeのタブを切り替えるとTopページに強制的に戻るのを防ぐ。
          // ただし、メモリ消費が大きいとのこと。
          // https://code.visualstudio.com/api/extension-guides/webview#retaincontextwhenhidden
          retainContextWhenHidden: true,
        }
      );
      panel.webview.html = getWebviewContent(context, panel.webview);
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview
): string {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.file(
      path.join(context.extensionPath, "media", "dist", "main.js")
    )
  );
  return `<!DOCTYPE html>
          <html lang="ja">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Hello</title>
          </head>
          <body>
              <div id="entry"></div>
              <script src=${scriptUri}></script>
          </body>
          </html>`;
}

export function deactivate() {}
```

#### 拡張機能の実行

拡張機能は`F5`でデバック起動できますが、その前に`$ webpack`を実行して、
html に読み込ませる js ファイルを生成しておく必要があります。  
サンプルで構築した環境は npm script を定義しておいたので、`$ npm run develop`
で`$ npx webpack --watch`が実行できるようにしています。

---

今回は、Vue を使って Webview を構築する方法について紹介しました。  
Vue を使うぐらい凝ったページを作るなら、そもそも他のプラットフォーム用のアプリとして作った方がいい気はしますが、興味本位です。