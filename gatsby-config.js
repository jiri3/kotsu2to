const { findLabelByName } = require(`./src/properties`)
const moment = require("moment")

module.exports = {
  siteMetadata: {
    title: `コツコツと`,
    yearOfPublished: 2020,
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
      { name: "当サイトについて", url: "/pages/about/" },
      { name: findLabelByName("tech"), url: "/tech/" },
      { name: findLabelByName("random_note"), url: "/random_note/" },
      { name: findLabelByName("scraps"), url: "/scraps/" },
      {
        name: "免責事項・プライバシーポリシー",
        url:
          "/pages/2020-08-06-%E5%85%8D%E8%B2%AC%E4%BA%8B%E9%A0%85%E3%83%BB%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC/",
      },
      { name: "お問い合わせ", url: "/pages/contact/" },
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
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/tag/*`, `/404*`],
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
                pageContext
              }
            }
          }`,
        serialize: ({path, pageContext}) => {
            const url = `${path}`
            const updatedate = pageContext.updatedate
            const lastmod = updatedate
              ? updatedate
              : moment().format("YYYY-MM-DD")
            if (path.split("/").length < 4) {
              // 「/」か「/*/」のパスの場合(記事の一覧を表示するページの場合)
              return {
                url: url,
                lastmod: lastmod,
                changefreq: `weekly`,
                priority: 1.0,
              }
            }
            return {
              url: url,
              lastmod: lastmod,
              changefreq: `yearly`,
              priority: 0.5,
            }
        },
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
  ],
}
