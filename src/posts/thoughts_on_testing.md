---
title: "Thoughts on testing"
date: "2020-04-28"
draft: true
---

Unit tests, integration tests, acceptances tests, end-to-end tests and all that
jazz.

---

Every time I've written a good test in my career, it's turned out to be an
integration test. I have yet to see a unit test that provides any real
value over the equivalent integration test.

A unit test should test only one thing, usually a function. I rarely write
unit tests that do that. Usually, if a function calls another function it's
tested too and quite frankly I don't care that it's not "correct".

The problem with testing one thing in isolation is the effort you often have to
go to to mock or stub or spy all the dependencies. And for what?

When I want to test that something works, I'm not thinking about code, I'm
thinking about functionality. i have these inputs and I expect this output.
Not, I have function A that calls function B which in turn calls function C
and D so lets make sure function A works while also making sure it doesn't
call the others.
