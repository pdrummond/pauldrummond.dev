---
title: "Switching Node versions with NVM"
date: "2019-10-20"
draft: true
---

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

Put the following in your start-up script:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

This will be `~/.bash_profile` or if you are using ZSH like me, then it's `~/.zshrc`.
