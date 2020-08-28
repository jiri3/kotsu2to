---
category: tech
date: 2020-08-28T08:20:39.561Z
title: '[Vercel] Serverless Functions(Web API)をデプロイする'
description: Vercel の Serverless Functions(Web API)をデプロイする手順を説明します。
tags:
  - Vercel
---
[Vercel](https://vercel.com/) とは静的サイトと Serverless Functions のクラウドサービスです。  
Vercel を利用すると、JAMstack なウェブサイトやウェブサービスをホスティングすることができます。
無料で利用できる枠もあるので、試しに使うのにはもってこいです。

今回は、Hello World をレスポンスとして返す Serverless Functions を作成してみます。
Serverless Functions の意味はよくわかっていませんが、
サーバーの管理が不要で、実装した機能（例えば Web API）をデプロイして、利用できるということと解釈しています。

Serverless Functions の作成手順は次の通りです。

1. Vercel でアカウントを作成する
2. Serverless Functions を実装する
3. デプロイする
4. Vercel CLI をインストールする

以下、手順に沿って説明していきます。

#### Vercel でアカウントを作成する

[こちら](https://vercel.com/signup)からアカウントを作成してください。  
作成するためには、GitHub、GitLab または Bitbucket のいずれかのアカウントが必要になるので、
事前にそちらのアカウントも作成しておいてください。
私は GitHub ユーザーなので、以下の説明では GitHub 想定です。

#### Serverless Functions を実装する

まずは、GitHub の方でレポジトリを作成します。  
Vercel は、GitHub と連動させることが可能で、push すると自動でデプロイすることもできます。
作成したレポジトリをクローンします。

```bash
$ git clone `https://github.com/{username}/{repository-name}.git`
```

次にクローンしてきたレポジトリのルートディレクトリ配下に api ディレクトリを作成します[^1]。  
[^1]:[Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)  
この api ディレクトリ配下にソースコードを格納する必要があります。

```bash
$ mkdir ./api
```

次に実装に入ります。今回は Node.js で開発します。  
ちなみに[こちらのプログラミング言語](https://vercel.com/docs/serverless-functions/supported-languages#supported-languages:)がサポートされています。  
TypeScript を使いたいので、次のパッケージをインストールします[^2]。

[^2]: [Using TypeScript with the Node.js Runtime](https://vercel.com/docs/runtimes#official-runtimes/node-js/using-typescript-with-the-node-js-runtime)

```bash
$ npm init -y
$ npm install @vercel/node --save-dev
```

Hello world をレスポンスとして返すソースを実装します。

```javascript
// api/hello.ts
import { NowRequest, NowResponse } from "@vercel/node";

export default function (req: NowRequest, res: NowResponse) {
  const { name = "World" } = req.query;
  res.send(`Hello ${name}!`);
}
```

以上で実装は完了したので、commit してリモートレポジトリに push します。

```bash
$ git add .
$ git commit -m "commit message"
$ git push
```

#### デプロイする

まずは、Vercel と push したレポジトリを関連付けます。
Vercel ログイン後に表示されるダッシュボードに「Import Project」ボタンがあるので押下してください。

![vercel dashbord](/media/vercel-dashbord.png)

Import Git Repository の「Continue」ボタンを押下します。

![import git repository](/media/vercel-import-git-repo.png)

次の画面で先ほどの Git レポジトリの URL を入力して、「Continue」ボタンを押下します。

![enter git repository url](/media/vercel-enter-git-repo-url.png)

次の画面は、ソースコードが入っているディレクトリを選択するのですが、
root ディレクトリのままにして「Continue」ボタンを押下してください。
ここで、api を選択してしまうと Serverless Functions は実行できなくなるのでご注意ください。

![select the directory](/media/vercel-select-directory.png)

次の画面は、特に修正は不要です。「Deploy」ボタンを押下してください。

![deploy](/media/vercel-deploy.png)

以上で、デプロイが完了しました。

![finish deploy](/media/vercel-finish-deploy.png)

#### 動作確認する

作成した Serverless Functions の動作確認をしてみます。
デプロイ完了後の画面の「Open Dashbord」ボタンを押下するとデプロイしたプロジェクトの
ダッシュボードが開けます。  
そこの DOMAINS にデプロイ先の URL が表示されています。
そして、Serverless Functions を利用する場合は、
`https://デプロイ先のドメイン/api/ソースコードのファイル名（拡張子を覗く）`にアクセスします。  
従って、今回作成した Serverless Functions にアクセスする場合は、次の URL となります。

https://vercel-sample-nine.vercel.app/api/hello

ブラウザからアクセスするか、次のように curl コマンドを利用すると動作確認ができます。  
URL パラメータを指定しなければ、「Hello World!」と表示されると思います。

```bash
$ curl https://vercel-sample-nine.vercel.app/api/hello
```

---

今回は、Vercel の Serverless Functions の作成方法について紹介しました。  
Vercel には、1 日にデプロイできる回数などの制限があるので、
利用前に[こちら](https://vercel.com/docs/platform/limits)を一読すると良いかと思います。

#### 参考

- [JAMstack ってなに？実践に学ぶ高速表示を実現するアーキテクチャの構成](https://employment.en-japan.com/engineerhub/entry/2019/12/10/103000)
