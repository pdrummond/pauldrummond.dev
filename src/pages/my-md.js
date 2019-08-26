import React from "react"
import { graphql } from "gatsby"
import { css } from "styled-components"
import { rhythm } from "../utils/typography"
import { DefaultLayout } from "../layouts/default-layout"

export default props => {
  return (
    <DefaultLayout {...props}>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Markdown files
        </h1>
        <h4>{props.data.allMarkdownRemark.totalCount} Posts</h4>
        {props.data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </DefaultLayout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
