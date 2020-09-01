---
date: 2020-06-30T08:50:41.125Z
updatedate: 2020-06-30T08:50:41.125Z
title: Node.js + TypeScript で GmailAPI を利用してみる
description: Node.js + TypeScript で、Gmail API を使ってメールを取得するまでの実装を説明します。
tags:
  - Node.js
  - TypeScript
  - Gmail API
  - OAuth2.0
category: tech
---

Node.js + TypeScript で、Gmail API を使ってメールを取得するまでの実装を説明します。

Gmail API は 下図の OAuth ２.0 のプロトコルフローに沿って、
ユーザーから Gmail のアクセス権に対する認可を得ることで利用できます。  
このフローを念頭に置いておくと、以降の説明が理解しやすくなると思います。

ちなみに Google が、 Gmail API 含む Google が提供する API を利用できるデモサイト（[OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)）を用意してくれているので、
そちらで OAuth2.0 プロトコルフローを試してみることもできます。

<a name="flow"></a>

```
+----------+
| Resource |
|   Owner  |
|          |
+----------+
     ^
     |
    (B)
+----|-----+          Client Identifier      +---------------+
|         -+----(A)-- & Redirection URI ---->|               |
|  User-   |                                 | Authorization |
|  Agent  -+----(B)-- User authenticates --->|     Server    |
|          |                                 |               |
|         -+----(C)-- Authorization Code ---<|               |
+-|----|---+                                 +---------------+
  |    |                                         ^      v
 (A)  (C)                                        |      |
  |    |                                         |      |
  ^    v                                         |      |
+---------+                                      |      |
|         |>---(D)-- Authorization Code ---------'      |
|  Client |          & Redirection URI                  |
|         |                                             |
|         |<---(E)----- Access Token -------------------'
+---------+       (w/ Optional Refresh Token)

Note: The lines illustrating steps (A), (B), and (C) are broken into
two parts as they pass through the user-agent.

                Figure 3: Authorization Code Flow
        RFC6749(https://tools.ietf.org/html/rfc6749) より
```

### 事前準備

#### クライアント登録と資格情報を取得する <a name="client"></a>

