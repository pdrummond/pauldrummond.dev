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
import "./default-layout.css"
import { useStaticQuery, Link, graphql } from "gatsby"

const ListLink = props => (
  <HeaderLink>
    <Link to={props.to} className={props.active ? "active" : ""}>
      {props.children}
    </Link>
  </HeaderLink>
)

export const DefaultLayout = props => {
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
          <HeaderLinks>
            <ListLink
              to="/"
              active={
                props.location.pathname === "/" ||
                props.location.pathname.includes("/post")
              }
            >
              Blog
            </ListLink>
            <ListLink
              to="/about"
              pathname={props.location.pathname === "/about"}
            >
              About
            </ListLink>
          </HeaderLinks>
        </Nav>
      </Header>
      <ContentWrapper>{props.children}</ContentWrapper>
    </LayoutWrapper>
  )
}
