import React from "react"
import { HomeLayout } from "../layouts/home-layout"
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"

export default props => {
  return (
    <HomeLayout {...props}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <a style={{ color: "gray" }} href="https://twitter.com/pdrummond">
            <FaTwitter size="2em" />
          </a>
          <a style={{ color: "gray" }} href="https://github.com/pdrummond">
            <FaGithub size="2em" />
          </a>
          <a
            style={{ color: "gray" }}
            href="https://linkedin.com/in/paul-drummond-3400318"
          >
            <FaLinkedin size="2em" />
          </a>
        </div>

        <br />
        <br />
        <img src="/images/skye.png" alt="" />

        <h1>Side Projects</h1>
        <ul>
          <li>
            <a href="https://store.steampowered.com/app/1595300/Kells/">
              Kells
            </a>
            <p>
              Kells is a retro puzzle game inspired by games of the 90’s such as
              the original Lemmings, but with a gravity-defying mechanic at its
              core that provides a unique twist on the genre.
            </p>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=JnGIzZ96n1M">Foobit</a>
            <p>
              Foobit is a videogame for Android with a unique take on the
              classic snake game with many new features and addictive play
              mechanics.
            </p>
          </li>
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

        <h1> Favourite Quotes </h1>
        <ul>
          <li>
            <a href="/posts/favourite-life-quotes">Favourite Life quotes</a>
          </li>
          <li>
            <a href="/posts/favourite-tech-quotes">Favourite Tech quotes</a>
          </li>
        </ul>
      </div>
    </HomeLayout>
  )
}
