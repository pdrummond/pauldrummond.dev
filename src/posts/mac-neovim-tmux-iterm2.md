---
title: "My terminal development setup"
date: "2019-10-20"
---

This article describes the tools I use for development and goes over the basics
of why I use them too with a few examples. 

tl;dr Set-up and usage of neovim, tmux, iterm2 and zsh on MacOSX.

---

Up until very recently I had moved away from terminal development and succumed to the draws
of GUI workflows using tools such as VSCode and Github Desktop because they were "eaiser". 

Recently I have moved back to a terminal-centric flow and I couldn't be happier. There is nothing
wrong with VSCode and Github Deskop and any of the other GUI tools I was using, and I do sometimes
still use them. But terminal development is my goto again for reasons which will hopefully become 
apparent by the end of this post.

I'm going to start by briefly explaining what all the tools are, for those who don't know about some 
or all of them. Then I'll focus on the meaty bit - the reasons why these tools are so awesome for 
development. Finally, I'll discuss how to set them all up, the boring but necessary part!

# Setting up the terminal
NOTE: This is basically my version of this post: https://www.freecodecamp.org/news/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38/ which some of my own changes. 

First of all we need iterm3:
```bash
brew install iterm2
```
Once it's downloaded, close Terminal and open iterm2 instead as we'll be using it from now on. Next
we need to install and switch to bash instead of zsh:

```bash
brew install zsh
```

- Open Iterm2 Preferences, select Profiles and Colors and change the background color to 20% gray. 
- Goto the text section and change the font to 14pt Monaco
- `$ cd ~`
- `$ git clone https://github.com/powerline/fonts.git`
- `$ cd fonts`
- `$ ./install.sh`
- Now open `~/.zshrc` and change the ZSH_THEME to "agnoster"
- `$ . ~/.zshrc` to source the zshrc and apply the changes
- Open ITerm preferences again and change the font to "Meslo LG DZ for Powerline" and untick "Use a different font for non-ASCII text"








# NOTES

On iterm2 and zsh
https://medium.com/@Clovis_app/configuration-of-a-beautiful-efficient-terminal-and-prompt-on-osx-in-7-minutes-827c29391961

On zsh themes:
https://www.freecodecamp.org/news/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38/

