import React, { useCallback, useState } from "react"
import Layout from "../components/layout"
import OgpCardContainer from "../components/ogp_card"
import { PageProps } from "gatsby"
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTheme,
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
        <h3>OGPタグの取得</h3>
        <OgpCardContainer></OgpCardContainer>
        <h3>ローソク足チャート</h3>
        <CandleSticks></CandleSticks>
      </Layout>
    )
  }
}

const CandleSticks: React.FC<{}> = (props) => {
  return (
    <div>
      <VictoryChart
        domainPadding={{ x: 25 }}
        scale={{ x: "time" }}
        theme={VictoryTheme.material}
      >
        <VictoryAxis dependentAxis />
        <VictoryAxis tickFormat={(t) => moment(t).format("HH:mm")} />
        <VictoryCandlestick
          candleColors={{ positive: "#c43a31", negative: "#2f8be0" }}
          data={[
            {
              x: new Date(2020, 8, 20, 9, 0),
              open: 1,
              close: 2,
              high: 3,
              low: 0,
            },
            {
              x: new Date(2020, 8, 20, 9, 5),
              open: 2,
              close: 1,
              high: 3,
              low: 0,
            },
          ]}
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
