---
title: "Finding files in neovim"
date: "2019-11-14"
draft: true
---

https://www.mattlayman.com/blog/2019/supercharging-vim-navigate-files-instantly/

Edit ~/.config/nvim/init.vim and add following:

```
call plug#begin('~/.vim/plugged')
" Other plugins here.
Plug 'ctrlpvim/ctrlp.vim'
call plug#end()
```

Then type ":PlugInstall"

Install ripgrep:

```bash
brew install ripgrep
```

Add following to init.vim:

```
if executable('rg')
  let g:ctrlp_user_command = 'rg %s --files --hidden --color=never --glob ""'
endif
```
