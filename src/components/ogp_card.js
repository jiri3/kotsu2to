import React from "react"

export default class OgpCardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      input: ``,
      ...this.getInitOgpValue(),
    }
  }

  getInitOgpValue() {
    return {
      ogp: {
        title: ``,
        description: ``,
        image: ``,
        url: ``,
        site_name: ``,
        type: ``,
        locale: ``,
      },
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  async handleClick() {
    try {
      const ogp = await fetchOgp(this.state.input)
      console.log(this.state.input, ogp)
      this.setState({ ogp: ogp })
    } catch (e) {
      this.setState(this.getInitOgpValue())
    }
  }
  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={this.handleChange}
          style={{ width: "70%" }}
        />
        <button type="button" onClick={this.handleClick}>
          取得する
        </button>
        <OgpLayout ogp={this.state.ogp}></OgpLayout>
      </div>
    )
  }
}

class OgpLayout extends React.Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>タグ</td>
              <td>値</td>
            </tr>
            {Object.keys(this.props.ogp)
              .sort()
              .map(value => {
                return (
                  <tr key={value}>
                    <th>{value}</th>
                    <td>
                      {this.props.ogp[value]}
                      {value === "image" && this.props.ogp.image && (
                        <img
                          alt="イメージ画像"
                          src={this.props.ogp.image}
                          style={{
                            width: "250px",
                            height: "auto",
                            display: "block",
                            alignContent: "center",
                          }}
                        />
                      )}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
}

async function fetchOgp(url) {
  try {
    const responce = await fetch(
      `https://kotsukotsu-ogp-api.vercel.app/api/ogp?url=${url}`,
      // `http://localhost:3000/api/ogp?url=${url}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
    const json = await responce.json()
    return json
  } catch (e) {
    throw e
  }
}
