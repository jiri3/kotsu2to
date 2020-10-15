---
category: tech
date: 2020-10-15T11:54:59.045Z
updatedate: 2020-10-15T12:02:01.738Z
title: Visual Studio Code でタブを入力する
description: Visual Studio Code
  はtabキーを押した場合、デフォルトではスペースに変換されて入力されます。タブ（水平タブ）を入力したい場合は設定で変更できますが、本記事では Key
  Bindings を利用してタブを入力する方法を紹介します。
tags:
  - Visual Studio Code
---
Visual Studio Code はtabキーを押した場合、デフォルトではスペースに変換されて入力されます。タブ（水平タブ）を入力したい場合は設定で変更できますが、本記事では Key Bindings を利用してタブを入力する方法を紹介します。  
Key Bindings とは、キーボードショートカットのことです。例えば、cmd+w で、アクティブなエディタを閉じたりできます。

#### Key Bindings でタブを入力する

まず、keybindings.json を開きます。  
コマンドパレットにて、「open keyboard」と入力し、「Preferences:Open Kyeboard Shortcuts(JSON)」を選択します。

![Open Kyeboard Shortcuts](/media/vscode-key-bindings-open-keyboard-shortcuts.png)

これで、keybindings.json が開けます。

![keybindings.json](/media/vscode-key-bindings-json.png)

次に、keybindings.json に次の設定を追加します。

```json
[
  {
    "key": "ctrl+t",
    "command": "type",
    "args": { "text": "\t" },
    "when": "editorTextFocus"
  }
  // 他の設定
]
```

これで、ctrl+t をタイプした時にエディタのカーソルの位置にタブを挿入することができます。


各プロパティは次の通りです。

| プロパティ名 | 説明                                                                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| key          | キーボードから key に設定したキーを入力した時に、command が動作します。                                                                               |
| command      | key を入力した時に動作させる VS Code のコマンドの ID を設定します。                                                                                 |
| args         | command が受け取る引数を設定します。type コマンドは、text プロパティを引数として受け取り、その値をドキュメントに挿入します。                                    |
| when         | コマンドが有効となる条件を指定します。詳細は[こちら](https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts)を参照ください。 |

---

今回は、Key Bindings を利用してタブを入力する方法を紹介しました。

---

参考

- [Stack Overflow](https://stackoverflow.com/questions/45566785/vscode-insert-tab-character-manually/45575913)
- [Key Bindings for Visual Studio Code](https://code.visualstudio.com/docs/getstarted/keybindings)
- [Visual Studio Code で最初にしておきたいオススメ設定](https://rfs.jp/sb/vsc/vsc-setting.html#i-7)
