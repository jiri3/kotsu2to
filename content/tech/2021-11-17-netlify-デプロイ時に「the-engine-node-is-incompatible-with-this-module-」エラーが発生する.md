---
category: tech
date: 2021-11-17T09:47:28.310Z
updatedate: 2021-11-17T09:52:45.966Z
title: '[Netlify]デプロイ時に「The engine "node" is incompatible with this module.」エラーが発生する'
description: Gatsby 製ブログの node モジュール一式をupdate し、Netlify にデプロイしたところ「The engine
  "node" is incompatible with this module.」というエラーが発生しました。
tags:
  - Gatsby
  - Netlify
---
Gatsby 製ブログの node モジュール一式を update し、Netlify にデプロイしたところ次のエラーが発生しました。

```shell
error gatsby@4.2.0: The engine "node" is incompatible with this module. Expected version ">=14.15.0". Got "12.18.0"
```

このエラーを解消するには、node のバージョンを上げる必要があります。  
[ドキュメント](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript)を確認したところ、Netlify では、`.node-version` ファイルにより、node のバージョンを指定できるとのことでした。

次の`.node-version` ファイルを作成して、プロジェクトのルートディレクトリに格納して再デプロイしたところエラーは解消されました。

```
// .node-versionファイル
// この設定で、nodeのversion 14.x のlatestがインストールされる
14
```

下記は、デプロイ時の log を抜粋したものです。  
`.node-version` で指定したバージョンの node がインストールされていることがわかります。

```shell
Started restoring cached node version
Finished restoring cached node version
Attempting node version '14' from .node-version
Downloading and installing node v14.18.1...
Downloading https://nodejs.org/dist/v14.18.1/node-v14.18.1-linux-x64.tar.xz...
Computing checksum with sha256sum
Checksums matched!
Now using node v14.18.1 (npm v6.14.15)
Started restoring cached build plugins
Finished restoring cached build plugins
...
```