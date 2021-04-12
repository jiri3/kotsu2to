---
category: scraps
date: 2021-04-12T01:07:50.482Z
updatedate: 2021-04-12T01:32:54.859Z
title: "[sed] json形式からTypeScriptのtypeに変換する"
description: sedを使ってjson形式からTypeScriptのtypeに変換する
---
次のjsonをTypeScriptのtypeに変換します。  

```javascript
//test.json
{
  "hoge": "9433",
  "fuga": 1
}
```

期待値
```javascript
{
  hoge: string,
  fuga: number
}
```

sed(BSD版)を使って実現してみました。

コマンド例
```bash
$ sed -E -e 's/(.*[[:blank:]]+.*\:[[:blank:]])(\".*\")/\1string/' -e 's/(.*[[:blank:]]+.*\:[[:blank:]])([[:digit:]]+)/\1number/' -e 's/\"//g' ./test.json
```

使用前にjsonがフォーマットされている必要があります。

#### 参考
* https://www.freebsd.org/cgi/man.cgi?query=sed&sektion=&n=1
* [正規表現メモ](http://www.kt.rim.or.jp/~kbk/regex/regex.html#SED)