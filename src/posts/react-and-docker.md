---
title: "Playing around with React and Docker"
date: "2019-09-10"
---

Just playing around with React and Docker for now. This article is a WIP - more coming soon.

---

First, let's go through the steps of creating a standard React app using [create-react-app](https://create-react-app.dev) and running it inside a [Docker](https://www.docker.com/why-docker) container.

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

Now go to `localhost:3000` in your browser and you should see the standard landing page for create-react-app:

<img src="/images/cra-landing-page.png"/>

---

So now we have a create-react-app running on port 3000. We could have acheived exactly the same result in a fraction of the time by running create-react-app without Docker like this:

<pre>
npx create-react-app frontend --typescript
yarn start
</pre>

So why go to the trouble of putting the React app inside Docker?

_**NOTE:** This article is not finished - more coming soon._
