Heavily inspired by https://github.com/facebook/fbshipit

GitHub (GH) repositories are completely independent from our GitLab (GL) repositories. We are only sending filtered Git patches from GL to GH to open-source relevant changes. Currently, our private code is very similar to what we actually open-source. However, it's easily possibly to modify how the OSS repo is being exported.

Filters applied by default:

- all files outside of the specified roots are being removed
- exported project change their root (for example `src/packages/relay` -> ``)

# Shipit part

Internally it works like this:

1. clone remote GitHub repository
2. get internal commit ID based on `kiwicom-source-id`
3. filter new commits with relevant changes
4. convert these commits into "changesets" and perform necessary modifications and filters to match OSS repo
5. commit these changesets into cloned GitHub repository
6. push

# TODO: Importit part

TODO

# Main differences from facebook/fbshipit

- our version doesn't support [Mercurial](https://www.mercurial-scm.org/) and it's written in JS (not in Hack)
- our version is much simpler and doesn't support many filters
- out version is highly tailored for Kiwi.com needs
- we currently cannot do this:
  - changed Shipit config: https://github.com/facebook/fbshipit/commit/939949dc1369295c910772c6e8eccbbef2a2db7f
  - effect in Relay repo: https://github.com/facebook/relay/commit/13b6436e406398065507efb9df2eae61cdc14dd9
