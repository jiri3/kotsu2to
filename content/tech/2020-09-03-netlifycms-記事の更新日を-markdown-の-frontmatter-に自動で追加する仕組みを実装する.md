---
category: tech
date: 2020-09-03T12:41:35.169Z
updatedate: 2020-09-03T13:44:27.404Z
title: "[NetlifyCMS] 記事の更新日を Markdown の frontmatter に自動で追加する仕組みを実装する"
description: NetlifyCMS から作成した記事（Markdown ファイル）の frontmatter
  に記事更新日を追加します。なお、記事更新日は自動で入力できるように実装します。
tags:
  - NetlifyCMS
  - GatsbyJS
---
先日、NetlifyCMS にて作成した記事（Markdown ファイル）の frontmatter に記事更新日を追加したいと思い至りました。  
config.yml の設定で、記事更新日用の入力項目を追加するのは簡単にできますが、  
記事を更新する度に手動で入力するのは手間な上、入力忘れも起こりえます。  
そこで、自動入力の実現方法について検討してみました。  
以下、その実現方法を紹介します。

#### パッケージの確認

次のパッケージがインストール（npm install）されていることを確認してください。

- gatsby-plugin-netlify-cms[^1]
- netlify-cms-app

なお、netlify-cms-app（厳密には依存関係にある netlify-cms-core）は[2020/06/01 の修正](https://github.com/netlify/netlify-cms/blob/master/packages/netlify-cms-core/CHANGELOG.md#2280-2020-06-01)が組み込まれている必要があります。  
特に問題なければ最新版をインストールして下さい。

#### registerEventListener を設定する

NetlifyCMS は ある CMS イベントが発生した時に、設定した処理を実行する機能があります[^2]。  
利用できる CMS イベントは、「prePublish, postPublish, preUnpublish, postUnpublish, preSave, postSave」です。  
今回は、Markdown ファイルを保存する前に更新日を設定する必要があるので「preSave」を使います。
実装するコードは次の通りです。

```javascript
// src/cms/cms.js
import CMS from "netlify-cms-app";

CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    return entry.get("data").set("updatedate", new Date());
  },
});
```

handler の引数の entry は CMS から入力した情報が設定されています。  
上記の実装はその entry に更新日（現在時刻）を追加するといった実装になっています。
"updatedate"は、更新日を表しています。任意の文字列で構わないです。

次に、gatsby-config.js の plugin に次のコードを追加してください。
`modulePath`の値は、上記のコードの格納先を設定してください。

```javascript
module.exports = {
  plugins: [
    {
      // 省略
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
  ],
};
```

#### config.yml に更新日を追加する

次のように config.yml に更新日用の field を追加しました。  
更新日は自動入力なので hidden を利用し UI から入力をできないようにしました。  
（結局、保存前に上書きされますが）

```yaml
collections:
  - name: tech
    fields:
      # 追加したWidget
      # nameの値はcms.js中のsetメソッドの第一引数の文字列と合わせて下さい
      - { label: "Update Date", name: "updatedate", widget: "hidden" }
  # 以下、省略
```

以上で、実装が全て完了しました。

---

今回は、記事の更新日を Markdown の frontmatter に自動で追加するための実装方法について説明しました。  
preSave を利用して簡単にできましたが、その仕組みを見つけるまでが大変でした。  
Custom Widget[^3] で実現できるのではないかや、ファイルの更新日を利用できないかなども考えましたが、いまいちだったので、この仕組みが見つけられて良かったです。

#### 付録: 既存の記事に更新日を追加する。

新しく作成する記事は自動で更新日が追加されるようになりましたが、既存の記事は自分で更新日を追加しなくてはなりません。  
記事も多くないので手動で更新日を追加する選択肢もありましたが、
せっかくなので find と sed コマンドを利用して更新日を追加してみました
 
コマンドは次の通りです。  
sed コマンドは、GNU 版と BSD 版の 2 種類あるのですが、下記は BSD 版での動作しか確認していません。

```bash
$ find ./content -name "*.md" | xargs sed -i "" -E -e "/^date:.*/ p" -e "s/^date/updatedate/"
```

上記のコマンドの説明ですが、  
まず find で./content 配下の Markdown ファイル（記事）のパスを取得し、それを sed コマンドに渡すことで、それらのファイルのみ操作対象としています。  
sed の方は、  
私の場合、記事の作成日（date）を frontmatter に設定していたので、その行を複製して
date を updatedate に置換するようにしています。

[^1]: https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cms/

[^2]: [Registering to CMS Events](https://www.netlifycms.org/docs/beta-features/#registering-to-cms-events)

[^3]: [Creating Custom Widgets](https://www.netlifycms.org/docs/custom-widgets/)