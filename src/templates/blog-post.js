import React from "react"
import { graphql } from "gatsby"
import { DefaultLayout } from "../layouts/default-layout"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <DefaultLayout>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </DefaultLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
