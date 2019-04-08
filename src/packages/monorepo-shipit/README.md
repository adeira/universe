Monorepo Shipit takes care of exporting and importing our source-codes from our private GitLab monorepo into public GitHub manyrepos. This way we can develop just like we are used to in one monorepository but we can contribute back to the community by making some of our codes open.

# Shipit part

First, we try to extract relevant commits of our package we want to opensource. Each commit is converted into so called "changeset" which is immutable structure representing one commit. One changeset can contain many diffs which describe changes in one individual file. It's very common to modify many files in commit even outside of the public package. Moreover paths in our internal monorepo are very different from the open-sourced version. Therefore, we apply some filters to hide non-relevant or secret files and to adjust paths in the changeset to match open-source expectations. These modified changesets are then pushed applied in the cloned open-source repository and pushed to the GitHub service.

```text
   .-----------------------------------.
   |                                   |
   |          GitLab Monorepo          |
   |                                   |
   `-----------------------------------`
      v              v              v
.-----------.  .-----------.  .-----------.
| Changeset |  | Changeset |  | Changeset |
`-----------`  `-----------`  `-----------`
      v              v              v
   .-----------------------------------.
   |        Filters and Modifiers      |
   `-----------------------------------`
      v              v              v
.-----------.  .-----------.  .-----------.
| Changeset |  | Changeset |  | Changeset |
`-----------`  `-----------`  `-----------`
      |              |              v
      |              |         .---------.
      |              |         | GH repo | <------.
      |              v         `---------`        |      .--------------------.
      |         .---------.                       |      |                    |
      |         | GH repo | <---------------------+----> |   GitHub service   |
      v         `---------`                       |      |                    |
 .---------.                                      |      `--------------------`
 | GH repo | <------------------------------------`
 `---------`
```

One of the filters modifies commit summaries and adds `kiwicom-source-id` signature which helps us to identify which changes we pushed last time and just amend latest internal changes. These filters work with the parsed changesets which gives you incredible flexibility: you can for example completely remove some lines from the open-source version. However, please note that this whole process works with diffs and therefore new filter won't update existing files in GitHub unless you touch them. So, for instance, if you want to remove some files from the public repository then just add a new filter and manually remove them from GitHub.

# Importit part

> Please note: this part is not implemented yet! We already import all GitHub pull requests by design but we do not apply them to our repository yet.

Technically, _Importit_ part works just like _Shipit_ except in the opposite direction:

```text
   .-----------------------------------.
   |                                   |
   |          GitLab Monorepo          |
   |                                   |
   `-----------------------------------`
      ^              ^              ^
.-----------.  .-----------.  .-----------.
| Changeset |  | Changeset |  | Changeset |
`-----------`  `-----------`  `-----------`
      ^              ^              ^
   .-----------------------------------.
   |        Filters and Modifiers      |
   `-----------------------------------`
      ^              ^              ^
.-----------.  .-----------.  .-----------.
| Changeset |  | Changeset |  | Changeset |
`-----------`  `-----------`  `-----------`
      ^              ^              ^
      |              |         .---------.
      |              |         | GH repo | <------.
      |              |         `---------`        |      .--------------------.
      |         .---------.                       |      |                    |
      |         | GH repo | <---------------------+----> |   GitHub service   |
      |         `---------`                       |      |                    |
 .---------.                                      |      `--------------------`
 | GH repo | <------------------------------------`
 `---------`
```

# Main differences from facebook/fbshipit

- our version doesn't support [Mercurial](https://www.mercurial-scm.org/) and it's written in JS (not in Hack)
- our version doesn't support [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- our version is much simpler and highly tailored for Kiwi.com needs
- we currently cannot do this in one commit:
  - changed Shipit config: https://github.com/facebook/fbshipit/commit/939949dc1369295c910772c6e8eccbbef2a2db7f
  - effect in Relay repo: https://github.com/facebook/relay/commit/13b6436e406398065507efb9df2eae61cdc14dd9

# Prior art

- https://github.com/facebook/fbshipit 👍
- https://git-scm.com/docs/git-filter-branch 😏
- https://github.com/splitsh/lite 👎
