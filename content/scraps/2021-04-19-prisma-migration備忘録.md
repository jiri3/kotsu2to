---
category: scraps
date: 2021-04-19T13:31:21.479Z
updatedate: 2021-04-19T13:55:07.220Z
title: "[prisma] migration備忘録"
description: migration備忘録
tags:
  - prisma
  - psql
---
開発中のDBに対してprismaのmigrateを使うのは怖い気がするので、別のDBを作成しておく。

```bash
# psql
postgres=# create database prisma_s;

# \lでデータベース一覧を参照できる
```

.envのDATABASE_URLを作成したDBに変更する。

prismaのmigrationを実行する。  
事前に、```prisma/schema.prisma```を作成しておく。

```bash
# 初回はリセットしておく
# リセットするとDBにmigrationの記録をとるテーブルが作成される
$ yarn prisma migrate reset

# sqlだけ生成する。DBに生成したsqlは反映しない。
$ yarn prisma migrate dev --create-only --name hogeFuga
```
migrate devを実行すると、```prisma/migrations/yyyymmddhhmmss_hoge_fuga```の形式でフォルダが生成されて、その配下にsqlファイル（migration.sql）が生成される。

あとは、このsqlを開発中のDBで実行する。

なんとなく、もっといい使い方がありそうな気がするので、そのうちドキュメントを読みたいところ。

#### 参考
* https://www.prisma.io/docs/reference/api-reference/command-reference