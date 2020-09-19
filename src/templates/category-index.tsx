import React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import BredcrumbList from "../components/bredcrumb_list"
import { rhythm } from "../utils/typography"
import { findLabelByName } from "../properties"
import { CategoryIndexQuery } from "../../types/graphql-types"

interface Props extends PageProps {
  data: CategoryIndexQuery
  pageContext: { category: string }
}

const CategoryIndex: React.FC<Props> = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const seoTitle = findLabelByName(pageContext.category)
  const tags = data.allMarkdownRemark.distinct
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={seoTitle} />
      <BredcrumbList location={location}></BredcrumbList>
      <h1
        style={{
          marginTop: rhythm(0.5),
          marginBottom: 0,
        }}
      >
        {seoTitle}
      </h1>
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
  query CategoryIndex($category: String!) {
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
