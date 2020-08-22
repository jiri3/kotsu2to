import React from "react"
import Layout from "../components/layout"
import OgpCardContainer from "../components/ogp_card"

export default class Sandbox extends React.Component {
  render() {
    const { location } = this.props
    return (
      <Layout location={location} title="SandBox">
        <h3>OGPタグの取得</h3>
        <OgpCardContainer></OgpCardContainer>
      </Layout>
    )
  }
}
