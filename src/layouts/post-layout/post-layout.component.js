import React from "react"
import {
  LayoutWrapper,
  ContentWrapper,
  Header,
  Nav,
  HeaderTitle,
} from "./post-layout.styles"
import "./post-layout.css"
import { useStaticQuery, Link, graphql } from "gatsby"

export const PostLayout = props => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <LayoutWrapper>
      <Header>
        <Nav>
          <Link to="/">
            <HeaderTitle>{data.site.siteMetadata.title}</HeaderTitle>
          </Link>
        </Nav>
      </Header>
      <ContentWrapper>{props.children}</ContentWrapper>
    </LayoutWrapper>
  )
}
