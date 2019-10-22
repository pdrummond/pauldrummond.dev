---
title: "Setting up ITerm and ZSH on Mac OSX"
date: "2019-10-22"
---

- `$ brew install iterm2`
- Download and unzip from here: https://github.com/mbadolato/iTerm2-Color-Schemes
- ITerm2 > Preferences > Profiles > Colors Color Presets... > Import and select all files in "schemes" folder
- `$ brew install zsh`
- `$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"` to install "Oh My ZSH".
- `$ $ git clone https://github.com/powerline/fonts.git`
- `$ cd fonts`
- `$ ./install.sh` to install powerline fonts
- open `~/.zshrc` and `set ZSH_THEME="agnoster"`
- `$ . ~/.zshrc`
- ITerm2 > Preferences > Profiles > Text > Change Font and set it to “Meslo LG DZ for Powerline”
