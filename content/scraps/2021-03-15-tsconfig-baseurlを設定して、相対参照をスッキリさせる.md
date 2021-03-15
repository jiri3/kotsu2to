---
category: scraps
date: 2021-03-15T04:24:03.929Z
updatedate: 2021-03-15T05:44:45.171Z
title: "[tsconfig] baseUrlを設定して、相対参照をスッキリさせる"
description: tsconfig.jsonのbaseUrlを設定すると相対パスの../を省略できる。
tags:
  - TypeScript
---
tsconfig.jsonのbaseUrlを設定すると相対パスの../を省略できる。

```bash
# ディレクトリ構成
.
├── components
│   └── Layout.tsx
├── package.json
├── pages
│   ├── _app.tsx
│   └── index.tsx
├── src
├── tsconfig.json
```


```json
// tsconfig.jsの設定
{
  "compilerOptions": {
    ...省略
    "baseUrl": "."
  },
}

```

```pages/index.tsx```で```componets/Layout.tsx```をimportする場合

```javascript
// pages/index.tsx

// before
import Layout from "../components/Layout";

// after
import Layout from "components/Layout";
```

#### 参考
* https://www.typescriptlang.org/tsconfig#baseUrl