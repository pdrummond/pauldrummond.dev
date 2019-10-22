---
title: "Setting up NeoVim on MacOSX"
date: "2019-10-22"
draft: true
---

This post covers steps to setup NeoVim on MacOS X.

---

Install NeoVim:

- `$ brew install nvim`
- Edit `~/.zshrc` and add `alias vim="nvim"`

Install Vim Plug:

```bash
- curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

Set-up coc.nvim

In ~/.config/nvim/init.vim:

```
" Use release branch
Plug 'neoclide/coc.nvim', {'branch': 'release'}
" Or latest tag
Plug 'neoclide/coc.nvim', {'tag': '*', 'branch': 'release'}
" Or build from source code by use yarn: https://yarnpkg.com
Plug 'neoclide/coc.nvim', {'do': 'yarn install --frozen-lockfile'}
```

Restart nvim and run `:PlugInstall`

Then run the following commands inside vim:

```bash
:CocInstall coc-tsserver
:CocInstall coc-eslint
:CocInstall coc-prettier
:CocInstall coc-css
:CocInstall coc-json
```

## Setting up fzf

`brew install fzf`

Then add the following to init.vim:

```
Plug '/usr/local/opt/fzf'
Plug 'junegunn/fzf.vim'
```
