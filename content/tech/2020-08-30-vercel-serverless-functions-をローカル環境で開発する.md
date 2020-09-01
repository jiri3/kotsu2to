---
category: tech
date: 2020-08-30T10:26:51.432Z
updatedate: 2020-08-30T10:26:51.432Z
title: '[Vercel] Serverless Functions をローカル環境で開発する'
description: Vercel の Serverless Functions をローカル環境で開発する手順を紹介します。
tags:
  - Vercel
---
Vercel には、Serverless Functions をローカル環境で開発する仕組みが提供されています。  
Vercel は、1 日にデプロイできる回数の制限など[^1]があるので、ローカル環境で開発できると何かと便利です。

以下、ローカル環境で開発する方法について紹介します。  
前提条件は、Vercel にてデプロイ済みのプロジェクトがあることです。  
Vercelへのデプロイについては、[こちらの記事](/tech/2020-08-27-vercel-serverless-functions-web-api-をデプロイする/)で紹介していますので、ご参考にしていただければと思います。

#### Vercel CLI をインストールする

[Vercel CLI](https://vercel.com/docs/cli#introduction)を利用します。  
次のコマンドでインストールできます。

```bash
$ npm i -g vercel
```

#### Project Linking

まず、デプロイ済みのプロジェクトを Git でクローンしてきます。  
すでにローカルに存在している場合、この操作は不要です。

次に、プロジェクトのルートディレクトリに移動して vercel コマンドを実行します。  
ここで、Vercel にログインしていない場合は、まずログインを求められます。  
その場合は、メールアドレスを入力して下さい。入力すると Vercel から確認メールが届きます。  
そして、そのメール中にあるセキュリティコードとターミナルに表示されているものが一致することを確認して、メール中の Verify ボタンを押下してください。  
これでログインが完了します。

それから再度、vercel コマンドを実行して下さい。すると Project Linking[^2]という処理が始まります。  
Project Linking とは、Vercel（リモート）上のプロジェクトとローカル環境とを紐付ける処理です。
対話形式でこのコマンドは処理されていきます。

下記にここまでのコマンドの流れを示します。

```bash
# プロジェクトのルートディレクトリに移動する
$ cd `プロジェクトのルートディレクトリ`

# ログインしていない場合はログインを求められます
# ログイン済みの場合はこの処理はありません
$ vercel
    Vercel CLI 20.1.0
# Vercelに登録したメールアドレスを入力します
    > No existing credentials found. Please log in:
    We sent an email to `Vercelに登録したメールアドレス`.
    Please follow the steps provided inside it and make sure the
    security code matches `セキュリティーコード`.
    ✔ Email confirmed
    Congratulations! You are now logged in. In order to deploy something, run `vercel`.
    💡  Connect your Git Repositories to deploy every branch push automatically (https://vercel.link/git).
$ vercel
    Vercel CLI 20.1.0
# ローカル環境の作業ディレクトリのパスが表示されているので、
# 間違いがなければ「y」を入力します
    ? Set up and deploy `ローカル環境の作業ディレクトリのパス`? [Y/n] y
# Vercelに登録した名前（ユーザー名とは別で設定した方）を入力します
# 候補が表示されているので、選択するだけで大丈夫です
    ? Which scope do you want to deploy to? `名前（フルネームの方）`
# プロジェクト名の候補が表示されているので、間違いがなければ「y」を入力します
# ちなみに、プロジェクト名は次のように
# プロジェクトのダッシュボードのURLの一部となっています。
#「https://vercel.com/{プロジェクト名}」
    ? Found project `あなたのプロジェクト名`. Link to it? [Y/n] y
    🔗  Linked to `あなたのプロジェクト名` (created .vercel and added it to .gitignore)
# 下記エラーの原因はわかりませんでしたが、
# Project Linkingは問題なくできていました。
    Error! Invalid vercel.json - `projectSettings.sourceFilesOutsideRootDirectory` Invalid request: `projectSettings.sourceFilesOutsideRootDirectory` should be boolean..
    View Documentation: https://vercel.com/docs/configuration#project/projectsettings.sourcefilesoutsiderootdirectory
```

ちなみに、Project Linking が終わると、`.vercel`ディレクトリが作成されています。  
このディレクトリの中にリンクしたプロジェクトの ID 情報が含まれています。  
また、vercel コマンドで Project Linking が行われるのは初回のみです。  
以降は、デプロイする処理が走ります。

##### vercel dev コマンド

以上で、ローカル環境の構築は完了しました。  
ソースコードに任意の修正を加えたら、次のコマンドを実行してみましょう。

```bash
$ vercel dev
    Vercel CLI 20.1.0 dev (beta) — https://vercel.com/feedback
    > Ready! Available at http://localhost:3000
```

`$ vercel dev `コマンドを実行するとローカルホストで Serverless Functions が動作します。  
Serverless Functions は、  
 `http://localhost:3000/api/{ソースコードのファイル名（拡張子は除く）}`   
でアクセスできます。  
ホットデプロイが効いているので、ソースコードを再度修正しても`$ vercel dev`コマンドを実行する必要はありません。

---

今回は、Vercel のローカル開発環境の構築について紹介しました。  
[Vercel CLI](https://vercel.com/docs/cli#introduction/vercel-cli-reference)は他にも機能がありますので、是非確認してみてください。

[^1]: [Limits](https://vercel.com/docs/platform/limits)

[^2]: [Project Linking](https://vercel.com/docs/cli#commands/overview/project-linking)
