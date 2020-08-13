import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import { rhythm } from "../utils/typography"

const CategoryIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const top = data.site.siteMetadata.topPage
  const tags = data.allMarkdownRemark.distinct
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={top} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
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
            </section>
          </article>
        )
      })}
      <hr
        style={{
          marginTop: rhythm(1),
        }}
      />
      <Tag tags={tags} />
    </Layout>
  )
}

export default CategoryIndex

export const pageQuery = graphql`
  query($category: String!) {
    site {
      siteMetadata {
        title
        topPage
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
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
      distinct(field: frontmatter___tags)
    }
  }
`
