module.exports = {
  siteMetadata: {
    title: `Paul Drummond`,
    titleTemplate: "%s · Paul Drummond",
    description: "Paul Drummond's coding blog",
    url: "https://pauldrummond.dev", // No trailing slash allowed!
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
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
