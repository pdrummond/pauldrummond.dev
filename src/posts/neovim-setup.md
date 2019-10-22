---
title: "Setting up NeoVim on MacOSX"
date: "2019-10-22"
---

This post covers steps to setup NeoVim on MacOS X.

---

Install NeoVim.

- `$ brew install nvim`
- Edit `~/.zshrc` and add `alias vim="nvim"`

Install Vim Plug:

```bash
- curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

Set-up JavaScript/TypeScript support

In ~/.config/nvim/init.vim:

```
call plug#begin('~/.vim/plugged')
  Plug 'neoclide/coc.nvim', {'branch': 'release'}
  Plug 'neoclide/coc.nvim', {'tag': '*', 'branch': 'release'}
  Plug 'neoclide/coc.nvim', {'do': 'yarn install --frozen-lockfile'}
  Plug 'mxw/vim-jsx'
  Plug 'pangloss/vim-javascript'
call plug#end()
```

Restart nvim and run `:PlugInstall`.

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

Then add the following to `~/.config/nvim/init.vim`:

```
Plug '/usr/local/opt/fzf'
Plug 'junegunn/fzf.vim'
```
