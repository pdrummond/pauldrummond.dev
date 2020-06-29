import React from "react"
import { HomeLayout } from "../layouts/home-layout"
import SEO from "../components/seo"

export default props => {
  return (
    <HomeLayout {...props}>
      <SEO title="Not Found" />
      <h3>Oops! Page not found.</h3>
    </HomeLayout>
  )
}
