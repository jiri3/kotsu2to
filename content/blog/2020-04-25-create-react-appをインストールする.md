---
date: 2020-05-03T06:31:21.174Z
title: Create React Appをインストールする
description: |-
  React + TypeScript環境で開発してみたかったので、Create React Appを利用してみました。
  Create React Appのインストール方法のメモです。
thumbnail: /media/react-app.png
tags:
  - React
  - TypeScript
  - Create React App
---
[Create React App](https://create-react-app.dev/)のインストール方法のメモです。  
React + TypeScript環境で開発してみたかったので、Create React Appを利用してみました。  
Create React Appは、
[Reactの公式サイト](https://ja.reactjs.org/docs/create-a-new-react-app.html)にてReact を学習中か、新しいシングルページアプリケーションを作成したい場合におすすめされているものです。

[こちら](https://create-react-app.dev/docs/getting-started)によると次のコマンドのみで環境構築ができるとのことです。  
※ Node.jsがインストール済の場合です。  
```shell
$ npx create-react-app my-app --template typescript
```
my-appは環境がインストールされるディレクトリ名となるので任意の文字列で良いです。

インストール後、my-appディレクトリ配下に移動して`$ npm start`コマンドを打つとデモ用のアプリがlocalhost:3000/で見ることができます。  
ブラウザで上記のアドレスを入力するとブラウザ上で次の画面が確認できます。

![react-app](/media/react-app.png)

参考情報
* [React](https://ja.reactjs.org/)
* [Adding TypeScript](https://create-react-app.dev/docs/adding-typescript/)