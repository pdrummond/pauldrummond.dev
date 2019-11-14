---
title: "Simple Intro to TMUX"
date: "2019-11-14"
draft: true
---
https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/

TMUX lets me have multiple sessions in one terminal and quickly switch between them which is awesome.

Install with:
```
brew install tmux
```

Start tmux and give the initial session a name:

```
tmux new -s session-one
```

To detach use `CTRL-B d` 

To see a list of sessions do `tmux ls`

Now create another session:

```
tmux new -s session-two
```

Do `CTRL-B d` to detach from that session. To attach to session 1:

```
tmux attach -t session-one
```

You can also do:

`C-b (` previous session
`C-b )` next session
`C-b L` ‘last’ (previously used) session
`C-b s` choose a session from a list


## Splitting panes
`C-b %` creates a vertical split.
`C-b "` creates a horizontal split.
`C-b arrow-key` switches between panes

To close a pane just exit the terminal or `CTRL-d` and it's gone.


## Exit TMUX

Press CTRL-B then release both keys, then press d.





