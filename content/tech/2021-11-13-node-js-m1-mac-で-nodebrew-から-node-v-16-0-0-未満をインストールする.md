---
category: tech
date: 2021-11-13T09:16:21.218Z
updatedate: 2021-11-13T09:20:47.699Z
title: "[Node.js]M1 Mac で nodebrew から  node v.16.0.0 未満をインストールする"
description: M1 Mac で nodebrew から node v.16.0.0 未満をインストール方法を紹介します。
tags:
  - Node.js
  - nodebrew
---
環境

- M1 Mac (arm64 アーキテクチャ)
- M1 Mac 対応された nodebrew がインストールされている
  - v1.1.0 で M1 Mac 対応がされています。 => https://github.com/hokaccha/nodebrew/blob/master/History.md#110---2021-04-23

M1 Mac 環境の nodebrew で v16.0.0 未満の node をインストールしようとすると、次のようにインストールできません。

```zsh
% nodebrew install v15.14.0
v15.14.0 is not found

Can not fetch: https://nodejs.org/dist/v15.14.0/node-v15.14.0-darwin-arm64.tar.gz
```

おそらく、M1 Mac 用のバイナリは、v16.0.0 からしかアーカイブされていないようです[^1]。  
従って、それ以前の version をインストールするには、自身でソースコードからコンパイルする必要があります。  
コンパイルする場合は、`% nodebrew compile <version>` コマンドを利用します。

※ ソースコードのダウンロードに失敗する場合は、nodebrew のホームディレクトリ（デフォルトは、$HOME/.nodebrew）配下に、src ディレクトリが存在するか確認してください。

```zsh
# Node.jsをソースコードからコンパイルする
% nodebrew compile v15.14.0

# ダウンロードに失敗する場合、次のメッセージが表示される
Fetching: https://nodejs.org/dist/v15.14.0/node-v15.14.0.tar.gz
Warning: Failed to create the file
Warning: /Users/username/.nodebrew/src/v15.14.0/node-v15.14.0.tar.gz:
Warning: No such file or directory
curl: (23) Failure writing output to destination

# インストール済みのバージョンを確認する
% nodebrew ls
v14.16.0
v14.18.1
v15.14.0

current: v14.18.1

# currentを変更する
% nodebrew use v15.14.0
use v15.14.0
```

私の環境では、コンパイル完了まで、35 分ほどかかりました。

## 参考

- https://zenn.dev/link/comments/22f1ec6028bea1

[^1]: https://nodejs.org/dist/ に各バージョンのアーカイブが存在するのですが、node-vx.x.x-darwin-arm64.tar.gz 形式のファイルは v15.14.0 には存在しておらず、v16.0.0 に存在していたので、v16.0.0 からアーカイブするようにしたのだろうと推測しました。（2021/11/10 時点）
