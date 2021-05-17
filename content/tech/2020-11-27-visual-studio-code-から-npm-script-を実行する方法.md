---
category: tech
date: 2020-11-27T04:50:46.961Z
updatedate: 2021-05-17T00:48:02.779Z
title: Visual Studio Code から npm script を実行する方法
description: Visual Studio Code から npm script を実行する方法を紹介します。
tags:
  - Visual Studio Code
---
Visual Studio Code から npm script を実行する方法を 3 通り紹介します。  
おすすめ順で紹介します。

- Explorer の NPM Scripts から実行する
- Quick Open を利用して実行する
- Terminal から実行する

---

##### Explorer の NPM Scripts から実行する

Explorer を開きます。Mac の場合は、「Cmd + B」がショートカットキーです。

![Explorer](/media/execute-npmscript-explorer.png)

Explorer 中の、NPM SCRIPTS を展開します。
展開すると、package.json に定義されている npm scripts が表示されます。

![NPM Scripts](/media/execute-npmscript-treeview.png)

実行したいスクリプトにカーソルを当てると再生アイコンが表示されます。
そのアイコンを押下するとスクリプトが実行できます。

![NPM Scriptsから実行する](/media/execute-npmscript-clickicon.png)

##### Quick Open を利用して実行する

Quick Open を開きます。
Mac の場合は、「Cmd + P」がショートカットキーです。

![Quick Open](/media/execute-npmscript-quickopen.png)

Quick Open の入力欄に「task」と入力した後、さらにスペースを入力します。
すると、Visual Studio Code で自動検知したタスクが表示されるので、npm を選択します。

![Task auto-detection](/media/execute-npmscript-taskautoditection.png)

選択後、package.json に定義されている npm scripts が表示されるので、
実行したいスクリプトを選択します。

![Task auto-detectionを利用してスクリプトを実行する](/media/execute-npmscript-selectscript.png)

次のフォームが表示される場合は、「Continue without scanning the task output」を選択してください。これで、スクリプトが実行されます。

![Task auto-detectionを利用してスクリプトを実行する](/media/execute-npmscript-scan.png)

##### Terminal から実行する

普通の npm script の実行方法ですが、一応紹介します。

Visual Studio Code からターミナルを開きます。
Mac の場合は、「Shift + Ctrl + @」がショートカットキーです。

![Terminal](/media/execute-npmscript-terminal.png)

次のコマンドをターミナルに入力することで、スクリプトが実行できます。

```shell
$ npm run スクリプト名
```

#### 注意点

.vscode/settings.json に `"npm.autoDetect": "off"`が
設定されていると、Explorer の NPM Scripts と Quick Open からは NPM スクリプトが実行できなくなります。

![npm.autoDetectがoffの場合](/media/execute-npmscript-autodetect-off.png)

---

今回は、Visual Studio Code から npm script を実行する方法を紹介しました。

#### 追記（2021/05/17）
VS Code ver1.55あたりから、ExplorerからNPM Scriptsが消えていました。  
（気づいたのがver1.55なのでもう少し前から発生していたかもしれません。）  
調べてみたところ、どうやら不具合だったようで、ver1.56で修正されていました。  
##### 参考
* https://github.com/microsoft/vscode/issues/120279#issuecomment-824950294
* https://stackoverflow.com/questions/66943852/npm-scripts-not-shown-in-explorer-sidebar-how-to-shwo-them-again#66945789