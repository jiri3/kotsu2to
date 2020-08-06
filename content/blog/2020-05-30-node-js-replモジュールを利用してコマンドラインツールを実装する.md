---
date: 2020-05-31T00:00:29.537Z
title: "[Node.js]replモジュールを利用してコマンドラインツールを実装する"
description: Node.jsで動作するコマンドラインツールを作成してみたかったので、replモジュールを試しに利用してみました。
tags:
  - Node.js
  - REPL
category: blog
---

Node.js で動作するコマンドラインツールを作成してみたかったので、[repl モジュール](https://nodejs.org/api/repl.html)を試しに利用してみました。  
repl モジュールはデフォルトで利用すると、 `$ node`コマンドを実行した時と同じ動作をします。  
すなわち、コマンドラインに入力した文字列を JavaScript の式として評価して、結果を返してくれます。  
repl モジュールはオプションにより、独自の評価が可能となるので、
今回は、それを用いてコマンドラインツールを実装する雛形を作ってみました。  
ちなみに、REPL とは Read Eval Print Loop の略で入力・評価・出力・ループを表しています。

---

実装のサンプルは次の通りです。

```javascript
// myRepl.js
const repl = require("repl")

const options = {
  eval: myEval,
  writer: myWriter,
  ignoreUndefined: true,
}
repl.start(options)

function myEval(cmd, context, filename, callback) {
  let response // 評価結果を格納する
  const trimCmd = cmd.trim() // 改行コードが含まれるのでtrimする
  switch (trimCmd) {
    case "a":
      processA()
      response = "processA:done"
      break
    case "b":
      processB()
      response = "processB:done"
      break
    case "":
      break
    default:
      response = `${trimCmd}:command not found`
  }
  callback(null, response)
}

function myWriter(output) {
  // デフォルトのwriterは文字列が、シングルクォーテーションで囲まれ出力されるので
  // 評価結果をそのまま返す。
  return output
}

function processA() {
  /** サンプルのため空実装 */
}
function processB() {
  /** サンプルのため空実装 */
}
```

repl.start の引数に指定しているオプションの設定(=options)がポイントです。

- eval  
  コマンドラインに入力された文字列を評価するメソッドを指定します。  
  ここで設定したメソッドは、ユーザがコマンドラインに入力し、Enter を押下した後に実行されます。  
  メソッドの第 2 引数(cmd)で、コマンドラインに入力された値を取得できます。cmd には改行コードが含まれるので注意です。  
  そして、戻り値が評価結果となります。
- writer  
  eval の評価結果をコマンドラインに出力する前に実行するメソッドを指定します。  
  メソッドの引数が eval の評価結果で、戻り値がコマンドラインに出力する値となります。
- ignoreUndefined  
  true の場合、評価の結果が JavaScript でいう undefined の時にコマンドラインに出力しない設定です。

今回の実装サンプルを実行すると次の結果となります。
#の行は、説明のためのコメントです。

```bash
# 実行する
$ node ./myRepl.js
# aを入力する
> a
processA:done
# bを入力する
> b
processB:done
# abを入力する
> ab
ab:command not found
# 未入力でEnterを押下すると、次の入力待ち状態になる
# ignoreUndefined = falseの場合はundefinedと表示される
>
>
```
