const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { findLabelByName, getCategoriesName } = require(`./src/properties`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
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
                  updatedate(formatString: "YYYY-MM-DD")
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
      const updatedate = post.node.frontmatter.updatedate
      const title = post.node.frontmatter.title
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      if (getCategoriesName().indexOf(category) != -1) {
        // Create blog posts pages.
        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            updatedate: updatedate,
            pageTitle: title,
            previous,
            next,
          },
        })
      } else {
        // Create pages.
        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            pageTitle: title,
            updatedate: updatedate,
          },
        })
      }
    })
  })

  // Create index pages every category
  createIndexPages(createPage)

  // Create tag category pages
  createTagPage(createPage, graphql)
}

async function createIndexPages(createPage) {
  const template = path.resolve(`./src/templates/category-index.tsx`)
  getCategoriesName().forEach(category => {
    createPage({
      path: `${category}/`,
      component: template,
      context: {
        category: category,
        pageTitle: `${findLabelByName(category)}`,
      },
    })
  })
}

async function createTagPage(createPage, graphql) {
  const tagPage = path.resolve(`./src/templates/tag-page.tsx`)
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
      path: `tag/${tag}/`,
      component: tagPage,
      context: {
        tag: tag,
        pageTitle: `${tag}`,
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

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const pokemons = [
    { name: "Pikachu", type: "electric" },
    { name: "Squirtle", type: "water" },
  ]

  pokemons.forEach(pokemon => {
    const node = {
      name: pokemon.name,
      type: pokemon.type,
      id: createNodeId(`Pokemon-${pokemon.name}`),
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemon),
      },
    }
    actions.createNode(node)
  })
}
