---
category: scraps
date: 2021-04-10T12:38:29.065Z
updatedate: 2021-04-10T13:07:06.833Z
title: "[Node.js]CLIオプション -r, --require module"
description: Node.jsのCLIオプション -r, --require moduleについてです。
tags:
  - Node.js
---
-rオプションを指定するとメインのモジュールを実行する前に
-rで指定したモジュールを実行することができます。

#### 使い方

前提
```bash
# ディレクトリ構成
./
├── index.js
└── preload.js
```

```javascript
// index.js
console.log("call index.js");
```

```javascript
// preload.js
console.log("call preload");
```

コマンドの実行例
```bash
node -r ./preload.js ./

# 実行結果
call preload
call index.js
```

-rで指定するモジュールはrequire()と同様、モジュールのパスを設定します。

メインモジュール実行前の段階で処理ができて何が嬉しいかというと、
[tsconfig-paths](https://github.com/dividab/tsconfig-paths#readme)のようなツールがあります。  
<!--
tsconfig.jsonでbaseUrlを```"."```などと指定するとimportを次のように記述できます。  
```javascript
import hoge from "src/hoge.js" 
``` 
-->

#### 参考
* https://nodejs.org/dist/latest-v14.x/docs/api/cli.html#cli_r_require_module
* https://nodejs.org/docs/latest/api/modules.html  
⇨ モジュールの名前解決について参考になった