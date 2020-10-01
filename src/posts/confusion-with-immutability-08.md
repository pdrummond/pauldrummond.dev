---
title: "Confusion with Immutability (2008)"
date: "2020-05-09"
---

Back in 2008, I wrote a post on the Clojure Google Group back when I was
trying to wrap myself around the idiomatic use of state and mutability in a
functional language like Clojure.

<!-- end -->

Here is the post in full:

<pre>
Hi all,

I have been meaning to post about this for a while now so today (after
reading and commenting on Eric Rochester's recent articles which are
great BTW) I decided to bite the bullet rather than spend another day
going round in circles in the REPL!

First a little background...

I have been trying to get my head around FP concepts for over a year
now (off and on) and have experimented with Haskell, CL, Scheme and
most recently Clojure. While I think I understand the concepts well
enough in theory, so far I have been unable to apply them confidently
in practise. There's a missing link somewhere - an "aha" light-bulb
moment just waiting to happen....

I could now essentially fill several pages by giving a brain-dump
describing my confusion but I'm pretty sure it would end up an
unreadable mess (!) so I will try to keep this as concise just as a
basis for starting a discussion hopefully.

In a nutshell, my problem is to do with immutability. I understand
the concepts and when I listen to Rich talking about data structures
and providing examples similar to this one:

user=> (def v [1 2 3])
#'user/v
user=> v
[1 2 3]
user=> (conj v 4)
[1 2 3 4]
user=> v
[1 2 3]

It all makes sense - conj gives the impression of changing the vector
but it's not actually changed of course.

My problem is with regard to the management of data once it's returned
to the outer scope and what that means for the structure of a whole
program. Taking the example above, what do we do with the vector
returned from conj?

My current understanding is that you have _ONLY_ two choices: re'def
the var OR use recursion.

So I could redef v like this:

user=> (def v (conj v 4))
#'user/v
user=> v
[1 2 3 4]

I don't think this is idiomatic Clojure style even though I have seen
it done (Webjure springs to mind). It feels like this sort of thing is
done by people coming to functional programming and trying to do
things the old way even though the language is trying very hard to
tell you this is bad style and not the way to do things in Clojure.
But when I see Clojure code that does this I start to doubt my
conclusions!

To my mind the only alternative to redef'ing is recursion which means
structuring your entire program recursively.

Now, this is where things start to cloud over so maybe I will stop
here. I think I just want to get an answer to the question: "Is it
true that you either redef or use recursive style?". If this is true
and I am not getting everything completely wrong then I will take the
next step try to formulate into words my issues with recursion!!!

One step at and time - it's the only way out of this!! :)

Thanks,
Paul Drummond
</pre>

Here is a link to the full thread on Google Groups (you'll need a Google account
to view it):

[https://groups.google.com/g/clojure/c/YzN5Hkn7yn8/m/PLLIYIMZX3oJ](https://groups.google.com/g/clojure/c/YzN5Hkn7yn8/m/PLLIYIMZX3oJ)

The responses I got just went to show how welcoming and helpful the Clojure
community was at the time and still is to this day.

I even got a reply from the man himself! :-)

![rich-hickey-post](/images/rich-hickey-post.png)

Rich even went to the trouble of writing an article to explain Clojure's
approach to [State and Identity](https://clojure.org/about/state), which really
helped me to grasp the concepts. Concepts I've applied time and time again since
and not only in Clojure - this stuff is essential conceptual knowledge that can
be applied in any technical scenario using practically any programming language.
