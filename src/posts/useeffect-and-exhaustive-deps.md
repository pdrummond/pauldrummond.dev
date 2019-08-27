---
title: "useEffect and exhaustive-deps"
date: "2019-08-26"
---

If you’ve used <code>useEffect</code> before, you’ve probably come across this error at some point:

<pre>
React Hook useEffect has a missing dependency: 'myFunction'. Either include it
or remove the dependency array.eslint(react-hooks/exhaustive-deps)
</pre>

But if you follow the advice in the warning and add the function to the dependency list, your app suddenly starts re-rendering infinitely! What's going on?

Here’s an example taken from a project I'm working on that uses the pattern popularised by Kent C. Dodds <a href="https://kentcdodds.com/blog/application-state-management-with-react">Application State Management with React</a> blog post:

<pre>
export const App = () => {
 const { fetchClients } = useAppContext();
 useEffect(() => {
   fetchClients();
 }, []);
 return (
   &lt;ClientListPage /&gt; 
  );
};
</pre>

This is as simple as it gets. All I want to do is invoke <code>fetchClients</code> once on the initial render which is why I set the dependency list to be <code>[]</code>.
But React complains that <code>fetchClients</code> is not in the dependency list. This initially confused me as I thought the dependency list was for variables only, but what does it mean to put a function in there?
Turns out, it’s all down to the way <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators">Referential Equality</a> works in JavaScript. Every time the <code>App</code> component is rendered a new instance of <code>fetchClients</code> is created inside <code>useAppContext</code>:

<pre>
export function useAppContext() {
  
  //...
  
  const [state, dispatch] = context;
  const fetchClients = async () => {
    await fetchClientsAction(dispatch);
  };
  
  //...
}
</pre>

What I need to do is ensure the same instance of the function is returned each time this code is invoked. Thankfully, React comes with a built-in hook that does exactly that:

<pre>
const fetchClients = React.useCallback(async () => {
  await fetchClientsAction(dispatch);
}, [dispatch]);
</pre>

This is saying to React: _“always give me the same function instance unless the contents of the dependency list changes”._ The <code>dispatch</code> function is guaranteed by React to be _stable_ which is just a fancy way of saying `useReducer` will always return the same instance of the function.

So now - back in the <code>App</code> component - I can safely add <code>fetchClients</code> to the dependency list:

<pre>
useEffect(() => {
fetchClients();
}, [fetchClient]);
</pre>

This works because the identity of <code>fetchClients</code> doesn't change thanks to <code>useCallback</code>. The same instance of the function is always being returned by <code>useAppContext</code>, so it's the equivalent of invoking <code>fetchClients</code> once when the component mounts, which is exactly what I was expecting it to do in the first place!
