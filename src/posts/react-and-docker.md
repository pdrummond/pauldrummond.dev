---
title: "FeathersJS, React and Docker"
date: "2019-09-10"
---

This tutorial demonstrates how to set-up a React-based web app with a
FeathersJS backend server in one repo using Docker Compose.

---

First, let's go through the steps of creating a standard React app using
[create-react-app](https://create-react-app.dev) and running it inside a
[Docker](https://www.docker.com/why-docker) container.

Create a folder for the root of the project and `cd` into it:

<pre>
mkdir projectx
cd projextx
</pre>

Create a package.json file:

<pre>
{
  "name": "projectx",
  "version": "0.0.1",  
  "scripts": {
    "start": "docker-compose up",
    "build": "docker-compose build",
    "stop": "docker-compose down",
    "clean": "docker system prune -af"
  }
}
</pre>

Create frontend project:

<pre>
npx create-react-app frontend --typescript
</pre>

Create a `docker-compose.yml` in the root folder:

<pre>
version: "3.7"
services:
  frontend:
    container_name: frontend
    ports:
      - "3000:80"
    build:
      context: frontend
</pre>

Add a `Dockerfile` in the `frontend` folder:

<pre>
# Stage 1 - the build process
FROM node:10.16.0 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM node:10.16.0
WORKDIR /app
RUN yarn global add serve
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
</pre>

Build it all:

<pre>
yarn build
</pre>

Put the kettle on - first build takes a while!

Now run it:

<pre>
yarn start
</pre>

Now go to `localhost:3000` in your browser and you should see the standard
landing page for create-react-app:

<img src="/images/cra-landing-page.png"/>

---

So now we have a create-react-app running on port 3000. We could have acheived
exactly the same result in a fraction of the time by running create-react-app
without Docker like this:

<pre>
npx create-react-app frontend --typescript
yarn start
</pre>

Actually, the _"dockerised"_ version is **worse** because it doesn't even support
hot reloading! So why go to the trouble of putting the React app inside Docker?

Before answering that question, let's get hot reloading working. The reason
it doesn't work at the moment is because the `Dockerfile` is building a
production version of the React app. We don't want to get rid of this as we'll
need it when pushing the production version of the app. We just want a different
set-up for development, that's all.

Add a `Dockerfile.dev` to the `frontend` folder:

<pre>
FROM node:10.16.0-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
EXPOSE 3000
CMD ["yarn", "run", "start"]
</pre>

This is similar to the production `Dockerfile` except it's not building a
production version of the app. Instead, it's installing
the local dependencies and running a development version of the React app
using `yarn start`.

Create a new compose file that's configured specifically for our development
needs called `docker-compose.dev.yml` in the root folder:

<pre>
version: "3.7"
services:
  frontend:
    container_name: frontend
    ports:
      - "3000:3000"
    build:
      context: frontend
      dockerfile: Dockerfile.dev
</pre>

This is similar to the production version except it points to the
`Dockerfile.dev` and we want to keep the port as 3000 rather than mapping it
to 80.

Change the script section of the root `package.json` to point to the new compose
file:

<pre>
//...
"scripts": {
    "start": "docker-compose -f docker-compose.dev.yml up",
    "build": "docker-compose -f docker-compose.dev.yml build",
    "stop": "docker-compose -f docker-compose.dev.yml down",
    "clean": "docker system prune -af"
  }
//...
</pre>

Run `yarn build` and `yarn start` to launch the development version of the
app. You'll noticed that hot reloading still doesn't work. That's because we
need to map our development folder to the container using something called
"volumes".

Add the following to `docker-compose.dev.yml` below - and at the same level
of identation as - the `build` section:

<pre>
volumes:
      - ./frontend/src:/app/src
      - ./frontend/public:/app/public
</pre>

Run `yarn start` again and if you change something in the `App.tsx` file and
you'll see that hot reloading now works just fine.

Okay, so with all of this in place, we can ask the question again:

**Why go to the trouble of putting the React app inside Docker?**

What we have so far may not seem like much because it's already very
straightforward to setup a React app using the excellent create-react-app.
However, even at this stage there are benefits to using Docker. With Docker,
we are packaging up our React app into a container and making it much easier to
use on other development machines because all the dependencies are defined in
the container. Have you ever had a scenario where a developer using an old
version of Node pulls your repo but can't run it because your app requires a
newer version? This kind of dependency hell doesn't happen with Docker as all
the dependencies are defined within the container. As long as the developer has
Docker installed, the app will run exactly as expected, regardless of what is
installed on the developer's machine.

But we can take it much further than this. With Docker Compose, we can create
a single repo that contains all the moving parts of our app including the
backend services, the database setup and the frontend React app, and we can
run it all with a single `yarn start` command. More over, this will work on
any machine that supports Docker and it works for development and
production.

Let's get onto creating the backend service for our React app. We'll be using
the excellent [Feathers JS](https://feathersjs.com/) to get some basic services
up and running quickly.

First of all, install the feathers CLI:

<pre>
npm install @feathersjs/cli -g
</pre>

In the `backend` folder, run the following command:

<pre>
feathers generate app
</pre>

For the options select all the defaults except choose TypeScript over
JavaScript.

Create a simple service called "messages":

<pre>
feathers generate service
</pre>

Call it "messages" then choose the defaults for the other options, except when
it comes to Auth - select "n" for that one. We aren't bothered about
authentication for this service as it's just an example to show how to retrieve
and display some example data in the frontend app.

At this point we can run the server directly to make sure everything is
working. In the backend folder, run `yarn start`. This runs the server at
`http://localhost:3030`. You should see the feathers logo if everything is
working correctly.

Usually, this is where we'd switch to the frontend app to hoook it up to our
"messages" service. But first we want to add it to Docker so we don't need to
run the server and the frontend separately.

Create a `Dockerfile` in the `backend` folder:

<pre>
FROM node:12.0.0-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
EXPOSE 3030
CMD ["yarn", "run", "dev"]
</pre>

Note this is running `yarn run dev` instead of `yarn start` to give us hot
reloading on the backend too.

Add the following to the `docker-compose.dev.yml` file after - and at the same
level of indentation as - the `frontend` section:

<pre>
backend:
  container_name: backend
  ports:
    - "3030:3030"
  build:
    context: backend
    dockerfile: Dockerfile.dev
  volumes:
    - ./backend/src:/app/src
    - ./backend/public:/app/public
</pre>

Run `yarn start` from the project root and both the server and the client
will start-up together, but the frontend doesn't talk to the backend yet.

Add the following code to `/frontend/utils/feathers.js`:

<pre>
import io from "socket.io-client";
import feathers from "@feathersjs/client";

const socket = io("http://localhost:3030");
const client = feathers();

client.configure(feathers.socketio(socket));
export default client;
</pre>

In the `frontend` folder run:

<pre>
yarn add socket.io-client @feathersjs/client
</pre>

Replace contents of `App.tsx` with the following:

<pre>
import React from "react";
import client from "./utils/feathers";
const messagesService = client.service("messages");

export default () => {
  const [messages, setMessages]: any = React.useState([]);
  const [loading, setLoading]: any = React.useState(true);

  const createMessage = async () => {
    const message = await messagesService.create({
      text: `Message ${messages.length}`
    });
    setMessages(messages.concat(message));
  };

  React.useEffect(() => {
    const fetchMessages = async () => {
      const messages = await messagesService.find({
        query: {
          $sort: { createdAt: -1 },
          $limit: 25
        }
      });
      setMessages(messages.data);
      setLoading(false);
    };
    fetchMessages();
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && <button onClick={createMessage}>New Message</button>}
      <ul>{!loading && messages.length === 0 && <p>No Messages</p>}</ul>
      <ul>
        {!loading &&
          messages.length > 0 &&
          messages.map((m: any) => <li>{m.text}</li>)}
      </ul>
    </div>
  );
};
</pre>

Run `yarn start` again to bring up the backend and frontend with a single
command. You should initially see "No Messages" and by clicking the
"New Message" button new messages will appear in the list. To prove the list of
messages is persisted correctly in the backend, refresh the browser and it
should display all the messages you've created so far.

That's all for this post. In a future post, I'll extend this further to use
PostgresQL on the backend (all via Docker) instead of the file-based database
that Feathers uses by default.
