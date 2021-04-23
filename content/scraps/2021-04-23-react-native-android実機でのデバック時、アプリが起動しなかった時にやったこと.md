---
category: scraps
date: 2021-04-23T04:46:45.291Z
updatedate: 2021-04-23T05:56:09.017Z
title: "[React Native] android実機でのデバック時、アプリが起動しなかった時にやったこと"
description: android実機でのデバック時、エラーが発生してアプリが起動しなかった時にやったことを書いています。
tags:
  - React Native
---
```$ yarn react-native run-android```を実行すると、
Metro Bundlerのコンソールが立ち上がって、次のようにバンドルのインジケータが表示されます。  
なぜか、インジケータが表示されず、アプリを起動しにいって、すぐにエラーで落ちる事象が発生しました。
その時に次の対応をしたら、アプリがandroid実機でデバック実行できるようになりました。

gradleのクリーン

#### 参考
* https://hacknote.jp/archives/28943/
* https://qiita.com/tani-shi/items/a29490f4133ee90e2bcf
* https://medium.com/@oogatta/android-%E9%96%8B%E7%99%BA%E3%81%A7%E3%81%8A%E3%81%8B%E3%81%97%E3%81%AA%E3%81%A8%E3%81%8D%E3%81%AF%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E3%83%93%E3%83%AB%E3%83%89%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E3%81%AE%E5%89%8A%E9%99%A4%E3%82%82%E5%BF%98%E3%82%8C%E3%81%9A%E3%81%AB-c6ed1b0d4fd3