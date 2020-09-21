import React, { useCallback, useState } from "react"
import Layout from "../components/layout"
import OgpCardContainer from "../components/ogp_card"
import { PageProps } from "gatsby"
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTheme,
  VictoryTooltip,
} from "victory"
import moment from "moment"
import SEO from "../components/seo"

interface Data {
  x: Date
  open: number
  close: number
  high: number
  low: number
}

export default class Sandbox extends React.Component<PageProps> {
  render() {
    const { location } = this.props
    return (
      <Layout location={location} title="コツコツと">
        <SEO description="お砂場です。" title="SandBox"></SEO>
        <h3 id="ogp">OGPタグの取得</h3>
        <OgpCardContainer></OgpCardContainer>
        <h3 id="candlestick">ローソク足チャート</h3>
        <CandleSticks></CandleSticks>
      </Layout>
    )
  }
}

const CandleSticks: React.FC<{}> = (props) => {
  return (
    <div style={{ width: "80%" }}>
      <VictoryChart
        domainPadding={{ x: 25 }}
        scale={{ x: "time" }}
        theme={VictoryTheme.material}
      >
        <VictoryAxis dependentAxis />
        <VictoryAxis tickFormat={(t) => moment(t).format("HH:mm")} />
        <VictoryCandlestick
          candleColors={{ positive: "#c43a31", negative: "#2f8be0" }}
          data={getCandleSticksTestData()}
          labels={({ datum }): any => {
            return [
              `時間: ${moment(datum.x).format("HH:mm")}`,
              `始値: ${datum.open}`,
              `安値: ${datum.low}`,
              `高値: ${datum.high}`,
              `終値: ${datum.close}`,
            ]
          }}
          labelComponent={
            <VictoryTooltip
              style={{ textAnchor: "start" }}
              flyoutPadding={{ top: 0, bottom: 10, left: 10, right: 20 }}
              constrainToVisibleArea
            />
          }
        />
      </VictoryChart>
    </div>
  )
}
const getCandleSticksTestData = (): Data[] => {
  const time = moment(9, "HH")
  return [
    createData(time.toDate(), 1, 2, 3, 0),
    createData(time.add(5, "minute").toDate(), 2, 1, 3, 0),
  ]
}

const createData = (
  x: Date,
  open: number,
  close: number,
  high: number,
  low: number
): Data => {
  return {
    x: x,
    open: open,
    close: close,
    high: high,
    low: low,
  }
}
