---
title: "Bottom Up Development - Embracing Change (2007)"
date: "2020-02-02"
---

This is a re-post from back in 2007 when I was just starting to get interested a
mysterious language called Lisp!

<!-- end -->

<i>Originally posted on Tuesday 11 December 2007 [here](http://goldfish-geek.blogspot.com/2007/12/bottom-up-development-embracing-change.html).</i>

I have just read Raganwald’s post, [Something’s Fishy](http://weblog.raganwald.com/2007/12/somethings-fishy.html), and it made me start thinking hard. One statement in particular caught my attention:

> _Now maybe this [bad software] has absolutely nothing to do with programmers._

In my experience, the fact that writing software is hard is the ultimate driver
for all the bureaucracy thrust upon developers in medium to large software
houses. Managers are scarred by past experiences maintaining bug-ridden, badly
designed systems so they inevitably try to find ways minimize risk by enforcing
rule upon rule. They embrace the fear of “getting it wrong” and introduce layers
of process from pre-planning to lengthy design phases, to requirements
re-re-re-analysis and so on. Often the rules put in place are ad-hoc, subjective
and designed to prevent recurrence of specific personal nightmares from the past
which will probably never reoccur again, at least not in exactly the same way.

I believe putting blame on bad management and bureaucracy is generally futile because, while not necessarily incorrect in specific circumstances, they are just symptoms of the real problem. The real problem in my opinion is that - even when using popular dynamic languages like Python - writing bad code is way too easy to do and maintaining it can become a nightmare as time goes on and feature creep has its wicked way with an infrastructure never designed to support the features it is being asked to support.

That’s why I am so excited about discovering the power of Lisp and in particular when [Paul Graham](http://www.paulgraham.com/) talks about [bottom-up](http://www.paulgraham.com/progbot.html) programming. I believe the main players in the software industry focus far too much on top-down design of extendible and reusable systems. This is the basis for Object Oriented Design and it has never, ever sat well with me. How can anyone come up with a system that is designed for change when we have little to no idea what changes will be demanded in the future? We can guestimate and plan ahead and sometimes we may get it right, but there always comes a time in a system’s lifetime when the customer requests a feature that the system wasn’t designed for.

I am very new to Lisp and more generally, functional programming concepts, but when I read about bottom-up programming in [On Lisp](http://www.paulgraham.com/onlisp.html), it all makes so much sense! Maybe we shouldn’t be designing for change? Maybe we should accept that code will change in ways we cannot predict, embrace that fact, then begin to use tools (like Lisp) that help us to manage and maintain such code elegantly.

If tasked with writing a geographical mapping product that tracks ship movements, do we spend months writing an infrastructure to support generic objects and potential features that the customer hasn’t asked for, but may well do in the future? Or do we write a geographical mapping product that _only_ tracks ship movements? Your typical OO enthusiast will say:

> _“Oh, you can’t create a Ship class, you should be more generic than that! Study your Ship class for a while - I could pick several attributes and behavioural aspects of your class that aren’t specific to a ship and come up with about five base classes. Wham Bam! An extendible and reusable system!”._

But I just want to write some software that meets the requirements and more importantly… works. I want to keep it simple to reduce risk and minimise the chance of it not working properly. If I break my Ship class down into multiple base classes I am not going to use (and repeat this approach throughout the system), then I am unnecessarily complicating the code and arguably wasting time and money.

Nevertheless, the OO guy has a point. If I limit my code to exactly what is required now, then it will be difficult to extend in the future. But, crucially, if the OO guy had his way and generalised the code using a top-down approach, unless he possessed psychic powers he would undoubtedly end up with a system that was just as difficult to extend as mine (except maybe for certain specific scenarios he had thought of), yet his system would be far more complicated and more difficult to maintain.

I believe the bottom-up approach is better because I end up with a simple system that works NOW! But I still have the problem that my code is very difficult to extend (just like the OO guy does). What I need is a tool designed to aid, manage and maintain code written in a bottom-up style. Although I have no experience using Lisp in production environments, from what I have read so far I am pretty sure this is precisely where Lisp shines, for lots of reasons, but primarily because of macros. [Macros](http://en.wikipedia.org/wiki/Macro_%28computer_science%29#Lisp_macros) combined with other powerful features of Lisp provide the programmer with the flexibility to generalise code after the fact. It allows us to write very specific code that doesn’t go any further than meet current requirements (you know - the ones that actually exist!). As the system evolves and new requirements are requested by the customer, Lisp allows programmers to elegantly mould their system into a new beast capable of meeting those requirements.

Now, if I were a Lisp expert I would dive into an example of its power at this point. But I’m afraid I am just at the beginning of my journey towards [Lisp Enlightenment](http://www.defmacro.org/ramblings/lisp.html). I have just purchased [The Little Schemer](http://www.ccs.neu.edu/home/matthias/BTLS/), I am almost finished my first attempt at [Practical Common Lisp](http://www.gigamonkeys.com/book/) and I have read the first few chapters of [On Lisp](http://www.paulgraham.com/onlisp.html). So I have a long way to go, and time permitting I will try to record some of my learning experiences here.
