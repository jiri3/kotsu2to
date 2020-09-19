import React from "react"
import Layout from "../components/layout"
import OgpCardContainer from "../components/ogp_card"
import { PageProps } from "gatsby"

export default class Sandbox extends React.Component<PageProps> {
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
