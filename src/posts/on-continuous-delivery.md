---
title: "On Continuous Delivery"
date: "2020-10-12"
---

I've been continuously delivering software for about three years now and I've
learned quite a lot about what works and what doesn't. Here's what I've learned
along the way.

<!-- end -->

### First of all, what is Continuous Delivery?

As [Martin Fowler](https://www.martinfowler.com/bliki/ContinuousDelivery.html) puts it:

> _Continuous Delivery is a software development discipline where you build software in such a way that the software can be released to production at any time._

And here is how the folks over at [AWS](https://aws.amazon.com/devops/continuous-delivery/) define it:

> _Continuous delivery is a software development practice where code changes are automatically prepared for a release to production. A pillar of modern application development, continuous delivery expands upon continuous integration by deploying all code changes to a testing environment and/or a production environment after the build stage. When properly implemented, developers will always have a deployment-ready build artifact that has passed through a standardized test process._

### Testing new code vs testing existing code

In a Continuous Delivery environment every change you make goes through a Deployment Pipeline, which builds the software using a CI system such as CircleCI and runs all the unit tests, integrated tests and acceptance tests in order to determine if your change breaks anything. Therefore, if your change is lucky enough to reach the end of the Deployment Pipeline without anything breaking, you can be confident it can be deployed to production at any time.

The key thing to remember here is that your change itself does **NOT** need to be tested before merging. The deployment pipeline doesn't care about your new change - it only cares if you break existing, released code that is being used by your end users.

Let's say for example, you are working on a new micro-service. You could merge dozens of commits per day into the main branch and deploy them all to production without breaking a sweat, even if they don't have any tests whatsoever. As long as the deployment pipeline is happy, you are good to go. In this particular case, the deployment pipeline isn't even aware of your service, and that's fine too because we only care about what the deployment pipeline cares about, which is the functionality we have already released to our customers. And your fancy new service doesn't break any of this stuff.

This doesn't mean you shouldn't include unit tests when you make a PR. Perhaps you should. Perhaps you want to do TDD? Perhaps you want to write a very small piece of code and a very small Unit Test to go with it. That's fine and often good practice. The point is - these tests aren't required in order to do Continuous Delivery, that's all.

Also, this doesn't mean your new functionality is **NEVER** tested at all, just that it doesn't need to be tested during development, necessarily. Eventually, when you come to release this new micro-service to customers, you'll want to be 100% sure it works, and by that point you'll have all the unit tests, integration tests and acceptance tests in place.

### It's a huge mindset shift for developers

In order for Continuous Delivery to work, developers must get used to committing changes to the main branch at least once a day. I've found this is by far the most difficult part of switching to CD. Developers just hate working this way, at least initially - I should know, it happened to me! Most developers prefer to create a branch and work on it for days at a time in isolation, with the freedom to contemplate all the variants and consider all the use-cases. But with Continuous Delivery, often even a simple task must be broken down further and when you create a PR, often it only contains a small part of the overall solution. Rather than working on functionality in isolation then delivering the entire piece at once, you must become comfortable continuously delivering small parts of the overall solution and potentially exposing code that is often a work-in-progress or an experiment that may have to be rethought later on. It takes quite a while to get used to this, but eventually you get used to it and all is forgiven once you start noticing the benefits of this way of working.

### Learning to embrace Feature Flags

Feature flags are a pretty simple idea, but in practice they can be quite controversial. They are very easy to abuse and if they aren't managed correctly, they can make your codebase overly complex and difficult to reason about.

But when utilized properly, they are a valuable way to allow developers to deliver "under development" functionality to production on a daily basis. While your end users are working away using your software, they will be oblivious to the fact that you are delivering a "work-in-progress" new feature before their very eyes. The feature is there, they just can't see it because it's behind a feature flag.

Using specialized software such as [Launch Darkly](https://launchdarkly.com/), it's possible to control feature flags from a central admin interface and even turn flags on and off for individual users or groups of users. This is a god send for testing/demo purposes when you want to show off a new feature prior to release.

And when it's finally time to release the feature to everyone, you simply turn the flag on and it just appears to end-users as if it was always there all along (because it was!).
