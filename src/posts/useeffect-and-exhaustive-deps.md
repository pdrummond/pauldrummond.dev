---
title: "useEffect and exhaustive-deps"
date: "2019-08-26"
---

If you’ve used useEffect before, you’ve probably come across a "missing
dependency" error at some point.

---

It will look something like this:

```
React Hook useEffect has a missing dependency: 'myFunction'. Either include it
or remove the dependency array.eslint(react-hooks/exhaustive-deps)
```

But if you follow the advice in the warning and add the function to the
dependency list, your app suddenly starts re-rendering infinitely! What's
going on?

Here’s an example taken from a project I'm working on that uses the pattern
popularised by Kent C. Dodds
<a href="https://kentcdodds.com/blog/application-state-management-with-react">Application State Management with React</a>
blog post:

```js
export const App = () => {
  const { fetchClients } = useAppContext()
  useEffect(() => {
    fetchClients()
  }, [])
  return <ClientListPage />
}
```

This is as simple as it gets. All I want to do is invoke `fetchClients` once on
the initial render which is why I set the dependency list to be `[]`.
But React complains that `fetchClients` is not in the dependency
list. This initially confused me as I thought the dependency list was for
variables only, but what does it mean to put a function in there? Turns out,
it’s all down to the way
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators">Referential Equality</a>
works in JavaScript. Every time the `App` component is rendered a new instance
of `fetchClients` is created inside `useAppContext`:

```js
export function useAppContext() {
  //...

  const [state, dispatch] = context
  const fetchClients = async () => {
    await fetchClientsAction(dispatch)
  }

  //...
}
```

What I need to do is ensure the same instance of the function is returned each
time this code is invoked. Thankfully, React comes with a built-in hook that
does exactly that:

```js
const fetchClients = React.useCallback(async () => {
  await fetchClientsAction(dispatch)
}, [dispatch])
```

This is saying to React: _“always give me the same function instance unless
the contents of the dependency list changes”._ The `dispatch` function is
guaranteed by React to be _stable_ which is just a fancy way of saying
`useReducer` will always return the same instance of the function.

So now - back in the `App` component - I can safely add `fetchClients` to the
dependency list:

```js
useEffect(() => {
  fetchClients()
}, [fetchClient])
```

This works because the identity of `fetchClients` doesn't change thanks to
`useCallback`. The same instance of the function is always being returned by
`useAppContext`, so it's the equivalent of invoking `fetchClients` once when
the component mounts, which is exactly what I was expecting it to do in the
first place!
