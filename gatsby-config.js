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
  ],
}
