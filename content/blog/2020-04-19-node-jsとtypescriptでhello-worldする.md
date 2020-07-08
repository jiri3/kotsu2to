---
date: 2020-04-25T11:26:28.921Z
title: Node.jsとTypeScriptでHello Worldする
description: Node.jsとTypeScriptでHello Worldするまでのメモです。
tags:
  - TypeScript
  - webpack
  - Node.js
---
Node.jsとTypeScriptでHello Worldするまでのメモです。  
Mac & Node.jsがインストール済みを前提にしています。

## Node.jsでHello World

まず、Node.jsで「Hello World」を表示するJavaScriptを実行してみます。\
JavaScriptのプログラムは下記の通りです。

```javascript
// helloworld.js
var str = "Hello World";
console.log(str);
```

次にNode.jsを用いて上記のプログラムを実行します。\
コマンドラインで`node helloworld.js`を実行すると期待通りの動作をします。

```shell
$ node helloworld.js
Hello World
```

## TypeScriptでHello World

TypeScriptでHello Worldをしてみます。
まずはTypeScript環境を構築します。今回はローカルインストールの方法です。  
実行後、カレントディレクトリにnode_modulesが生成されています。

```shell
$ npm install typescript --no-save
npm WARN enoent ENOENT: no such file or directory, open '/Users/****/temp/hello/package.json'
npm WARN hello No description
npm WARN hello No repository field.
npm WARN hello No README data
npm WARN hello No license field.

+ typescript@3.8.3
added 1 package from 1 contributor in 26.528s
found 0 vulnerabilities
```

package.jsonがないと警告が出ていますが、今回は試しにTypeScriptを動かすだけなので無視して大丈夫です。\
ちなみにpackage.jsonは`npm install`したパッケージの依存性やバージョンなどを管理する場合に必要となるため、`npm init`を実行して生成しておいた方がいいです。

次にTypeScriptファイルを作成します。

```typescript
// tsHelloWorld.ts
let str = "Hello World";
str = 1;
console.log(str);
```

TypeScriptは型チェックしてくれるので、エラーが出るように2行目にわざと数値型を再代入しています。 \
TypeScriptの実行ファイルは`./node_modules/.bin/tsc`に保存されていますので、
それを利用して上記のTypeScriptファイルをコンパイルすると次の結果となります。
```shell
$ ./node_modules/.bin/tsc tsHelloWorld.ts
tsHelloWorld.ts:2:1 - error TS2322: Type '1' is not assignable to type 'string'.

2 str = 1;
  ~~~


Found 1 error.
```
2行目を削除して、再度実行すると期待通りの動作となります。
```shell
$ ./node_modules/.bin/tsc tsHelloWorld.ts
$ node tsHelloWorld.js
Hello World
```
ちなみに、[npx](https://www.npmjs.com/package/npx)を利用すると、`$ npx tsc tsHelloWorld.ts`でコンパイルが実行可能です。  
但しnpxは、Node >= 8.10 及び npm >= 5.6の環境が必要となります。

参考情報  
* [TypeScript](https://www.typescriptlang.org/)
* [Introducing npx: an npm package runner](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
