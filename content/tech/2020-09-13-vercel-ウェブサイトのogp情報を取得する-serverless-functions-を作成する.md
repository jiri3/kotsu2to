---
category: tech
date: 2020-09-13T11:37:35.629Z
updatedate: 2020-09-13T11:54:19.379Z
title: "[Vercel] ウェブサイトのOGP情報を取得する Serverless Functions を作成する"
description: ウェブサイトのOGP 情報を取得する Serverless Functions を作成してみたので紹介します。
tags:
  - Vercel
---
ウェブサイトのOGP 情報を取得する Serverless Functions を作成してみたので実装方法を紹介します。  
ソースコードは[GitHub](https://github.com/jiri3/ogp-api)に公開しています。

#### OGP とは

head の meta タグに設定される情報の一つで、property 属性値が`og:`で始まる要素です。  
例えば、当サイトは次のように OGP を設定しています。

```html
<meta data-react-helmet="true" property="og:title" content="top">
<meta data-react-helmet="true" property="og:image" content="https://kotsukotsu.work/media/kotsu2to-icon.png">
<meta data-react-helmet="true" property="og:description" content="コツコツと綴ってまいります">
<meta data-react-helmet="true" property="og:type" content="website">
```

OGP の用途ですが、
例えば、LINE や Twitter では、メッセージに リンクを貼り付けると
サムネやサイトの説明文をカード形式に変換して表示してくれる機能があると思います。  
これは、OGP の content 属性値を参照して作られています。

#### 今回作成したServerless Functions の紹介

URL パラメータに設定した URL の OGP 情報を取得する API を作成しました。  
下記にアクセスすると本サイトの OGP 情報が json で返ってくる事が分かります。  
https://kotsukotsu-ogp-api.vercel.app/api/ogp?url=https://kotsukotsu.work

[こちら](https://kotsukotsu.work/sandbox/)には、UI 付きのお試しページを作りました。  
URL 入力後、取得ボタンを押下すると、OGP の情報が下部に表示されます。

#### 実装方法の紹介

次のポイントのみ説明をします。  
説明を端折っている処理もありますので、それらに関しては、
[GitHub にあるソースコード](https://github.com/jiri3/ogp-api)を参照ください。

1. URL パラメータを取り出す
2. URL 先の HTML（ページ情報）を取得する
3. 取得した HTML から OGP 情報を取得して json 形式のレスポンスを返す
4. CORS の設定をする

##### URL パラメータを取り出す

URL パラメータに設定している url を取り出します。

Vercel の Serverless Functions は、次の引数を受け取ります。

- NowRequest 型のリクエスト
- NowResponse 型のレスポンス

URL パラメータは、リクエストに格納されているので、次のように取り出します。

```javascript
export default async function (req: NowRequest, res: NowResponse) {
  // 左辺の変数名はURLパラメータの名前と同じにします
  const { url } = req.query;
  ...
}
```

##### URL 先の HTML（ページ情報）を取得する

axios モジュールを利用して、URL パラメータから取り出した URL 先の HTML を取得します。  
axios は`$ npm install`しておいてください。  
次の処理で URL 先の HTML を取得できます。

```javascript
const response = await axios.get(<string>url);
const data = response.data;
```

##### 取得した HTML から OGP 情報を取得して json 形式のレスポンスを返す

jsdom モジュールを利用して、取得した HTML を DOM に変換しました。  
DOM に変換すると、meta タグの抽出が容易になるからです。  
jsdom についても`$ npm install`しておいてください。  

```javascript
import { JSDOM } from "jsdom";
// 省略

const dom = new JSDOM(data);
// metaタグを抽出する
const meta = dom.window.document.querySelectorAll("head > meta");
```

次に meta タグの内、OGP を抽出し、連想配列に変換します。  
reduce を利用するとすっきりかけます。  
変換した連想配列をレスポンス(json)に設定するだけで json 形式でレスポンスを返す事ができます。

```javascript
export default async function (req: NowRequest, res: NowResponse) {
  //省略
  const ogp = Array.from(meta)
    //metaタグの内、property属性を持つのがOGP情報である
    .filter((element) => element.hasAttribute("property"))
    //{OGPのpropety:content}形式の連想配列に変換する
    .reduce((pre, ogp) => {
      // property属性値を取得する
      // その際、「og:」は除去しておく
      //（連想配列のプロパティにコロンがあるのが個人的に気持ち悪かったからです）
      const property = ogp.getAttribute("property").trim().replace("og:", "");
      // content属性値を取得する
      const content = ogp.getAttribute("content");
      // 取得した値を連想配列に変換する
      pre[property] = content;
      return pre;
    }, {});

  // json形式でレスポンスを返す
  res.status(200).json(ogp);
}
```

##### CORS の設定をする

ブラウザから今回作成した Serverless Functions を呼び出すと、
同一オリジンポリシーに違反してエラーとなってしまいます。
今回はこのエラーを回避するために、
Access-Control-Allow-Origin の設定を行いました。  
この設定は vercel.json で行います。
プロジェクトのルートに vercel.json を作成し次の設定を行います。

```javascript
{
  "routes": [
    {
      "src": "/api/ogp",
      "methods": ["GET"],
      "dest": "/api/ogp",
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  ]
}
```

ポイントは、`"Access-Control-Allow-Origin": "*"`の設定です。
この設定は、全てのドメインからアクセスできることを意味しています。  
次のように設定すれば、当サイトからしかアクセスできないことになります。  
（そのうち変更するかもしれません。）  
`"Access-Control-Allow-Origin": "https://kotsukotsu.work"`

---

今回は、OGP 情報を取得する Serverless Functions の実装方法について紹介しました。

#### 参考

- [The Open Graph protocol](https://ogp.me/)
- [オリジン間リソース共有 (CORS)](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)
