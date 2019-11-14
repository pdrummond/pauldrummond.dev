---
title: "Understanding Amplify's GraphQL schema"
date: "2019-11-06"
draft: true
---

I want a list of blog posts where each post is visible to either the
owner or a list of participants. This is my schema:

```graphql
type Post
  @model
  @auth(
    rules: [
      { allow: owner }
      { allow: owner, ownerField: "participants", operations: [read, update] }
    ]
  ) {
  id: ID!
  title: String!
  content: String!

  owner: String
  participants: [String]
}
```

The first @auth rule allows the owner to read, update, create and delete posts.
The second @auth rule means that participants of the post can read and update
posts they don't own.

@auth(
rules: [
{ allow: owner }
{ allow: owner, ownerField: "editors", operations: [read] }
]
)
