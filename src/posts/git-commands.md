---
title: "Useful Git Commands"
date: "2019-11-14"
draft: true
---

## Switch to branch
  git checkout <branch>

## Tagging a release
  git tag -a v0.0.2 -m "version 0.0.2"
  git push --tags

## Amending a commit
  git commit --amend -m "new message"

## Switching to remote branch
 - do a git branch -r to see remote branches
 - do a git checkout --track -b branch origin/branch

## Reverting a commit
 - git revert <commit-hash>
  
  Note this will get rid of the commit you provide.  It's not
  reverting all changes back to the commit you specify!

## Checking out a tag
 - git tag -l to see tags
 - git checkout <tag_name>

## Discard all changes in working directory
 - git reset --hard

