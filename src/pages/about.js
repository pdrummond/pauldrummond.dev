import React from "react"
import { HomeLayout } from "../layouts/home-layout"

export default props => {
  return (
    <HomeLayout {...props}>
      <div>
        <img src="/images/skye.png" alt="photo of me on Isle of Skye" />
        <h1>Profiles</h1>

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
        <br />
        <br />
        <br />
        <br />
        <h1>Side Projects</h1>
        <ul>
          <li>
            <a href="https://olz-prod.herokuapp.com/welcome">OpenLoopz</a>
            <p>
              End-to-end project management and chat app rolled into one
              seamless solution, developed in Java/Spring5 and Backbone.js.
            </p>
          </li>
          <li>
            <a href="https://kaiser-prod.herokuapp.com">Kaiser</a>
            <p>
              Visual Project Management app designed for developers, developed
              with React, react-dnd and Redux It's my own take on the Kanban
              approach popularized by apps like Trello, extended to be a better
              fit for developers.
            </p>
          </li>
          <li>
            <a href="https://ols-test9.herokuapp.com/welcome">OpenLoops</a>
            <p>
              A modern re-write of the original OpenLoopz app, this time
              developed in JavaScript using Meteor and ReactJS.
            </p>
          </li>
        </ul>
      </div>
    </HomeLayout>
  )
}
