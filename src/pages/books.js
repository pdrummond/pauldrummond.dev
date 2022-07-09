import React from "react"
import { css } from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import { rhythm } from "../utils/typography"
import { HomeLayout } from "../layouts/home-layout"
import SEO from "../components/seo"

export default props => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fields: { draft: { eq: false } }
          frontmatter: { tags: { in: ["booknotes"] } }
        }
      ) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `)
  return (
    <HomeLayout {...props}>
      <SEO title="Paul Drummond's Blog" />
      <h1>Book Notes</h1>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                    font-size: 16px;
                  `}
                >
                  {node.frontmatter.date}
                </span>
              </h3>
            </Link>
            <p>{node.excerpt}</p>
          </div>
        ))}
        {data.allMarkdownRemark.edges.length === 0 &&
          "No book notes yet - adding soon!"}
      </div>
    </HomeLayout>
  )
}
