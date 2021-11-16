import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import * as style from "./index.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { getCategoriesName, findLabelByName } from "../properties.js"
interface Props extends PageProps {
  data: any
}

const BlogIndex: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const group = data.allMarkdownRemark.group
  const top = data.site.siteMetadata.topPage

  const groupbyCategory = group.reduce((acc, { nodes }) => {
    // graphqlでcategoryでグルーピングしているので、
    // いずれかのnode一つでも同じcategoryならば、nodesの要素全て同じcategoryになる
    const category = nodes[0].frontmatter.category
    if (category) {
      acc[category] = nodes
    } else {
      acc[category] = []
    }
    return acc
  }, {})
  console.log(groupbyCategory, group)
  const postList = getCategoriesName().map((category, index) => {
    const nodes = groupbyCategory[category]
    if (nodes) {
      return (
        <div key={`categoryArea_${index}`} className={style.categoryArea}>
          <h2 className={style.categoryName}>
            <Link className={style.link} to={category}>
              {findLabelByName(category)}
            </Link>
          </h2>
          {nodes.map((node) => {
            return (
              <article key={node.fields.slug}>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {node.frontmatter.title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                </header>
                <section>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
              </article>
            )
          })}
          <div className={style.toCategory}>
            <Link to={category}>記事一覧へ ＞</Link>
          </div>
          <hr
            style={{
              marginTop: rhythm(1),
            }}
          />
        </div>
      )
    } else {
      return null
    }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={top} />
      {postList}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        topPage
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { category: { in: ["tech", "random_note", "scraps"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___category, limit: 3) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            category
          }
        }
      }
    }
  }
`
