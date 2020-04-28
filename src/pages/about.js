import React from "react"
import { HomeLayout } from "../layouts/home-layout"

export default props => {
  return (
    <HomeLayout {...props}>
      <ul>
        <li>
          <b>Twitter:</b>{" "}
          <a href="https://twitter.com/pdrummond">twitter.com/pdrummond</a>
        </li>
        <li>
          <b>Github:</b>{" "}
          <a href="https://github.com/pdrummond">github.com/pdrummond</a>
        </li>
        <li>
          <b>LinkedIn:</b>{" "}
          <a href="https://linkedin.com/in/paul-drummond-3400318">
            linkedin.com/in/paul-drummond-3400318
          </a>
        </li>
      </ul>
    </HomeLayout>
  )
}
