---
date: 2020-05-17T06:17:04.254Z
updatedate: 2020-05-17T06:17:04.254Z
title: コマンドラインからGithubにpushするまで
description: Github APIを利用してrepositoryを作成して、そのrepositoryにpushするまでのメモです。
tags:
  - GitHub
  - GitHub API
  - Git
category: tech
---

## 実行するコマンドの一覧

```shell
$ curl -u User https://api.github.com/user/repos -d '{"name":"repo-name", "description":"hogehoge", "private":true}'
$ git init
$ git add .
$ git commit -m "コミットメッセージ"
$ git branch
$ git remote add origin https://github.com/アカウント名/repository名.git
$ git push -u origin master
```

---

以下、コマンドの説明です。

## GitHub 上に repository を作成する

ブラウザで GitHub にログインして repository を作成する方が一般的と思いますが、
今回はあえてコマンドラインから repository を作成します。

[curl](https://curl.haxx.se/)コマンドと[GitHub API](https://developer.github.com/v3/)を利用するとコマンドラインから repository を作成できます。

```shell
$ curl -u User https://api.github.com/user/repos -d '{"name":"repo-name", "description":"hogehoge", "private":true}'
```

https&#058;//api.github.com/user/repos が、repository を作成するための API です。  
また、上記で利用している curl のオプションは次の意味があります。

- -u  
  サーバ認証するためのオプションです。  
  上記コマンドの User 部分を自身の GitHub のアカウント名に変えて実行してください。  
  上記コマンドを実行するとパスワードの入力を要求されますので、GitHub のユーザ認証に設定している
  パスワードを入力してください。その後、repository の作成が実行されます。  
  ちなみに、[トークンを利用した認証方法](https://developer.github.com/v3/auth/#via-oauth-and-personal-access-tokens)もあります。こちらの方がセキュリティの観点でよろしいです。
- -d  
  サーバに送信する POST パラメータを設定するためのオプションです。  
  今回、設定しているパラメータは次の通りです。

  - name  
    repository の名前です。
  - description  
    repository の説明文です。
  - private  
    true ならば private repository、false ならば、public repository になります。

  他にも設定できるパラメータはあります。[こちら](https://developer.github.com/v3/repos/#parameters-4)を参照ください。

## repository に push する

すでに push したいファイルがローカルに存在していることを前提としています。

```shell
$ git init
$ git add .
$ git commit -m "コミットメッセージ"

# ブランチ一覧を参照するコマンド。masterブランチがdefaultで作成されている。
$ git branch

# push先を設定する
# repository名は、上記で作成したrepositoryのnameを設定する
$ git remote add origin https://github.com/アカウント名/repository名.git

# remote(GitHub側)にpushする
# -uは、次回$git pushだけでpush可能となるオプション。要するに後続のorigin masterが省略できる。
$ git push -u origin master
```

参考情報

- [stackoverflow](https://stackoverflow.com/questions/2423777/is-it-possible-to-create-a-remote-repo-on-github-from-the-cli-without-opening-br)
