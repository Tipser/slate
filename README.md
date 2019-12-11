Tipser Docs
---
See the live docs at https://tipser.github.io/docs/

Editing
------------------------------

### Prerequisites

You're going to need:

 - **Linux or macOS** — Windows may work, but is unsupported.
 - **Ruby, version 2.3.1 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

- Install Bundler dependencies
```
bundler install
```

## Running

```shell
./run.sh
```

Now you can navigate to http://localhost:4567!

### Deploy

```shell 
./deploy.sh
```


You can now see the docs at http://localhost:4567. Whoa! That was fast!

Now that Slate is all set up on your machine, you'll probably want to learn more about [editing Slate markdown](https://github.com/lord/slate/wiki/Markdown-Syntax), or [how to publish your docs](https://github.com/lord/slate/wiki/Deploying-Slate).

If you'd prefer to use Docker, instructions are available [in the wiki](https://github.com/lord/slate/wiki/Docker).

### Note on JavaScript Runtime

For those who don't have JavaScript runtime or are experiencing JavaScript runtime issues with ExecJS, it is recommended to add the [rubyracer gem](https://github.com/cowboyd/therubyracer) to your gemfile and run `bundle` again.


## Installing Ruby on Ubuntu

https://linuxize.com/post/how-to-install-ruby-on-ubuntu-18-04/#installing-ruby-using-rbenv

follow steps in **"Installing Ruby using Rbenv**

-in step **04.** change the version of Ruby from 2.5.1 to **2.6.1**


