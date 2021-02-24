---
category: scraps
date: 2021-02-24T03:16:10.758Z
updatedate: 2021-02-24T03:16:19.259Z
title: PostgresSQL crosstabを使う
description: PostgresSQL crosstabを使う
---
インストール済みの拡張機能を確認する。

```bash
postgres=# \dx
                 List of installed extensions
  Name   | Version |   Schema   |         Description          
---------+---------+------------+------------------------------
 plpgsql | 1.0     | pg_catalog | PL/pgSQL procedural language
(1 row)

```

利用可能な拡張機能を確認する。
```bash
postgres=# select name from pg_available_extensions order by 1;
        name         
---------------------
 adminpack
 amcheck
 autoinc
 bloom
 bool_plperl
 bool_plperlu
 btree_gin
 btree_gist
 citext
 cube
...
```

crosstabを利用するため、tablefuncをインストールする。
```bash
postgres=# create extension if not exists tablefunc;
CREATE EXTENSION
postgres=# \dx
                                 List of installed extensions
   Name    | Version |   Schema   |                        Description                         
-----------+---------+------------+------------------------------------------------------------
 plpgsql   | 1.0     | pg_catalog | PL/pgSQL procedural language
 tablefunc | 1.0     | public     | functions that manipulate whole tables, including crosstab
(2 rows)
```

参考
* https://www.postgresql.jp/document/12/html/sql-createextension.html
* https://www.postgresql.jp/document/12/html/tablefunc.html
