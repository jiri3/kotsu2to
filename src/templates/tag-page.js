import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import BredcrumbList from "../components/bredcrumb_list"
import { rhythm } from "../utils/typography"

const TagPageTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const top = `Tag: ${pageContext.tag}`
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={top} />
      <BredcrumbList location={location}></BredcrumbList>
      <h1
        style={{
          marginTop: rhythm(0.5),
          marginBottom: 0,
        }}
      >
        {top}
      </h1>
      {posts.map(({ node }) => {
        const path = node.fields.slug
        const title = node.frontmatter.title || path
        const tags = node.frontmatter.tags
        return (
          <article key={path}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={path}>
                  {title}
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
              <Tag tags={tags} />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query TagPageBySlug($tag: String!) {
    site {
      siteMetadata {
        title
        topPage
      }
    }
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
