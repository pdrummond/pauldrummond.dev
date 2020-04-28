import React from "react"
import { graphql } from "gatsby"
import { PostLayout } from "../layouts/post-layout"
import SEO from "../components/seo"

export default props => {
  const post = props.data.markdownRemark
  const slug = post.fields.slug
  const twitterDiscussUrl = `https://twitter.com/search?q=${encodeURIComponent(
    `https://pauldrummond.dev${slug}`
  )}`
  return (
    <PostLayout {...props}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.spoiler}
        slug={post.fields.slug}
      />
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <footer>
        <p>
          <a href={twitterDiscussUrl} target="_blank" rel="noopener noreferrer">
            Discuss on Twitter
          </a>
        </p>
      </footer>
    </PostLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`