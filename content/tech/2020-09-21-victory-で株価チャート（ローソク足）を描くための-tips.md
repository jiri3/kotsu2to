---
category: tech
date: 2020-09-21T13:47:34.345Z
updatedate: 2020-09-21T14:24:02.252Z
title: Victory で株価チャート（ローソク足）を描くための Tips
description: Victory（React & React Native 用のチャート描画ライブラリ） で株価チャート（ローソク足）を描くための Tips を紹介します。
tags:
  - Victory
  - React
---
[Victory](https://formidable.com/open-source/victory/) は、React & React Native 用のチャート描画ライブラリです。  
棒グラフや円グラフなどの種々のチャートを描く事ができます。  
今回は、Victory を利用して株価チャート（ローソク足）を描いてみたので、
その Tips を紹介します。

実際に Victory を利用して作成したローソク足チャートのサンプルは[こちら](/sandbox)です。  

#### Victory を install する

npm にて install します。

```bash
$ npm i -S victory
```

#### ローソク足を描画する

Victory で次のローソク足を描画します。

![ローソク足チャート1](/media/victory-candlestick-1.png)

上図のローソク足を描くコードは次の通りです。
また、[こちら](https://github.com/jiri3/kotsu2to/commit/a75a44091ec832af95025f3340674964a4f7fc70)は関連するコミットです。

```javascript
<VictoryChart
  scale={{ x: "time" }}
  domainPadding={{ x: 25 }}
  theme={VictoryTheme.material}
>
  <VictoryAxis dependentAxis />
  <VictoryAxis tickFormat={(t) => moment(t).format("HH:mm")} />
  <VictoryCandlestick
    candleColors={{ positive: "#c43a31", negative: "#2f8be0" }}
    data={[
      { x: new Date(2020, 8, 20, 9, 0), open: 1, close: 2, high: 3, low: 0 },
      { x: new Date(2020, 8, 20, 9, 5), open: 2, close: 1, high: 3, low: 0 },
    ]}
  />
</VictoryChart>
```

以下、上記コードで利用している Victory のコンポーネントについて説明します。  
まずは、各コンポーネントの概要です。

| コンポーネント名   | 概要                                                                          |
| :----------------- | :---------------------------------------------------------------------------- |
| VictoryChart       | ラッパーコンポーネントです。children 要素に指定したチャートや軸を描画します。 |
| VictoryAxis        | 軸を描画するためのコンポーネントです。                                        |
| VictoryCandlestick | ローソク足を描画するためのコンポーネントです。                                |

次に詳細を説明します。

##### VictoryChart

今回利用した各種 props の説明をします。

###### scale

グラフのスケールを設定するプロパティです。  
株価の横軸は時間なので、"time"を設定しています。  
y 軸は設定していませんが、この場合はデフォルトの"linear"（リニアスケール）が適用されます。

###### domainPadding

グラフの領域の上下左右に対して適用する padding の値です。  
今回設定した{ x: 25 }は、左右に対して、25px の padding を設定することになります。  
これを設定した理由は、1 本目のローソク足が y 軸と重なるのを防ぐためです。

###### theme

Victory のチャートを描くコンポーネント全てのスタイルを設定するプロパティです。  
Victory のコンポーネントには、それぞれ style プロパティがあり、
そちらでも style の設定ができますが、ベースとなる設定が theme で一括でできるという感じです。  
設定値には、grayscale と material があります。  
この設定値は、好みで決めました。

##### VictoryAxis

今回は、2 つ VictoryAxis を宣言していますが、それぞれ y 軸と x 軸の設定となります。

###### dependentAxis

従属変数側の軸であるかを設定するプロパティです。
設定値が true の場合、従属変数側の軸となります。  
要するに、true の場合 y 軸であることを指します。

###### tickFormat

メモリのラベルのフォーマットを設定するプロパティです。  
今回、x 軸のラベルが時分フォーマットで表示されるように moment モジュールを利用してフォーマットしています。

##### VictoryCandlestick

###### candleColors

陽線(positive)と陰線(negative)の色を設定するプロパティです。

###### data

チャートとして描画するデータを設定するプロパティです。  
VictoryCandlestick に場合は、次のオブジェクトの配列を設定します。

```javascript
{
  x: Date; // 時間
  open: number; // 始値
  close: number; // 終値
  high: number; // 高値
  low: number; // 安値
}
```

他にもプロパティはありますので、詳細は[公式ページ](https://formidable.com/open-source/victory/docs)の方を参照ください。
分かりやすくまとまっています。

以上で、ローソク足チャートを描画するための基本的な説明は終了です。  
次節以降は、応用編の説明します。

#### マウスポインタで合わせたローソク足の株価をツールチップで表示する

次の図で示したようにツールチップで株価を表示するための実装を紹介します。  
[こちら](https://github.com/jiri3/kotsu2to/commit/6f99fccd3b006b543433bf40ad58c5ed348ca827)は関連するコミットです。

![ローソク足チャート1](/media/victory-candlestick-2.png)

実装は次のようになります。  
上記の実装に対して、VictoryCandlestick 次のプロパティの設定を追加します。

- labelComponent
- labels

```javascript
...
<VictoryCandlestick
  // 他の設定は省略
  labelComponent={
    <VictoryTooltip
      constrainToVisibleArea
      style={{ textAnchor: "start" }}
      flyoutPadding={{ top: 0, bottom: 10, left: 10, right: 20 }}
    />
  }
  labels={({ datum }): any => {
    return [
      `時間: ${moment(datum.x).format("HH:mm")}`,
      `始値: ${datum.open}`,
      `安値: ${datum.low}`,
      `高値: ${datum.high}`,
      `終値: ${datum.close}`,
    ];
  }}
/>
...
```

##### labelComponent

ラベルを描画するための、コンポーネントを設定します。  
今回は、ラベルをツールチップとして表示させたいので、VictoryTooltip を設定します。  
次に、VictoryTooltip で設定しているプロパティについて説明します。

- constrainToVisibleArea  
  ツールチップの表示が見切れないように、表示場所を可視領域に制限する設定です。
- style  
  ツールチップに表示するテキストのスタイルを設定するプロパティです。  
  今回はテキストのアライメントを左寄せにする設定をしています。
- flyoutPadding  
  ラベルとツールチップの端との padding を設定するプロパティです。  
  Victory 側のツールチップの大きさを決定する演算がうまくいっていないのか、
  左右の padding を設定しないとラベルがツールチップからはみでてしまうので設定しました。

##### labels

ラベルに表示するテキストを設定するプロパティです。  
引数の datum から data に設定した値(株価)を取得できるので、
今回はその値を元にツールチップに表示するテキストを生成しました。  
戻り値を配列にすると 1 要素ごとに改行が入り、ツールチップに表示する事ができます。  
実は、戻り値の型は、定義ファイル上、string であり配列は返せないのですが（version は 35.0.9 です。）、any を使って強引に文字列の配列を返しています。  
配列で返した理由は、改行コードを含めた文字列を返すと、下図のようにアライメントが揃わなかったからです。  
この対応は強引な気はしますが、[公式サイト](https://formidable.com/open-source/victory/docs/victory-label#backgroundpadding)で配列で返しているサンプルを見つけたので、やってもいいかと思っています。

![ツールチップ内のテキストのアライメントが揃わない](/media/victory-tooltip-alignment.png)

#### ズーム機能とカーソル機能

ズーム機能は、チャートの指定部分を拡大縮小する機能です。  
PC ならばマウスポインタを中心にして、マウスホイールの操作で拡大縮小できます。  
また、ズーム後ドラッグ操作で描画位置をずらすことができます。  
サンプルは[公式ページ](https://formidable.com/open-source/victory/docs/victory-zoom-container)を参照ください。

カーソル機能は、チャート上に座標付きのカーソルを表示する機能です。  
サンプルは[公式ページ](https://formidable.com/open-source/victory/docs/victory-cursor-container)を参照ください。

これらは、VictoryChart の containerComponent の設定だけで簡単に実装可能です。  
ズーム機能ならば、containerComponent に VictoryZoomContainer を
カーソル機能ならば、containerComponent に VictoryCursorContainer を設定します。

```javascript
// ズーム機能の場合
<VictoryChart containerComponent={<VictoryZoomContainer />}>...</VictoryChart>
// カーソル機能の場合
<VictoryChart containerComponent={<VictoryCursorContainer />}>...</VictoryChart>

```

---

今回は、Victory を利用して株価チャート（ローソク足）を描くための Tips を紹介しました。