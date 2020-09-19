import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

interface Props {
  menuStyle: IClassNames
}

const Menu: React.FC<Props> = ({ menuStyle }) => {
  const data = useData()
  const menu = data.site.siteMetadata.menu
  const _menuStyle = menuStyle ? menuStyle : {}

  return (
    <div className={_menuStyle.itemBox}>
      <div className={_menuStyle.itemName}>
        <b>メニュー</b>
      </div>
      <nav>
        {menu.map(({ name, url }, index) => {
          return (
            <div className={_menuStyle.item} key={index}>
              <Link to={url}>{name}</Link>
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default Menu

function useData() {
  return useStaticQuery(graphql`
    query Menu {
      site {
        siteMetadata {
          menu {
            name
            url
          }
        }
      }
    }
  `)
}
