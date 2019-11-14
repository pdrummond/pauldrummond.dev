---
title: "Amplify React Tutorial"
date: "2019-11-03"
draft: true
---

Just notes for now. I use [https://aws-amplify.github.io/docs/js/react](this)
guide, which surprisingly isn't the one linked from the main Amplify website.

Also, `amplify configure` is part of the initial set-up of AWS. It logs me into
AWS as me (rather than the credentials I use at work which is my default profile)
via the UI, then let's me setup a IAM user. I've already done this before so
instead of going through that again, I just renamed the profile in
`~/.aws/credentials` and `~/.aws/config` to "pdrummond" - the profile name for
my own personal AWS account.

Setup React project:

```
    npx create-react-app my-app
    cd my-app
```

Initialise Amplify. During initialisation, it asks if I want to use a profile
which I do.

```
    amplify init
```

Most of the questions are self explanatory, except maybe 'Enter a name for the
environment'. I choose `dev` for this one.

After choosing the correct profile, the project is created in the cloud which
can take some time to complete.

Add support for hosting the app next:

```
amplify add hosting
```

For the environment choose "DEV (S3 only with HTTP)" and select defaults for
all other options.

Add auth support:

```
amplify add auth
```

Select "Default Configuration" then select defaults for other options.

Push the configured resources to the cloud:

```
amplify push
```

Configure the React app to use auth:

```
yarn add aws-amplify aws-amplify-react
```

Delete `logo.svg` and `App.css` and replace contents of `App.js` with:

```js
import React from "react"
import Amplify from "aws-amplify"
import awsconfig from "./aws-exports"
import { withAuthenticator } from "aws-amplify-react"

Amplify.configure(awsconfig)

function App() {
  return <p>My app goes here</p>
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
  },
})
```

Run `yarn start` and you should be able to create a new user and login to the
app locally.

Now that the application is set-up, the next step is use to add a GraphQL-based API that is automatically connected to a database (DynamoDB).

```
amplify add api
```

Choose `GraphQL` as the service and `Amazon Cognito User Pool` as the authorization type.

For advanced settings choose Yes. Hit ENTER for the additional authorization steps as we don't want to add any more.

- Do you have an annoted GraphQL schema? No
- Do you want a guided schema creation? Yes

For 'What best describes your project?', this is where a sample schema is provided and you have the chance to edit it as well. I usually choose the
"one to many" option but here's a list of the different options so you can pick the one that suites your project best:

Schema for "single object" is:

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

Schema for "one to many" relationship is:

```graphql
type Blog @model {
  id: ID!
  name: String!
  posts: [Post] @connection(name: "BlogPosts")
}
type Post @model {
  id: ID!
  title: String!
  blog: Blog @connection(name: "BlogPosts")
  comments: [Comment] @connection(name: "PostComments")
}
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

Schema for fine-frained access control is:

```graphql
type Task
  @model
  @auth(
    rules: [
      {
        allow: groups
        groups: ["Managers"]
        queries: null
        mutations: [create, update, delete]
      }
      {
        allow: groups
        groups: ["Employees"]
        queries: [get, list]
        mutations: null
      }
    ]
  ) {
  id: ID!
  title: String!
  description: String
  status: String
}
type PrivateNote @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  content: String!
}
```

Once you have chosen a schema and selected to edit it, add following properties
to each model:

```
createdAt: String
updatedAt: String
```

These are automatically provided by DynamoDB - they are added here to expose
them in the GraphQL API.

Also add the following after the `@model` anotation to provide some default
authorization for models:

```
@auth(rules: [{ allow: owner }])
```
