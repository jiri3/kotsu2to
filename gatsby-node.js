const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          group(field: frontmatter___category) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  category
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const groups = result.data.allMarkdownRemark.group

  groups.forEach(group => {
    const posts = group.edges
    posts.forEach((post, index) => {
      const category = post.node.frontmatter.category
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      if (category === `blog`) {
        // Create blog posts pages.
        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      } else {
        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
          },
        })
      }
    })
  })

  // Create tag category pages
  createTagPage(createPage, graphql)
}

async function createTagPage(createPage, graphql) {
  const tagPage = path.resolve(`./src/templates/tag-page.js`)
  const tagResult = await graphql(
    `
      {
        allMarkdownRemark {
          distinct(field: frontmatter___tags)
        }
      }
    `
  )

  if (tagResult.errors) {
    throw tagResult.errors
  }

  const tags = tagResult.data.allMarkdownRemark.distinct

  tags.forEach(tag => {
    createPage({
      path: `tag/${tag}`,
      component: tagPage,
      context: {
        tag: tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
