import React from "react"
import {
  LayoutWrapper,
  ContentWrapper,
  Header,
  Nav,
  Heading,
  HeadingTitle,
  HeadingImage,
  HeaderLinks,
  HeaderLink,
} from "./home-layout.styles"
import "./home-layout.css"
import { useStaticQuery, Link, graphql } from "gatsby"

const ListLink = props => (
  <HeaderLink>
    <Link to={props.to} className={props.active ? "active" : ""}>
      {props.children}
    </Link>
  </HeaderLink>
)

export const HomeLayout = props => {
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
            <Heading>
              <HeadingImage width="50px" src="/images/me.png" />
              <HeadingTitle>{data.site.siteMetadata.title}</HeadingTitle>
            </Heading>
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
            <ListLink to="/about" active={props.location.pathname === "/about"}>
              About
            </ListLink>
          </HeaderLinks>
        </Nav>
      </Header>
      <ContentWrapper>{props.children}</ContentWrapper>
    </LayoutWrapper>
  )
}
