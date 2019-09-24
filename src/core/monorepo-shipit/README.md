Monorepo Shipit takes care of exporting and importing our source-codes from our private GitLab monorepo into any other Git repository. It can export even from our monorepo to another monorepo. We use it open-source some of our packages to our [GitHub](https://github.com/kiwicom). This way we can develop just like we are used to in one monorepo but we can contribute back to the community by making some of our codes open.

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

## Configuration

Each project has its own configuration directly in Shipit workspace. If you want it to work with another project then you have to create a new configuration (with configuration tests):

```js
module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com/kiwicom/relay-example.git', // see: https://git-scm.com/docs/git-clone#_git_urls_a_id_urls_a
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([
      ['src/incubator/example-relay/__github__/.circleci', '.circleci'],
      ['src/incubator/example-relay/__github__/.flowconfig', '.flowconfig'],
      ['src/incubator/example-relay/', ''],
    ]);
  },
  getStrippedFiles(): Set<RegExp> {
    // this method is optional
    return new Set([/__github__/]);
  },
};
```

Read more about available filters and how to use them below.

## Filters

There are various filters applied on exported changesets to make it work properly. Currently we apply these filters:

- `PathFilters.stripExceptDirectories`
- `PathFilters.moveDirectories`
- conditional comments filter (only `// @x-shipit-enable` and `// @x-shipit-disable` supported at this moment)

The first filter makes sure that we publish only files relevant to the workspace that is being open-sourced. This filter is automatic. Second `moveDirectories` filter makes sure that we publish correct paths for opensource. It's because our packages are located in for example `src/packages/fetch` but we want to have these files in the root on GitHub (not nested in `src/packages/fetch`).

### Filter `PathFilters.moveDirectories`

This filter maps our internal directories to OSS directories and vice versa. Typical minimalistic mapping looks like this:

```js
new Map([
  // from, to
  ['src/packages/fetch/', ''],
]);
```

This maps all the files from our [fetch](https://github.com/kiwicom/fetch) package to the GitHub root so OSS users have access to everything from this package. More advanced example when you need to publish some GitHub specific files:

```js
new Map([
  ['src/packages/fetch/__github__/', ''], // trailing slash is significant
  ['src/packages/fetch/', ''],
]);
```

This mapping moves all the files from `__github__` to the root. There are two things you should understand. Firstly, order matters. First mapping route takes precedence and should be therefore more specific. Secondly, this mapping is irreversible (read more about what does it mean in Importit part).

And finally this is how you'd map your package to the subfolder on GitHub (good for shipping from our monorepo to different monorepo or when you are avoiding previously mentioned irreversibility):

```js
new Map([['src/packages/fetch/', 'packages/fetch/']]);
```

### Filter of conditional comments

This filter is handy when you need to enable or disable some lines when exporting the project for OSS. Look at for example this example (code in our private monorepo):

```js
someFunctionCallWithDifferentOSSRepresentation(
  // @x-oss-enable: true,
  false, // @x-oss-disable
);
```

The code above is written by our programmer. Shipit then automatically turns this code into the following code when exporting:

```js
someFunctionCallWithDifferentOSSRepresentation(
  true, // @x-oss-enable
  // @x-oss-disable: false,
);
```

Please note: this is just an example, currently we support only `// @x-shipit-enable` and `// @x-shipit-disable` in this exact format. However, logic of this filter is independent on this marker so it's possible to build on top of this and even make it project specific.

## Renaming project roots

It's fairly straightforward to rename things inside your specified root and ship them correctly to GitHub. However, it's far more challenging to rename the roots in monorepo while keeping the shipping working. It's because Shipit is looking at for example `src/packages/monorepo/` root but when you rename it then it seems like the project is completely new (missing history => new files). This would conflict with the code that is already exported on GitHub for example.

```js
module.exports = {
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/monorepo/', '']]);
    // ... add new root here, keep the old one as well
  },
};
```

To deal with this you have to approach the roots renaming carefully. Our current best attempt is to do it in two steps:

1. Rename your root as needed and add it to the config. Do not delete the old one though. Shipit should understand what is going on and deploy an empty commit with correct `kiwicom-source-id`.
2. Delete the original root from the config when the previous step succeeds. You should be good to go.

Don't worry if you mess up something. Monorepo is always a source of truth and it won't be messed up. Worst case scenario is that Shipit job will start failing. One way out of this situation is to either fix the previous steps or simply create manually an empty commit on GitHub with corrected `kiwicom-source-id` so that Shipit can catch up.

## Linear history

One of the Shipit limitations (even the original one) is that it works correctly only on linear history (see [Major Limitations](https://github.com/facebook/fbshipit/tree/95180a49243caf14be883140436ee8ccbaa5954e#major-limitations)). Imagine following history (the numbers denote the order of commit timestamps):

```text
               *
  ---1----2----4----7
      \              \
       3----5----6----8---
            *
```

In what order would you apply these changes considering Shipit takes one commit at the time and applies it as a patch? You can choose `1 2 3 4 5 6 7 8` which follows the dates or you can follow topology of the graph and get `1 2 4 7 3 5 6 8` (or `1 3 5 6 2 4 7 8`). Every option is going to be at some point wrong. Imagine that the commits marked with `*` are introducing the same change and therefore you won't be able to apply such patch.

For this reason Shipit requires linear Git history only (it works with reversed ancestry path without merge commits).

# Importit part _(unstable)_

**Only imports from GitHub are currently supported.**

This is how you'd import a pull request #1 from GitHub into your local branch:

```text
yarn monorepo-babel-node src/core/monorepo-shipit/bin/importit.js git@github.com:kiwicom/fetch.git 1
```

The idea is that you will tweak it for us if needed, test it in our monorepo and eventually send a merge request to the monorepo. Technically, _Importit_ part works just like _Shipit_ except in the opposite direction:

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

## Filters

The only filter being applied when importing the projects is filter which moves directories (see Shipit filters) except it's applied in the reversed order. One important drawback here to understand is that while Shipit filters can have duplicate destinations, Importit filters cannot. This means that not every Shipit filter can be inverted. It's because it would be impossible to figure out how should be the files restored when importing back to our monorepo.

# Main differences from facebook/fbshipit

- our version is tailored for Kiwi.com needs and infra, not Facebook ones
- our version doesn't support [Mercurial](https://www.mercurial-scm.org/) and it's written in JS (not in Hack)
- our version doesn't support [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- we _do not_ sync internal LFS storage with GitHub LFS (currently unused)
- we currently cannot do this in one commit:
  - changed Shipit config: https://github.com/facebook/fbshipit/commit/939949dc1369295c910772c6e8eccbbef2a2db7f
  - effect in Relay repo: https://github.com/facebook/relay/commit/13b6436e406398065507efb9df2eae61cdc14dd9

# Prior art

- https://github.com/facebook/fbshipit 👍
- https://git-scm.com/docs/git-filter-branch 😏
- https://github.com/splitsh/lite 👎
