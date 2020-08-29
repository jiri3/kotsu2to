const { findLabelByName } = require(`./src/properties`)

module.exports = {
  siteMetadata: {
    title: `コツコツと`,
    topPage: `top`,
    author: {
      name: `jiri3`,
      summary: ``,
    },
    description: `コツコツと綴ってまいります`,
    siteUrl: `https://kotsukotsu.work/`,
    siteImage: `https://kotsukotsu.work/media/kotsu2to-icon.png`,
    social: {
      twitter: ``,
    },
    menu: [
      { name: "トップページ", url: "/" },
      { name: findLabelByName("tech"), url: "/tech/" },
      { name: findLabelByName("random_note"), url: "/random_note/" },
      {
        name: "免責事項・プライバシーポリシー",
        url:
          "/pages/2020-08-06-%E5%85%8D%E8%B2%AC%E4%BA%8B%E9%A0%85%E3%83%BB%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC/",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-175184526-1`,
        head: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `コツコツと`,
        short_name: `コツコツと`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/media/kotsu2to-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/tag/*`, `/404*`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }`,
        serialize: ({ site, allSitePage }) => {
          return allSitePage.nodes.map(node => {
            const { path } = node
            const url = `${site.siteMetadata.siteUrl}${node.path}`
            if (path.split("/").length < 4) {
              // 「/」か「/*/」のパスの場合(記事の一覧を表示するページの場合)
              return {
                url: url,
                changefreq: `weekly`,
                priority: 1.0,
              }
            }
            return {
              url: url,
              changefreq: `yearly`,
              priority: 0.5,
            }
          })
        },
      },
    },
  ],
}
