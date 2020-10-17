---
title: "On Continuous Delivery"
date: "2020-10-12"
---

I've been continuously delivering software for about three years now and I've
gained some insight into what works and what doesn't (for us at least). Here's
what I've learned along the way.

<!-- end -->

### Debunking some myths right off the bat

- This isn't about making it easy for anyone to push bad code into master
  without a care in the world.
- This isn't about going to production without testing your code.
- This isn't incompatible with testing practices such as TDD.
- This isn't about promoting a haphazard approach with an emphasis on rushing to
  get changes out with caring about quality.

### What is Continuous Delivery?

As [Martin Fowler](https://www.martinfowler.com/bliki/ContinuousDelivery.html)
puts it:

> _Continuous Delivery is a software development discipline where you build
> software in such a way that the software can be released to production at any
> time._

And here is how the folks over at
[AWS](https://aws.amazon.com/devops/continuous-delivery/) define it:

> _Continuous delivery is a software development practice where code changes are
> automatically prepared for a release to production. A pillar of modern
> application development, continuous delivery expands upon continuous
> integration by deploying all code changes to a testing environment and/or a
> production environment after the build stage. When properly implemented,
> developers will always have a deployment-ready build artifact that has passed
> through a standardized test process._

### Testing new code vs testing existing code

In a Continuous Delivery environment every change you make goes through a
Deployment Pipeline, which builds the software using a CI system such as
CircleCI and runs all the unit tests, integrated tests and acceptance tests in
order to determine if your change breaks anything. Therefore, if your change is
lucky enough to reach the end of the Deployment Pipeline without breaking
anything, you can be confident it can be deployed to production at any time.

The key thing to remember here is that your change itself does **NOT** need to
be tested before it goes to production, unless it affects end users. If your
change is a smaller part of a bigger feature that won't be released to end users
for a while yet, you can continuously push these smaller changes to production
during development behind a feature flag with the confidence end users won't be
affected.

This does not mean you shouldn't test your code at all! It just means testing
isn't a barrier for going to production because you will be going to production
from the very moment you start working on a new feature. Testing is just as
important as ever but now, you write your tests _while_ continuously going to
production instead trying to get everything perfect up front. It's a very
different approach. It requires a mindset shift and in some cases unlearning
habits you may have held close for years!

It's also worth mentioning that feature flags aren't mandatory, although they
are very common. Let's say for example, you are working on a new microservice.
You could merge dozens of commits per day into the main branch and deploy them
all to production without breaking a sweat, even if they don't have any tests
whatsoever. You wouldn't necessarily need a feature flag for this service. As
long as the deployment pipeline is happy, you are good to go. In this particular
case, the deployment pipeline isn't even aware of your service, and that's fine
too because we only care about what the deployment pipeline cares about, which
is the functionality we have already released to our customers. And your fancy
new service doesn't break any of this stuff.

### It's a huge mindset shift for developers

In order for Continuous Delivery to work, developers must become accustomed to
committing changes to the main branch _"at least once a day"_ as a general
guideline. This is a guideline only - a way to encourage developers to become
familiar with working this way. But after a while, most developers I work with
couldn't tell you whether they commit once a day or not - it's usually more
often actually. As long as the PRs are small and deployable, it doesn't matter.

I've found getting started with this is by far the most difficult part of
switching to CD though. Developers just hate working this way initially - I
should know, it happened to me! Most developers prefer to create a branch and
work on it for days at a time in isolation, with the freedom to contemplate all
the variants and consider all the use-cases. But with Continuous Delivery, often
even a simple task must be broken down further and when you create a PR,
sometimes it only contains a small part of the overall solution. Rather than
working on functionality in isolation then delivering the entire piece at the end,
you must become comfortable continuously delivering small parts of the overall
solution and potentially exposing code that is often a work-in-progress or an
experiment that may have to be rethought later on. It takes quite a while to get
used to this, but eventually it becomes second nature and all is forgiven once you
start noticing the benefits of this way of working.

### DEPLOY TO PROD != DONE && DEPLOY TO PROD != RELEASE

With Continuous Delivery the definition of "deploy to prod" changes dramatically
and that can be a very difficult thing to adapt to. We used to have this so
ingrained into our culture and process, we didn't even realise it was a thing!
We would say _"deploy to prod"_ all day long and it would be implied to mean
_"it's done, it's ready for release"_. Suddenly, as we started to gradually
switch some of our services to CD, "deploy to prod" meant something completely
different! This was an extremely difficult issue for us to resolve and it took
time. It's often not enough to just communicate it - it has to be learned
gradually over time and through incremental process changes and ongoing
discussions with all teams involved.

This is also complicated by the fact that tickets often also have a "definition
of done", common when using agile frameworks such as SCRUM. Even when talking
about a specific ticket though, _"deploying to production"_ doesn't necessarily
mean the ticket is done. A single ticket may require several PRs and each one
will be deployed to production separately. A single ticket is considered "done"
when all the functionality in the ticket is in production and tested.

I cover more on why deploying to production is not the same as making a release
below as this is where Feature Flags come in.

### Learning to embrace Feature Flags

Feature flags are a pretty simple idea, but in practice they can be quite
controversial. They are very easy to abuse and if they aren't managed correctly,
they can make your codebase overly complex and difficult to reason about.

But when utilized properly, they are a valuable way to allow developers to
deliver "under development" functionality to production on a daily basis. While
your end users are working away using your software, they will be oblivious to
the fact that you are delivering a new "work-in-progress" feature before their
very eyes. The feature is there, they just can't see it because it's behind a
feature flag.

Using specialized software such as [Launch Darkly](https://launchdarkly.com/),
it's possible to control feature flags from a central admin interface and even
turn flags on and off for individual users or groups of users. This is ideal for
testing/demo purposes when you want to show off a new feature prior to release.

And when it's finally time to release the feature to everyone, you simply turn
the flag on and it just appears to end users as if it was always there all along
(because it was! It was just hidden from them).

### This all sounds like hard work - why bother?

Here are just a few reasons:

- Deployment to production becomes routine and frictionless.
- It enables us to deliver high quality functionality to our customers quicker
  with less hassle.
- We are able to deliver small increments of end user value, so it's easy
  to adapt to change as we learn more about our customer's needs.
- Feature Flags allow us to gradually roll out features to select groups of
  users to try them out before the full launch.
- We never worry about deploying on a Friday!
- There is no lengthy release procedure - it's as simple as clicking a button.
- Our PRs are small and simple, which allows us to do in-depth reviews without
  them taking too much time.
- We rarely have to deal with merge conflicts and if we do they are small and
  it's easy to identify what the different changes represent and how best to
  resolve the conflicts.
- When something goes wrong it's much easier to identify the problem because the
  changes are small.
- We don't "put off" production issues until right at the end, so things like
  production configuration, scalability concerns, issues affecting end users,
  and so on are all dealt with up front and continuously considered during
  development.
- We can deploy bug fixes to production extremely quickly, sometimes within an
  hour of them being reported, almost always within the same day.
- We can do demo new features to stakeholders _in production_ during the various
  stages of development (usually at the end of each sprint) without affecting
  end-users.
- We don't need complex branching strategies. We don't even need branches really.
  It's perfectly fine to merge directly to master. We only really branch so we
  can get the benefit of peer reviews through GitHub Pull Requests but even
  then, our branches are always small and short lived.

### For more information

To find out more about Continuous Delivery check out:

- The book, [Continous Delivery](https://www.amazon.co.uk/Continuous-Delivery-Deployment-Automation-Addison-Wesley/dp/0321601912/ref=sr_1_1?dchild=1&keywords=continuous+delivery&qid=1602616938&sr=8-1) by Jezz Humble and David Farley.
- Jezz Humble's talk on [Adopting Continuous
  Delivery](https://www.youtube.com/watch?v=ZLBhVEo1OG4) - it's old but awesome!
- For dealing with potential downtime during deploys checkout ["Blue Green
  Deployment"](https://www.martinfowler.com/bliki/BlueGreenDeployment.html).
- Martin Fowler's explanation of [Continuous Delivery](https://www.martinfowler.com/bliki/ContinuousDelivery.html).
- Martin Fowler's [site](https://www.martinfowler.com/tags/continuous%20delivery.html) in general has loads of useful articles on CD.
- [Launch Darkly](https://launchdarkly.com/).
- [continuousdelivery.com](https://continuousdelivery.com/).
