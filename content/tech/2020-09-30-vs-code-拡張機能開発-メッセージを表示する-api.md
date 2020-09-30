---
category: tech
date: 2020-09-30T12:19:22.489Z
updatedate: 2020-09-30T13:24:34.031Z
title: "[VS Code 拡張機能開発] メッセージを表示する API"
description: Visual Studio Code（VS Code） 拡張機能の開発において、メッセージを表示する API について紹介します。
tags:
  - Visual Studio Code
---
Visual Studio Code（VS Code） 拡張機能の開発において、メッセージを表示する API について紹介します。

#### メッセージの種類

メッセージの表示方法は次の種類があります。

- ダイアログに表示する
- ステータスバーに表示する

#### ダイアログに表示する

ダイアログは、情報 / 警告 / エラーの 3 種類あります。  
次のようにAPIを呼び出すとダイアログにメッセージが表示されます。  
第一引数に、表示するメッセージを設定します。  

```javascript
import * as vscode from "vscode";

...
// 情報メッセージを表示する場合
vscode.window.showInformationMessage("Information Message!")
// 警告メッセージを表示する場合
vscode.window.showWarningMessage("Warning Message!")
// エラーメッセージを表示する場合
vscode.window.showErrorMessage("Error Message!")
```

それぞれ、次のダイアログが表示されます。

情報メッセージ

![showInformationMessage](/media/vscode-extension-information-message.png)

警告メッセージ

![showWarningMessage](/media/vscode-extension-warning-message.png)

エラーメッセージ

![showErrorMessage](/media/vscode-extension-error-message.png)

メッセージを表示するだけならば、上記の実装をするだけですが、オーバロードされたAPIも用意されているので次に紹介していきます。  
以下では、情報メッセージのサンプルのみ記載します。  
警告 / エラーを表示させる場合は、メソッド名をそれぞれのものに変更するだけです。

##### ダイアログにボタンを配置する
ダイアログ中にボタンを表示することができます。

![ボタンを表示する](/media/vscode-extension-button.png)

どのボタンが押されたかの判別は、Promise （Thenable） の resolve に押下されたボタン名がセットされるので、  
then のコールバック関数の引数から判別可能です。

```javascript
// API
showInformationMessage(message: string, ...items: string[]): Thenable<string | undefined>
```

```javascript
const message = vscode.window.showInformationMessage(
  "Information Message!",
  "Button1",
  "Button2"
);
message.then((value) => {
  // コンソールログに押下したボタン名（Button1 or Button2）が表示されます。
  console.log(value);
});
```

##### モーダル表示する
モーダル表示させたい場合は次のAPIを利用します。

```javascript
// API
showInformationMessage<T extends MessageItem>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>;
```

```javascript
const message = vscode.window.showInformationMessage("Information Message!", {
  modal: true,
});
```

![モーダル表示](/media/vscode-extension-modal.png)

上記のAPIの第 3 引数を設定すると、ボタンを配置することができます。  
また、ダイアログをキャンセル（ESC 押下）した場合、トリガーしたい（押下したことにしたい）ボタンを設定することもできます。  
isCloseAffordance:true に設定したボタンが、ESC ボタン押下時にトリガーされるボタンです。  
この機能は、モーダル表示時のみ有効です。

```javascript
const message = vscode.window.showInformationMessage(
  "Information Message!",
  { modal: true },
  { title: "Button1", isCloseAffordance: false },
  { title: "Button2", isCloseAffordance: true }
);
```

![モーダル表示（任意のボタンを配置する）](/media/vscode-extension-modal-close-affordance.png)

#### ステータスバーに表示する

ステータスバーとは、ウインドウ最下部にある領域（下図の赤枠で囲った部分）です。

![ステータスバー](/media/vscode-extension-status-bar.png)

ステータスバーにメッセージを表示する場合は、次のAPIを利用します。

```javascript
// API
setStatusBarMessage(text: string, hideAfterTimeout: number): Disposable
```

```javascript
import * as vscode from "vscode";

...
// ステータスバーに表示する場合
const message = vscode.window.setStatusBarMessage(
  "status bar message",
  5000
);
```

![ステータスバーメッセージ](/media/vscode-extension-status-bar-message.png)

第 1 引数が表示させるメッセージです。  
そして、第 2 引数はステータスバーにメッセージを表示させる秒数(msec)です。
指定した秒数を経過するとメッセージは自動で消えます。  
第 2 引数を設定しない呼び出し方（下記の API）もありますが、 
この場合はステータスバーからメッセージが自動で消えません。  
消したい場合は、APIの戻り値を受け取って、その dispose メソッドを呼び出す必要があります。

```javascript
setStatusBarMessage(text: string): Disposable
```

---

今回は、VS Code 拡張機能の開発において、メッセージ表示の API について紹介しました。

参考
- [VS Code API](https://code.visualstudio.com/api/references/vscode-api)
