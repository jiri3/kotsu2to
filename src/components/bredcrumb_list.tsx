import React, { ReactElement } from "react"
import { useStaticQuery, graphql } from "gatsby"
import style from "./bredcrumb_list.module.css"

interface Props {
  location: Location
}
const BredcrumbList: React.FC<Props> = props => {
  const { location } = props
  // GraphQLの結果を格納する
  const { site, allSitePage } = useData()
  // サイトのパスリストを生成する
  const pathList = allSitePage.nodes.map(({ path }) => encodeURI(path))

  // 階層構造を生成する
  const breadCrumbInfo = location.pathname
    .split("/")
    .filter(pathName => pathName !== "")
    .reduce(
      (pre, pathName) => {
        const parentPath = pre[pre.length - 1].path
        const currentPath = `${parentPath}${pathName}/`

        // currentPathがパスリスト中に存在するか検証する
        const pathListIndex = pathList.indexOf(currentPath)
        const isExistPage = pathListIndex !== -1

        // パンくずリストの階層名として表示するラベルを設定する
        const pageTitle =
          pathListIndex !== -1
            ? allSitePage.nodes[pathListIndex].context.pageTitle
            : pathName

        pre.push(convertToPageInfo(currentPath, pageTitle, isExistPage))
        return pre
      },
      [convertToPageInfo("/", site.siteMetadata.topPage, true)]
    )

  const breadCrumbList = breadCrumbInfo
    // 存在しないページは、パンくずリストから除外する
    .filter(({ isExistPage }) => isExistPage)
    // 最後の要素は現在のページでナビゲーションは不要なので
    // パンくずリストから除外する
    .slice(0, -1)

  return (
    <div>
      {breadCrumbList.map((page, index) => (
        <a key={index} className={style.bred} href={page.path}>
          {page.pageTitle}
        </a>
      ))}
    </div>
  )
}

function convertToPageInfo(path, pageTitle, isExistPage) {
  return { path: path, pageTitle: pageTitle, isExistPage: isExistPage }
}

function useData() {
  return useStaticQuery(graphql`
    query {
      allSitePage {
        nodes {
          path
          context {
            pageTitle
          }
        }
      }
      site {
        siteMetadata {
          topPage
        }
      }
    }
  `)
}

export default BredcrumbList
