---
date: 2020-07-07T14:14:48.325Z
title: Google Developers の OAuth 2.0 Playground で Gmail API を利用してみる
description: |-
  OAuth 2.0 Playground で Gmail API を試しに利用してみました。
  OAuth 2.0 Playground とは、Google が提供している API を試しに利用することができるサイトです。
tags:
  - Gmail API
  - OAuth2.0
---
Google は様々な API を提供してくれています。  
[OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) は、それらの API を試しに利用することができるサイトです。  
今回は、OAuth 2.0 Playground で Gmail API を試しに利用してみましたので、
その紹介をします。

下図が、OAuth 2.0 Playground の Top ページです。

![Topページ](/media/oauth2playground.png)


まず、利用する API の[スコープ](https://developers.google.com/gmail/api/auth/scopes?hl=ja)を選択します。  
スコープとは、リソースに対して要求するアクセス権のことです。例えば、Gmail API のスコープには、
メールを送信する、受信メールを参照するスコープがあります。  
 今回は、Gmail の受信メールを 参照する次のスコープを選択してみました。  
 Gnail API v1 > `https://www.googleapis.com/auth/gmail.readonly`  
選択後、Autorize APIs ボタンを押下します。  
![スコープの選択](/media/OAuth2PlayGround_SelectScope.png)

ボタンを押下すると Google アカウントの認証へ移ります。  
Gmail API の操作対象となるリソースは、ここで認証したアカウントのものとなります。  
![認証](/media/OAuth2PlayGround_SelectAccount.png)

認証後、OAuth 2.0 Playground(アプリケーション)から、
Gmail のリソースに対するアクセス要求がくるので、ボタンを押下して許可します。  
![認可](/media/OAuth2PlayGround_Authorize.png)

許可をすると認可コードが発行されるので、  
Exchange authorization code for tokens ボタンを押下します。
ボタンを押下するとアクセストークンの取得が実施されます。  
![認可コード](/media/OAuth2PlayGround_AuthorizedCode.png)

アクセストークンが取得できると、下図のように入力欄に反映されます。  
![アクセストークン](/media/OAuth2PlayGround_AfterExchangeAutorizationCode.png)

以上で、ユーザー認証と認可が終わったので、
次から Gmail API を利用して受信メールを取得していきます。
まずは、API を選択します。  
List possible operations ボタンを押下すると、使用できる API が選択できます。
下図に示した API を選択してください。  
![APIの選択](/media/OAuth2PlayGround_SelectAPI.png)

選択すると、Request URI に選択した API がセットされています。  
![APIの選択後](/media/OAuth2PlayGround_ModifyAPI.png)

{userId}にハイライトが当たっているので、その箇所を me に修正して下さい。  
me は認証したユーザーを指す[パラメータ](https://developers.google.com/gmail/api/v1/reference/users/messages/list?hl=ja#parameters)です。  
![APIの選択後](/media/OAuth2PlayGround_AfterModifyAPI.png)

修正後、Send the request ボタンを押下します。  
すると、API が実行され、画面の右側にレスポンス（実行結果）が表示されます。  
![実行結果(list)](/media/OAuth2PlayGround_SendRequestList.png)

実行結果として、メールボックスに存在するメールの id（識別子）やスレッド id などが取得できます。  
メールの本文など、メールの詳細情報を取得したい場合は、
現在の Request URI の値の末尾に`/{id}`を追加します。  
 （全体:https&#58;//www.googleapis.com/gmail/v1/users/me/messages/{id}）  
{id}は、先の実行結果の id の値を一つ選んで、その値で置き換えて下さい。  
![詳細取得リクエスト(detail)](/media/OAuth2PlayGround_AddUrlToId.png)

そして、再度 Send the request ボタンを押下すると次の結果を得ます。  
![実行結果(detail)](/media/OAuth2PlayGround_SpecifiedMessageResult.png)

これで、メール本文などの詳細情報が取得できているのですが、
件名やメール本文などは、UTF-8 や Base64 でエンコードされているので、デコードしないと日本語として認識できないのでご注意ください。

以上、今回は、OAuth 2.0 Playground で Gmail API を試しに利用してみました。

### 参考情報

-   [Gmail API Guides](https://developers.google.com/gmail/api/guides?hl=ja)
-   [Gmail API Reference](https://developers.google.com/gmail/api/v1/reference?hl=ja)
