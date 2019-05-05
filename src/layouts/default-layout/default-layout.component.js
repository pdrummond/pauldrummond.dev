import React from "react"
import {
  LayoutWrapper,
  ContentWrapper,
  Header,
  Nav,
  HeaderTitle,
  HeaderLinks,
  HeaderLink,
} from "./default-layout.styles"
import { useStaticQuery, Link, graphql } from "gatsby"

const ListLink = props => (
  <HeaderLink>
    <Link to={props.to} activeClassName="active">
      {props.children}
    </Link>
  </HeaderLink>
)

export const DefaultLayout = ({ children }) => {
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
            <HeaderTitle>
              {data.site.siteMetadata.title}
              <strong>.dev</strong>
            </HeaderTitle>
          </Link>
          <HeaderLinks>{/*<ListLink to="/">Blog</ListLink>*/}</HeaderLinks>
        </Nav>
      </Header>
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  )
}
