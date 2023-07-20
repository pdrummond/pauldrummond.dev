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
