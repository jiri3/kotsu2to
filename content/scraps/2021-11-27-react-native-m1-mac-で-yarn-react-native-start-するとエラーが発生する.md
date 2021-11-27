---
category: scraps
date: 2021-11-27T02:31:48.797Z
updatedate: 2021-11-27T02:45:47.623Z
title: "[React Native] M1 Mac で yarn react-native start するとエラーが発生する"
description: M1 Mac で yarn react-native start すると「error Command failed with
  signal "SIGABRT".」エラーが発生し 、Metro Bundler が起動しませんでした。Node.js
  のバージョンを上げることで解決できました。
tags:
  - M1 Mac
  - React Native
---
M1 Mac で `% yarn react-native start` すると「error Command failed with signal "SIGABRT".」エラーが発生し、Metro Bundler が起動しませんでした。

```script
# エラー発生時のログを抜粋
% yarn react-native start

...省略

 <--- JS stacktrace --->

FATAL ERROR: wasm code commit Allocation failed - process out of memory

...省略

error Command failed with signal "SIGABRT".
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

  
エラー時の環境

- M1 Mac（arm64）
- node v14.16.0
- react-native v0.64.1

#### 解決方法

こちら[^1]を参考にし、node のバージョンを v14.18.1 にしたところ、エラーが解消できました。

[^1]: [M1 Mac の Node.js で FATAL ERROR: wasm code commit Allocation failed - process out of memory が出る場合の対処法](https://zenn.dev/catnose99/scraps/6c9e7ebabb6221)
