---
title: "React NextJS app using Prisma and Postgres (Part 1)"
date: "2023-07-20"
---

Part 1 of a React tutorial on how to create a CRUD webapp using Next.js 13, Prisma and Postgres.

<!-- end -->

# Installation

I used create-next-app, which sets up everything automatically for me. To create the project, run:

```bash
npx create-next-app@latest
```

On installation, I had to make some decisions. I chose as follows:

```
1. What is your project named? my-crud-app
2. Would you like to use TypeScript? Yes
3. Would you like to use ESLint? Yes
4. Would you like to use Tailwind CSS? No
5. Would you like to use `src/` directory? No
6. Would you like to use App Router? (recommended) Yes
7. Would you like to customize the default import alias? No
```

TypeScript and ESLint are essential for me so that was a no-brainer. I've tried to like Tailwind but I just can't. I thought I would prefer a src folder but after trying it for a bit I don't really see the point so I decided to omit it. No big deal either way though - go with whatever you prefer. App Router is essential for me as I'm learning Next.js in 2023 and this is the future so it's another no-brainer.

I wasn't sure about the default import alias so I just accepted the defaults. If you want to learn more about it, check out [this](https://dev.to/rhammy/path-aliases-in-nextjs-2fnc) great article by Abdulrahman Afaraetu which covers it in detail. I don't find relative paths to be that much of an issue, personally.

After the prompts, create-next-app will create a folder named `my-crud-app` and install the required dependencies so I cd into that folder and type `code .` to open the project in VSCode. Then I switch back to the terminal (I can't get used to using the one inside VSCode - I perfer a separate terminal app so I can ALT-TAB between them easily) and type the following to run the app locally:

```
npm run dev
```

At this point I can visit http://localhost:3000 to view the application.

# Deployment

I am a bit fan of Continuous Delivery/Deployment (CD) so I want to push to production whenever I commit code, right from the start. So before writing any code, let's set-up Vercel so we can see the app running live in production from the get go.

First, I need to set-up the repo in GitHub so I goto `github.com` in a browser and create a new empty repo called `my-crud-app` without initialising it with a README or .gitignore as the project on my local machine already has them.

Then, I do the following in the terminal in the root folder of `my-crud-app`:

```
git branch -M main
git remote add origin git@github.com:pdrummond/devved.git
git push -u origin main
```

Now that git is set-up I can go over to Vercel's dashboard, add a new project and select my newly created repo in the `Import Git Repository` section by clicking the Import button. Vercel automatically recognises this is a NextJS project so I don't have to do anything else. I can just click on the `Deploy` button and without a few minutes my project is deployed and I can visit it at `https://my-crud-app.vercel.app`.

At this point I would normally set-up a domain as well but that's beyond the scope of this article so we'll just stick with the one vercel provides for us.

# Storage

Before I can start coding I need a database as this is a CRUD app after all. I'll be using Vercel's Postgres support and Prisma which is a fancy ORM that makes it easier to fetch and mutate data than using raw SQL queries.

Setting up Vercel's Postgres support couldn't be eaiser:

1. Goto to the storage tab of the project at vercel.com
2. Choose the option to create a `Postgres Serveless SQL` database
3. Select `Postgres Serverless SQL` then `Continue`
4. There is an option to change the name and region but I stick just stick to the defaults.
5. There is an option to configure the database including environments and envvars but again, I stick to the defaults.

Now the database is created I can go back to the terminal on my local machine, in the rood of my project and type:

```bash
npm i -g vercel@latest
```

This installs the vercel CLI. Next, we need to link our project to Vercel:

```
vercel link
```

I just accept the defaults here - it looks like this:

```
Vercel CLI 31.0.4
? Set up “~/src/my-crud-app”? [Y/n] y
? Which scope should contain your project? pdrummond
? Found project “pdrummond/my-crud-app. Link to it? [Y/n] y
✅  Linked to pdrummond/my-crud-app (created .vercel)
```

Next, I need to bring down the environment variables so the app knows how to connect to the Vercel db:

```
vercel env pull .env
```

_*NOTE:* Vercel recommends you pull the env vars down to a `.env.development.local` file but Prisma expects an `.env` file so that's what we'll use for now to keep things simple_

With this done, I can now focus on setting up Prisma.

Create a folder called `prisma` in the root of the project then inside the prisma folder create a file called `schema.prisma` with the following content:

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
  shadowDatabaseUrl = env("POSTGRES_URL_NON_POOLING") // used for migrations
}

model Post {
  id            String     @default(cuid()) @id
  title         String
  content       String?
  author        User?      @relation(fields: [authorId], references: [id])
  authorId      String?
}

model User {
  id            String      @default(cuid()) @id
  name          String?
  email         String?     @unique
  createdAt     DateTime    @default(now()) @map(name: "created_at")
  updatedAt     DateTime    @updatedAt @map(name: "updated_at")
  posts         Post[]
  @@map(name: "users")
}
```

Then I run the following command:

```
npx prisma db push
```

This tells prisma to read the schema and create the tables in the database. I could also use Prisma Migrate here to keep track of all changes to the database as I make changes but I'm going to keep it simple for now. For more info on the differences between `prisma db push` and `prisma migrate dev`, check out [this](https://stackoverflow.com/questions/68539836/difference-between-prisma-db-push-and-prisma-migrate-dev/68540791#68540791) Q&A on StackOverflow.

Now I can run Prisma Studio as follows:

```
npx prisma studio
```

This opens up a UI in the browser that lets me add a test user and a few posts by that user.

And with that, everything is set-up so we can finally start writing some actual code in Part 2, coming soon.
