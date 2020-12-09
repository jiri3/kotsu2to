---
category: tech
date: 2020-12-09T08:08:52.682Z
updatedate: 2020-12-09T08:11:44.915Z
title: "[Visual Studio Code] ソースコード中の変数名の変更などまとめてテキストを編集する方法"
description: VS Code にてソースコード中の変数名の変更などまとめてテキストを編集する方法を紹介します。マルチカーソル機能は便利です。
tags:
  - Visual Studio Code
---
VS Code にてソースコード中の変数名の変更など、まとめてテキストを編集する方法を紹介します。  
ショートカットコマンドは Mac の場合なので、ご注意ください。

##### [Rename symbol](https://code.visualstudio.com/docs/editor/refactoring#_rename-symbol])：変数名の変更

変数を選択して、`F2`を押下することで、ソースコード中の同じ変数を一括置換できます。

![Rename Symbol](/media/vscode-howto-renamesymbol.gif)

##### [Multi cursor selection](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_multi-cursor-selection)：複数選択

###### 複数行を選択可能にする（マルチカーソル）

`Alt+Cmd+Up or Downキー`で複数行を選択できます。  
ESC を押すとマルチカーソルは解除できます。
![全て選択する](/media/vscode-howto-multicursor.gif)

###### 選択中の文字列と同じ文字列を選択する

`Cmd+Shift+L`で選択中の文字列と同じ文字列を全て選択できます。

![全て選択する](/media/vscode-howto-searchall.gif)

また、`Cmd+D`で次に選択中の文字列と同じ文字列が出現する箇所を選択できます。これは、`Cmd+D`を押すたびに選択箇所を増やしていくことができます。

![次の出現箇所を順に選択する](/media/vscode-howto-searchincremental.gif)

---

今回は、VS Code にてソースコード中の変数名の変更など、まとめてテキストを編集する方法を紹介しました。