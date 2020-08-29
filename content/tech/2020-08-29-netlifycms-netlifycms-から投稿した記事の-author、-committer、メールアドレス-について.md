---
category: tech
date: 2020-08-29T04:44:34.676Z
title: "[NetlifyCMS]NetlifyCMS から投稿した記事の Author、 Committer、メールアドレス について"
description: >-
  このサイトのソースを管理している Git レポジトリの log を見たところ、GitHub に登録している
  Author、Committer、メールアドレスと異なっていたので、原因を調べてみました。
tags:
  - Netlify
---

先日、このサイトのソースを管理している Git レポジトリの log を見たところ、GitHub に登録している Author、Committer、メールアドレスと異なっていたので、原因を調べてみました。

#### 原因

調査したところ、NetlifyCMS から投稿した記事のコミットに対する Author、Committer、
メールアドレスが異なっていました。  
そこで、Netlify のどこで設定した情報が Author と Committer として利用されているか調べました。  
結論は、 Identity で設定した Name と Email でした。  
※ 前提として、私は Git Gateway[^1]を利用して GitHub と連携させています。

![Identity](/media/netlifycms-identity.png)

#### Author と Committer、メールアドレスの変更方法

Author と Committer、メールアドレスの変更方法は、Netlify のサイト管理画面からユーザー情報を変更することです。

まずは、サイト管理画面上部にある Identity メニューを選択します。  
次に、変更するユーザーを選択します。

![edit settings](/media/netlifycms-select-user.png)

User metadata にある「Edit settings」ボタンを押下します。

![edit settings](/media/netlifycms-edit-settings.png)

そして、Name と Email に所望の値を設定して、「Save」ボタンを押下します。

![modify name and email](/media/netlifycms-modify-name-mail.png)

それから、GitHub のアクセストークンを再生成します。  
サイト管理画面上部にある Settings メニュー > Identity > Services > Git Gateway と辿っていきます。

![service menu](/media/netlifycms-service-menu.png)

「Edit settings」ボタンを押下し、「Generate access token in GitHub」を選択します。  
最後に「Save」ボタンを押下して完了です。

![modify name and email](/media/netlifycms-git-gateway.png)

![modify name and email](/media/netlifycms-generate-access-token-in-github.png)

これで、次回のコミットから、変更後のユーザー情報で Author、Committer、メールアドレスが反映されます。  
もちろんですが NetlifyCMS にログインするメールアドレスは変更後のものとなります。  
私は変更前のメールアドレスを入力して何回かログインに失敗してしまいました…ご注意ください。

#### 参考

今までのコミット時に登録されていた Author、Committer、メールアドレスを変更する場合は、下記のサイトが参考になります。

- [tweeeety のぶろぐ的めも](https://www.tweeeety.blog/entry/2015/03/10/211100)
- [Git の Commit Author と Committer を変更する](https://qiita.com/sea_mountain/items/d70216a5bc16a88ed932)

[^1]: [Git Gateway](https://docs.netlify.com/visitor-access/git-gateway/)
