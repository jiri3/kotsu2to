---
category: scraps
date: 2021-09-03T08:38:21.892Z
updatedate: 2021-09-03T08:38:28.317Z
title: Android SDKのパッケージを確認する
description: Android Studioを利用していない場合のAndroid SDK パッケージの確認方法です。
tags:
  - Android
---
SDK Build Toolsの最新バージョンが知りたかったのですが、
[SDK Build Tools リリースノート](https://developer.android.com/studio/releases/build-tools?hl=ja)が2020年5月から更新されていない気がするので、調べてみました。  

次のコマンドで、利用可能なパッケージを表示できました。

```bash
$ sdkmanager --list

# 結果
Available Packages:
Path    | Version      | Description                                                         
------- | -------      | -------                                                             
add-ons;addon-google_apis-google-15| 3  | Google APIs                                                         
add-ons;addon-google_apis-google-16| 4  | Google APIs
... 中略
build-tools;30.0.2| 30.0.2       | Android SDK Build-Tools 30.0.2                                      
build-tools;30.0.3| 30.0.3       | Android SDK Build-Tools 30.0.3                                      
build-tools;31.0.0| 31.0.0       | Android SDK Build-Tools 31                                          
... 以下、省略
```

参考
* https://developer.android.com/studio/command-line/sdkmanager?hl=ja