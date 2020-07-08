---
date: 2020-04-18T11:43:26.749Z
title: Node.jsに関するメモ
description: Node.jsに関して調べたことのメモです。
tags:
  - Node.js
  - npm
---
Node.jsに関して調べたことのメモです。

* Node.js\
  [公式](https://nodejs.org/en/)によると次の通り。  

  > Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.\
  > （Node.js® は、Chrome の V8 JavaScript エンジン で動作する JavaScript 環境です。）
* runtime\
  「実行時」、「実行時に必要な環境」という意味がある。\
  上記のNode.jsの説明文では後者で用いられている。  

  * [「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word13464.html)  
  * [stackoverflow](https://stackoverflow.com/questions/3900549/what-is-runtime/3900561)
* [public npm registry](https://docs.npmjs.com/about-the-public-npm-registry)\
  JavaScriptパッケージのデータベースである。\
  レジストリ内にあるパッケージをダウンロード(npm install)して自身のプロジェクトで利用することができる。\
  また、このレジストリに自身で開発したパッケージを登録することもできる。
* [パッケージとモジュールについて](https://docs.npmjs.com/about-packages-and-modules)  

  * パッケージ\
    package.json(nameプロパティ)に設定されたディレクトリ、またはファイルのこと。  
  * モジュール\
    node_modulesディレクトリ内に存在するファイル、またはディレクトリのこと。\
    モジュールは、Node.jsのrequire()により、プログラムで利用することができるJavaScriptである。\
    次の例は、変数reqはrequestモジュールを参照するという宣言である

  ```javascript
       var req = require('request')
  ```

  package.jsonを持つモジュールはパッケージとなる。\
  モジュールには、package.jsonは必要ないので、全てのモジュールがパッケージとなる訳ではない。
* Nodeモジュール\
  ライブラリと理解した。\
  Node.jsには、インストール時に[標準モジュール](https://nodejs.org/api/index.html)が組み込まれているが、\
  npmレジストリに公開されている他のモジュールをnpmコマンドでinstallし、利用することもできる。
* npmコマンド\
  Node Package Managerの略。\
  Node.jsをインストールすると利用できるコマンドである。  
* [npm install](https://docs.npmjs.com/cli-commands/install.html)

  npm installのグローバルインストール/ローカルインストール\
  公開されているNodeモジュールを利用して自作のアプリを作成する場合はローカルインストールで十分と理解した。  

  以下、[npmのフォルダ構成より](https://docs.npmjs.com/files/folders)  

  * ローカルインストールは、カレントパッケージの./node_modulesにインストールされる。
  * グローバルインストールは、/usr/localなどNode.jsがインストールされるディレクトリ配下にインストールされる。
  * ローカルインストールは、require()を用いてモジュールを使う。\
    デフォルトは、ローカルインストールの設定である。
  * グローバルインストールは、コマンドラインで使うことが可能になる。

  オプション

  * \-g\
    グローバルインストールをする
  * \-P, --save-prod\
    package.jsonのdependenciesに追加する。このオプションはデフォルトである。
  * \-D, --save-dev\
    package.jsonのdevDependenciesに追加する。
  * \-O, --save-optional\
    package.jsonのoptionalDependenciesに追加する。
  * \-B, --save-bundle\
    package.jsonのbundleDependenciesに追加する。
  * \--no-save\
    dependenciesに追加しない。
* [package.json](https://docs.npmjs.com/files/package.json.html)\
  パッケージ情報を記述するファイルである。例えば、パッケージのnameやversion、dependenciesなどを設定する。

  dependenciesの種類

  * dependencies\
    自身のパッケージを利用する時に必要な他のパッケージをここに記述する。\
    テストハーネスやトランスパイラはここに記述しないでとのこと(devDependenciesに記述する)。
  * devDependencies\
    他者がモジュールを利用するときに必要としない依存性を記述する。（フレームワークやトランスパイラなど）  
  * peerDependencies\
    ホストツールやライブラリに対するプラグインであると表現したい場合に使う。
  * bundledDependencies\
    ローカルにある（例えば公開前）パッケージを利用する時、bundledDependenciesに記述する。\
    npm packするとそのパッケージも圧縮ファイルにまとめられる。
  * optionalDependencies 依存性のあるパッケージのinstallに失敗したとしても、npm installは失敗させたくない場合に利用する。
* [scope](https://docs.npmjs.com/misc/scope)
* webpack\
  Nodeモジュールの一つ。 複数のソースファイルをそれぞれのimport文から一つのjsファイルにまとめる。
* nodebrew\
  Node.jsのバージョンを管理するためのツール。

参考にした情報：

* [npm Documentation](https://docs.npmjs.com/)
* [Node.js の Windows へのインストールと npm の使い方](http://yohshiy.blog.fc2.com/blog-category-35.html)
* [TypeScript チュートリアル](https://qiita.com/EBIHARA_kenji/items/31b7c1c62426bdabd263)
* [webpackとBabelの基本を理解する(1) ―webpack編―](https://qiita.com/koedamon/items/3e64612d22f3473f36a4)
* [ちゃんと使い分けてる? dependenciesいろいろ。](https://qiita.com/cognitom/items/acc3ffcbca4c56cf2b95)