まずは、Google の認可サーバーにクライアント（アプリケーション）情報を登録します。
（[RFC6749 の 2.Client Registration](https://tools.ietf.org/html/rfc6749#section-2)にあたる仕様）  
クライアントの登録は、[Google API Console](https://console.developers.google.com/?hl=ja)からできます。
[RAKUS Developers Blog](https://tech-blog.rakus.co.jp/entry/20180725/google-apis/google-cloud-platform/quickstart)が参考になりました。

クライアント登録する際、リダイレクト URI を設定するのですが、
`"http://127.0.0.1:ポート番号"`を設定してください。  
ポート番号は 3000 など、空いているポートの値を設定してください。  
クライアント登録後、資格情報ファイル(json 形式)をダウンロードして、ワークディレクトリのトップ(`$ npm init`したディレクトリ)に保存します。  
この資格情報は、Authorization Server（上記の[Authorization Code Flow](#flow)参照）にリクエストする際のパラメータで利用します。

#### ライブラリを install する

コマンドラインで、ワークディレクトリまで移動して次のコマンドを実行します。

```bash
$ npm install googleapis -S
```

### 実装

ソースコードは[こちら](https://github.com/jiri3/gmail-api-node)に公開していますので、ポイントのみ説明します。

#### ソースファイル構成

| ファイル名           | 内容                                                                       |
| :------------------- | :------------------------------------------------------------------------- |
| OAuthForGoogleApi.ts | Google API との OAuth2 フローを扱う OAuthForGoogleApi クラスを定義している |
| GmailApi.ts          | Gmail からメール情報を取得する GmailApi クラスを定義している               |
| sample.ts            | メイン処理                                                                 |
| Util.ts              | ファイル操作などのユーティリティメソッドをまとめている                     |
| Constants.ts         | 定数をまとめたファイル                                                     |

##### OAuthForGoogleApi.ts

OAuthForGoogleApi.ts には、OAuthForGoogleApi クラスを定義しています。  
そのクラスにて、googleapis ライブラリで定義されてる OAuth2Client クラスを利用して、
アクセストークンを取得するまでの処理を記述しています。  
OAuthForGoogleApi クラスをインスタンス化する際、第一引数にスコープを設定します。  
ここで、スコープとはクライアント(アプリケーション)がユーザーに要求する権限のことです。  
例えば、メールを参照したい場合は、`https://www.googleapis.com/auth/gmail.readonly`を設定します。  
メールの編集や送信をしたい場合は、別のスコープを設定する必要があります。  
スコープの詳細は、[こちら](https://developers.google.com/gmail/api/auth/scopes)を参照ください。

第二引数には、[こちら](#client)で取得した資格情報ファイルのパスを設定します。
ちなみに資格情報は OAuth2Client のインスタンス化時に利用します。

その他、詳細はソースコード中のコメントに記載しましたので、そちらを参照ください。  
コメントには、上に載せた [Authorization Code Flow](#flow)と実装を対応づけるため、
A〜E のアルファベットを記しています。

##### GmailApi.ts

googleapis ライブラリの gmail_v1.Resource$Users$Messages クラスを利用して、
Gmail からメール情報を取得しています。

gmail_v1.Resource$Users$Messages は次のようにインスタンス化できます。

```javascript
const usersMessages = new gmail_v1.Resource$Users$Messages({
  _options: {
    auth: oAuth2Client, // OAuth2Clientのインスタンスをセットする
  },
})
```

###### 検索条件に一致するメールを取得する

gmail_v1.Resource$Users$Messages#list メソッドを利用します。  
list メソッドのパラメータは、`gmail_v1.Params$Resource$Users$Messages$List`型です。  
メールアドレスが、xxx@example.com のメールを検索したい場合は、次のようにパラメータを生成すればよいです。

```javascript
// メールの検索条件を生成する
const param: gmail_v1.Params$Resource$Users$Messages$List = {
  userId: `me`,
  q: `from:xxx@example.com`,
}
// 検索の実行
const result = await usersMessages.list(param)
```

`q`プロパティに設定できる条件は、[こちら](https://support.google.com/mail/answer/7190?hl=ja)を参照ください。

list メソッド を実行すると次の形式の結果が取得できます。  
messages に検索条件に一致したメールの id が設定されています。

```
{"resultSizeEstimate": hoge,
  "messages": [
    {
      "id": "xxx",
      "threadId": "xxxx"
    },
    {
      "id": "yyy",
      "threadId": "yyy"
    },
    ...
  ],
  "nextPageToken":fuga
}
```

###### 特定のメールの詳細情報（差出元のアドレスや本文など）を取得する

特定のメールの詳細情報（差出元のアドレスや本文など）を取得したい場合は、
gmail_v1.Resource$Users$Messages#get を利用します。  
get メソッドのパラメータは、`Params$Resource$Users$Messages$Get`型です。  
パラメータは次のように生成します。

```javascript
const param: gmail_v1.Params$Resource$Users$Messages$Get = {
  userId: `me`,
  id: "xxx", // listメソッドで得られたメールのidを設定する
}
```

get メソッドを実行すると`gmail_v1.Schema$Message`型の結果を得ます。  
テキストメールの本文は、`gmail_v1.Schema$Message.payload.body.data`に格納されています。  
但し、メール本文は Base64 エンコードされているので、デコードしないと理解できません。

##### sample.ts

メイン処理です。  
検索条件に一致したメールの内、
最初の 1 件のメール本文をコンソールに表示する処理を実装しています。  
サンプルプログラムの実行方法は、ソースコード公開先の README を参照ください。

### 留意点やメモ

- リダイレクト URI を http にしてるので、https 化しないとセキュリティ的によろしくないかも？
- アプリケーション終了後、アクセストークンを revoke した方(失効させた方)がいいかも。
- アクセストークンは有効期間がある。  
  そのため失効した場合、リフレッシュトークンを用いて新しいアクセストークンを取得する必要があるが、
  [こちら](https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens)によると、googleapis ライブラリが自動で対応してくれていそう。

### 参考情報

- [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2/?hl=ja)
- [Node.js Quickstart](https://developers.google.com/gmail/api/quickstart/nodejs)
- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client#google-apis-nodejs-client)
