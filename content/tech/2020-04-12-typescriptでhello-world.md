---
date: 2020-04-18T11:43:26.749Z
updatedate: 2020-04-18T11:43:26.749Z
title: Node.jsに関するメモ
description: Node.jsに関して調べたことのメモです。
tags:
  - Node.js
  - npm
category: tech
---

Node.js に関して調べたことのメモです。

- Node.js\
  [公式](https://nodejs.org/en/)によると次の通り。

  > Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.\
  > （Node.js® は、Chrome の V8 JavaScript エンジン で動作する JavaScript 環境です。）

- runtime\
  「実行時」、「実行時に必要な環境」という意味がある。\
  上記の Node.js の説明文では後者で用いられている。

  - [「分かりそう」で「分からない」でも「分かった」気になれる IT 用語辞典](https://wa3.i-3-i.info/word13464.html)
  - [stackoverflow](https://stackoverflow.com/questions/3900549/what-is-runtime/3900561)

- [public npm registry](https://docs.npmjs.com/about-the-public-npm-registry)\
  JavaScript パッケージのデータベースである。\
  レジストリ内にあるパッケージをダウンロード(npm install)して自身のプロジェクトで利用することができる。\
  また、このレジストリに自身で開発したパッケージを登録することもできる。
- [パッケージとモジュールについて](https://docs.npmjs.com/about-packages-and-modules)

  - パッケージ\
    package.json(name プロパティ)に設定されたディレクトリ、またはファイルのこと。
  - モジュール\
    node_modules ディレクトリ内に存在するファイル、またはディレクトリのこと。\
    モジュールは、Node.js の require()により、プログラムで利用することができる JavaScript である。\
    次の例は、変数 req は request モジュールを参照するという宣言である

  ```javascript
  var req = require("request")
  ```

  package.json を持つモジュールはパッケージとなる。\
  モジュールには、package.json は必要ないので、全てのモジュールがパッケージとなる訳ではない。

- Node モジュール\
  ライブラリと理解した。\
  Node.js には、インストール時に[標準モジュール](https://nodejs.org/api/index.html)が組み込まれているが、\
  npm レジストリに公開されている他のモジュールを npm コマンドで install し、利用することもできる。
- npm コマンド\
  Node Package Manager の略。\
  Node.js をインストールすると利用できるコマンドである。
- [npm install](https://docs.npmjs.com/cli-commands/install.html)

  npm install のグローバルインストール/ローカルインストール\
  公開されている Node モジュールを利用して自作のアプリを作成する場合はローカルインストールで十分と理解した。

  以下、[npm のフォルダ構成より](https://docs.npmjs.com/files/folders)

  - ローカルインストールは、カレントパッケージの./node_modules にインストールされる。
  - グローバルインストールは、/usr/local など Node.js がインストールされるディレクトリ配下にインストールされる。
  - ローカルインストールは、require()を用いてモジュールを使う。\
    デフォルトは、ローカルインストールの設定である。
  - グローバルインストールは、コマンドラインで使うことが可能になる。

  オプション

  - \-g\
    グローバルインストールをする
  - \-P, --save-prod\
    package.json の dependencies に追加する。このオプションはデフォルトである。
  - \-D, --save-dev\
    package.json の devDependencies に追加する。
  - \-O, --save-optional\
    package.json の optionalDependencies に追加する。
  - \-B, --save-bundle\
    package.json の bundleDependencies に追加する。
  - \--no-save\
    dependencies に追加しない。

- [package.json](https://docs.npmjs.com/files/package.json.html)\
  パッケージ情報を記述するファイルである。例えば、パッケージの name や version、dependencies などを設定する。

  dependencies の種類

  - dependencies\
    自身のパッケージを利用する時に必要な他のパッケージをここに記述する。\
    テストハーネスやトランスパイラはここに記述しないでとのこと(devDependencies に記述する)。
  - devDependencies\
    他者がモジュールを利用するときに必要としない依存性を記述する。（フレームワークやトランスパイラなど）
  - peerDependencies\
    ホストツールやライブラリに対するプラグインであると表現したい場合に使う。
  - bundledDependencies\
    ローカルにある（例えば公開前）パッケージを利用する時、bundledDependencies に記述する。\
    npm pack するとそのパッケージも圧縮ファイルにまとめられる。
  - optionalDependencies 依存性のあるパッケージの install に失敗したとしても、npm install は失敗させたくない場合に利用する。

- [scope](https://docs.npmjs.com/misc/scope)
- webpack\
  Node モジュールの一つ。 複数のソースファイルをそれぞれの import 文から一つの js ファイルにまとめる。
- nodebrew\
  Node.js のバージョンを管理するためのツール。

参考にした情報：

- [npm Documentation](https://docs.npmjs.com/)
- [Node.js の Windows へのインストールと npm の使い方](http://yohshiy.blog.fc2.com/blog-category-35.html)
- [TypeScript チュートリアル](https://qiita.com/EBIHARA_kenji/items/31b7c1c62426bdabd263)
- [webpack と Babel の基本を理解する(1) ―webpack 編―](https://qiita.com/koedamon/items/3e64612d22f3473f36a4)
- [ちゃんと使い分けてる? dependencies いろいろ。](https://qiita.com/cognitom/items/acc3ffcbca4c56cf2b95)
