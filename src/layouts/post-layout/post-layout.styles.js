import styled from "styled-components"

export const LayoutWrapper = styled.div``

export const Header = styled.header`
  width: 100%;
  position: relative;
  z-index: 0;
  align-items: center;
  display: flex;
  height: 100px;
  background-color: white;

  a {
    text-decoration: none;
  }
`

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 950px;
  margin: 0px auto;
  padding: 0px 40px;
`

export const HeaderTitle = styled.h3`
  color: orange;
  text-decoration: none;
  margin: 0px;
  margin-top: 10px;
`

export const HeaderLinks = styled.span`
  list-style: none;
  float: right;
  a {
    padding: 5px;
    text-decoration: none;
    color: gray;

    &:hover,
    &.active {
      color: black;
      border-bottom: 4px solid black;
    }
  }
`

export const HeaderLink = styled.div`
  display: inline-block;
  margin: 0;
  margin-right: 10px;
`

export const ContentWrapper = styled.div`
  max-width: 900px;
  padding: 0 1rem;
  margin: 0rem auto;
`
