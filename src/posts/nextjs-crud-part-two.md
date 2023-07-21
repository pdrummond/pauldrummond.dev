---
title: "React NextJS app using Prisma and Postgres (Part 2)"
date: "2023-07-20"
draft: true
---

Part 2 of a React tutorial on how to create a CRUD webapp using Next.js 13, Prisma and Postgres.

<!-- end -->

If you haven't already read it yet, see [here](/posts/nextjs-crud-part-one) for Part 1.

# Posts Feed

Before I can access the database from Next.js using Prisma, I first need to install Prisma Client, as follows:

```bash
npm install @prisma/client
```

Because Prisma Client is tailored to the schema, I need to update it every time the Prisma schema file is changing by running the following command:

```bash
npx prisma generate
```

_NOTE:_ `generate` is automatically run by prisma when I do a `db push`

Now I can go into VSCode and delete all the contents of `global.css` - I'll leave it empty for now. I'll defer making it look good until Part 3.

Then replace all of `app/page.tsx` with the following:

```typescript
import { Post } from "@prisma/client"
import { prisma } from "./db"

export default async function Home() {
  const posts: Post[] = await prisma.post.findMany()

  return (
    <main>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </main>
  )
}
```

Then create the `db.ts` file it depends on with the following [boilerplate](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices):

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

```

Now, I can run the app and I'll see a list of posts and if I add another post via Prisma Studio and refresh the app, it will appear too. Cool!

Before moving on, I want to commit the changes so far to git, but for some reason the default `.gitignore` doesn't ignore the env file that contains secret info, so I replace this line:

```
# local env files
.env*.local
```

with this:

```
.env*
```

Then I run `git status` to make sure I'm happy with what's being committed. Then I do the following to add, commit and push the changes:

```git
git add .
git commit -m "Initial work on Posts Feed"
git push
```

The push will automatically trigger a deployment build over on Vercel.com and within a few minutes I will be able to see the updated app and the list of posts at https://my-crud-app.vercel.app. Very cool :-)

Except it doesn't work, haha! When I got to look at the build in the Vercel dashboard, there is an error and it's complaining about Prisma and some weird dependency caching nonsense. All I need to do is add `prisma generate` to the build as follows:

```json
//package.json
{
  ...
  "scripts" {
    "postinstall": "prisma generate",
  }
  ...
}
```

Then I commit and push again:

```bash
git commit -am "Added postinstall step for prisma"
git push
```

Then I cross my fingers and... this time it works as expected!

# Creating a new post

Firstly, lets add a link to the `/create` page on the home page so we have a way to access it. At the bottom of the JSX after the closing `</ul`> add

```
import { Post } from "@prisma/client";
import { prisma } from "./db";
import Link from "next/link";

export default async function Home() {
  const posts: Post[] = await prisma.post.findMany();

  return (
    <main>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
      <Link href="/create">Create</Link>
    </main>
  );
}
```

```

```
