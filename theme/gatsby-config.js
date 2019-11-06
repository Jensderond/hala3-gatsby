const path = require('path')

module.exports = options => {
  const { contentPath, iconPath, basePath } = options

  return {
    siteMetadata: {
      title: 'Gatsby Theme Rotterdam',
      description: '',
      url: '',
      author: '',
      intro: '',
      menuLinks: [
        {
          name: 'Gatsby Theme Rotterdam',
          slug: '/',
        },
      ],
    },
    plugins: [
      {
        resolve: 'gatsby-plugin-page-creator',
        options: {
          path: `${__dirname}/src/pages`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath || `content`,
          name: contentPath || `content`,
        },
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            `gatsby-remark-prismjs`,
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1000,
                linkImagesToOriginal: false,
                withWebp: true,
              },
            },
          ],
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-styled-components`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-offline`,
    ].filter(Boolean),
  }
}
