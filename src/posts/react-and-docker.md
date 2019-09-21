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

Actually, the _"dockerised"_ version is **worse** because it doesn't even support
hot reloading! So why go to the trouble of putting the React app inside Docker?

Before answering that question, let's get hot reloading working. The reason
it doesn't work at the moment is because the `Dockerfile` is building a
production version of the React app. We don't want to get rid of this as we'll need it when pushing the production version of the app. We just want a different set-up for development, that's all.

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

Create a new compose file that's configured specifically for our development needs called `docker-compose.dev.yml` in the root folder:

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

Change the script section of the root `package.json` to point to the new compose file:

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
app. You'll noticed that hot reloading still doesn't work. That's because we need to map our development folder to the container using something called "volumes".

Add the following to `docker-compose.dev.yml` below - and at the same level
of identation as - the `build` section:

<pre>
volumes:
      - ./frontend/src:/app/src
      - ./frontend/public:/app/public
</pre>

Run `yarn start` again and if you change something in the `App.tsx` file and you'll see that hot reloading now works just fine.

Okay, so with all of this in place, we can ask the question again:

**Why go to the trouble of putting the React app inside Docker?**

_**NOTE:** This article is not finished - more coming soon._
