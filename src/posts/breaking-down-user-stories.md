---
title: "Breaking Down User Stories"
date: "2021-07-20"
draft: true
---

When breaking down a user story, I find it’s often better to do so _vertically_
instead of _horizontally_. What I mean by this is that often engineers prefer to
work on layers of functionality such as _“Implement the UI”_, _“Implement the
API”_, _“Implement the Database”_ and so on until the whole thing is considered
_"done"_ right at the end. The problem with this approach is that all the
individual parts or tasks depend on each other. You can’t release the UI without
the API and you can’t have the API without the database. You therefore end up
with a single User Story with dozens of tasks that take a long time to
implement. Or worse, the stories are broken down into “smaller stories” that
aren’t really stories - they are just parts of the overall story which makes it
much harder to track progress and deliver your software in an agile way (which
is the ultimate goal after all).

In other words, try to think of a User Story in the same way as the normal kind
of story you might tell to your child at bedtime or maybe your favourite
fictional novel. Your favourite novel, for instance, is made up of many chapters
and each chapter follows on from the one that came before it. If your story
suddenly stops after Chapter One without any form of ending it wouldn’t be worth
the price you paid for it. Similarly, if you bought a novel only to find it
started and ended with Chapter Five, you would most likely consider it faulty
and send it back for a refund.

It's common break down the User Stories into segments in a similar way to how a
book is split into chapters. There is nothing inherently wrong with this - after
all, novels are broken down into chapters for a reason. But it wouldn’t make
sense to refer to Chapter One as a _"story"_ would it? What makes a chapter
different from a story is that the chapter represents just one small part of the
overall story. The chapter isn’t supposed to exist on its own - it depends on
other chapters in order to be considered useful. Yet we often make the mistake
of segmenting our User Stories into “sub-stories” or worse - we refer to them as
stories in their own right that just happen to be “children” of the bigger
story, as if the User Story has another story _inside_ it or something. That’s
why the naming is important here - it’s confusing to refer to a “piece of a
story” as the whole story when it’s actually just a single part of many that
all depend on each other to make up the overall story.

What about _vertical_ break down, then? Well, it isn’t the same as dividing the
story up into dependent chapters. Instead, it’s like taking a 110K-word epic
novel and considering if we can reduce the word count to 5K while keeping the
essence of the story intact. Why would we want to do this? Well, what if the
publisher doesn’t have much confidence in the author yet and they want to test
the market? Would they be comfortable with letting the author work on a 110K
epic over five years in the hope that it all works out in the end? Some would,
I'm sure! But a less risky approach would be to tread a bit more carefully by
focusing on a shorter novel to start out with. Maybe this means rethinking the
story altogether? Or maybe, it’s possible to keep the essence of the story but
reign in the ambition a bit? The author could keep the major plot points, the
villain’s masterplan, the protagonist’s dilemma at the start and how they
overcome it in the end. But, maybe they could take out some of the finer details
that add depth and polish to the characters for instance?

This kind of scope reduction is tricky and can often feel counter-intuitive, as
if we are sacrificing the quality of the novel, taking away important plot
threads and character arcs the author may consider vital. Now is probably a good
time to move away from the _novel_ analogy as the cracks are starting to show
and this article is about User Stories, not how to successfully publish a
best-selling novel! Back in the more familiar world of tech, scope-reduction is
what agility is all about. It may or may not be sensible in the world of
creative writing to reduce risk this way - I have no idea. But what I do know is
that this approach has many, many benefits if you're in the business of software
delivery.

Reducing the scope of a User Story is what we mean by _Vertical Slicing_. It
comes from the cake analogy where cutting the cake horizontally is the same as
working on technical tasks one layer at a time. Cutting the cake vertically is
like turning a big cake with lots of layers into a smaller cake with all the
layers intact. It’s just an analogy though and not to be taken too literally.
Just as with my chapter/novel analogy, it only goes so far. It’s a way of
getting the point across and not meant as a literal comparison. It’s useful in
so far as it helps us to visualise the idea and allows us to use labels such as
“Vertical User Story” to communicate intent and to help clarify the different
approaches to story breakdown.

There are two approaches to vertical breakdown. We can either redefine the
existing user story into a smaller version of itself or we can change the story
altogether, focusing on a new story that is smaller in scope. The latter option
can feel similar to horizontal breakdown because we’re chopping up the story
into smaller chunks. The important difference, however, is that each chunk
represents a self-contained story rather than a chapter of a bigger story. With
this approach, the original story is often replaced with the smaller stories and
often only the first one is refined enough to work on and we may not even bother
with the other stories until later on. Sometimes, we may choose to keep the
original story for reference and in tools like JIRA the story is marked as an
Epic. A more appropriate word than Epic would be Anthology in my opinion but I
don’t want to start adding more buzzwords to the process. The point is - the
smaller story is now the new story we’re telling, rendering the older, larger
story mostly irrelevant.

NOTE: Last para on the point... The point of all this is to focus on delivering
real user value as soon as possible. We're trying to satisfy the customer
through early and continuous delivery of valuable software.

For more information on breaking down user stories, I recommend
[this](https://www.thoughtworks.com/en-gb/insights/blog/slicing-your-development-work-multi-layer-cake)
article by Luis Mizutani from Thoughtworks and
[this](http://www.deltamatrix.com/horizontal-and-vertical-user-stories-slicing-the-cake/)
for more on slicing the cake!
