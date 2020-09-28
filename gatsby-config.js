module.exports = {
  siteMetadata: {
    title: `Paul Drummond`,
    titleTemplate: "%s · Paul Drummond",
    description: "Paul Drummond's dev blog",
    url: "https://pauldrummond.dev",
    twitterUsername: "@pdrummond",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt: true,
        excerpt_separator: `<!-- end -->`,
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
              prompt: {
                global: true,
              },
            },
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-146507667-1",
        head: false,
      },
    },
    "gatsby-plugin-draft",
  ],
}
