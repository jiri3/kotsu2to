import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Menu from "./menu"
import style from "./layout.module.css"

const Layout = ({ location, title, children }) => {
  return (
    <div>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
        className={style.layoutRoot}
      >
        <header>{getHeader(location, title)}</header>
        <div className={style.layoutContents}>
          <main>{children}</main>
          <aside className={style.right}>
            <Menu menuStyle={style} />
          </aside>
        </div>
        <footer></footer>
      </div>
    </div>
  )
}

export default Layout

function getHeader(location, title) {
  const rootPath = `${__PATH_PREFIX__}/`

  if (location.pathname === rootPath) {
    return (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    return (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
}
