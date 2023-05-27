Adeira/Shipit takes care of exporting projects from large Git monorepos into smaller independent Git repositories. Typical use-case is exporting parts of a private monorepo into open-sourced repositories on GitHub. It also supports importing of pull requests back into the monorepo.

Adeira/Shipit consists of two main parts: _Shipit_ for exporting and _Importit_ for PRs importing.

Real-world users:

- https://github.com/adeira
- https://github.com/try-triplex/triplex

# Shipit part

Shipit part is responsible for exporting code from a monorepo to somewhere else.

## Usage

```
npx --package @adeira/monorepo-shipit monorepo-shipit --help
```

## How it works

First, Shipit tries to extract relevant commits of each project we want to export. Each commit is converted into so called _changeset_ which is an immutable structure representing one commit and doesn't depend on Git or any other VCS. Each changeset can contain many diffs describing changes in each individual file.

```text
                                        ↗  diff
             ↗  commit_1  →  changeset  →  diff
Git history  →  commit_2  →  changeset       ⠇
             ↘  commit_3  →  changeset
                   ⠇             ⠇
```

Paths in the original monorepo might be very different from the exported version. Therefore, we apply some filters to hide non-relevant or secret files and to adjust paths in the exported repo version. These modified changesets are then pushed to individual GitHub repositories.

```text
   .-----------------------------------.
   |                                   |
   |      adeira/universe monorepo     |
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
      |              |         .----------.
      |              |         | Git repo | <------.
      |              v         `----------`        |      .--------------------.
      |         .----------.                       |      |                    |
      |         | Git repo | <---------------------+----> |       GitHub       |
      v         `----------`                       |      |                    |
 .----------.                                      |      `--------------------`
 | Git repo | <------------------------------------`
 `----------`
```

One of the filters modifies commit descriptions and adds `adeira-source-id` signature which helps us to identify which changes we pushed last time, so Shipit can just amend latest changes next time. These filters work with the parsed changesets which gives you an incredible flexibility: you can for example completely remove some lines from the exported code. However, please note that this whole process works with diffs and therefore **new filter won't update existing files in GitHub unless you touch them**. So, for instance, if you want to remove some files from the exported repository then just add a new filter and manually change the code in the exported repository.

## Configuration

Real-world examples: https://github.com/adeira/universe/tree/master/src/monorepo-shipit/config

Each project has its own configuration stored in `.shipit` directory (configurable via `--config-dir` option). If you want it to work with another project then you have to create a new configuration (with configuration tests), for example:

```js
module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com/adeira/relay-example.git', // see: https://git-scm.com/docs/git-clone/#_git_urls
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([
      ['src/example-relay/__github__/.circleci', '.circleci'],
      ['src/example-relay/__github__/.flowconfig', '.flowconfig'],
      ['src/example-relay/', ''],
    ]);
  },
  getStrippedFiles(): Set<RegExp> {
    // this method is optional
    return new Set([/__github__/]);
  },
};
```

Here are all supported config options and their interface:

```js
export type ConfigType = {
  +getStaticConfig: () => {
    +repository: string,
  },
  +getPathMappings: () => Map<string, string>,
  +getStrippedFiles?: () => Set<RegExp>,
  +getBranchConfig?: () => {
    +source: string,
    +destination: string,
  },
  +transformCommitMessage?: (message: string) => string,
};
```

Read more about available filters and how to use them below.

## Filters

There are various filters applied on exported changesets to make it work properly. Currently, we apply these filters in _exactly_ this order:

1. `addTrackingData` - adds `adeira-source-id` into the commit description which helps us identify the latest synchronized changes
2. `stripExceptDirectories` - makes sure we publish only files relevant to the workspace that is being exported
3. `moveDirectories` - makes sure that we export correct paths (our projects are located in for example `src/packages/fetch` but we want to have these files in the root on GitHub rather than the original monorepo path), uses `getPathMappings` configuration (see below)
4. `stripPaths` - removes unwanted files based on `getStrippedFiles` configuration
5. `commentLines` - comments out lines marked with `@x-shipit-disable` (see below)
6. `commentLines` - uncomment lines marked with `@x-shipit-enable` (see below)

Order of these filters is significant and has one important implication: it's not possible to "replace" file with different version for OSS. For example, you **cannot** do this:

```js
module.exports = {
  getPathMappings() {
    return new Map([
      ['src/example/__github__/.babelrc.js', '.babelrc.js'],
      ['src/example/', ''],
    ]);
  },
  getStrippedFiles() {
    return new Set([
      /^\.babelrc\.js$/, // replaced by the one in __github__
      /__github__/,
    ]);
  },
};
```

It's because the Babel config file is first moved from `__github__` to the repository root, and later it's stripped (see filters 3 and 4). It would not work even if we'd change order of the filters (`__github__` would be first stripped and later there is no Babel config to move).

_Are you interested in having this improved? Let us know._

### Filter `moveDirectories`

This filter maps our internal directories to exported directories and vice versa. Typical minimalistic mapping looks like this:

```js
new Map([
  // from, to
  ['src/fetch/', ''],
]);
```

This maps all the files from our [fetch](https://github.com/adeira/universe/tree/master/src/fetch) package to the GitHub root so OSS users have access to everything from this package. More advanced example when you need to publish some GitHub specific files:

```js
new Map([
  ['src/fetch/__github__/', ''], // trailing slash is significant
  ['src/fetch/', ''],
]);
```

This mapping moves all the files from `__github__` to the root. There are two things you should understand. Firstly, order matters. First mapping route takes precedence and should be therefore more specific. Secondly, this mapping is irreversible (read more about what does it mean in [Importit part](#importit-part-_unstable_)).

And finally this is how you'd map your package to the subfolder on GitHub (good for shipping from our monorepo to different monorepo or when you are avoiding previously mentioned irreversibility):

```js
new Map([['src/packages/fetch/', 'packages/fetch/']]);
```

### Filter of conditional comments (`commentLines`)

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

Please note: this is just an example, currently we support only `// @x-shipit-enable` and `// @x-shipit-disable` in this exact format.

## Renaming project roots

It's fairly straightforward to rename things inside your specified root and ship them correctly to GitHub. However, it's far more challenging to rename the roots in monorepo while keeping the shipping working. It's because Shipit is looking at for example `src/packages/monorepo/` root but when you rename it then it seems like the project is completely new (missing history => new files). This would conflict with the code that is already exported on GitHub for example.

```js
module.exports = {
  getPathMappings(): Map<string, string> {
    return new Map([
      ['src/path-old/', ''],
      ['src/path-new/', ''], // add a new root here, keep the old one as well
    ]);
  },
};
```

To deal with this you have to approach the roots renaming carefully. Our current best attempt is to do it in two steps:

1. Rename your root as needed and add it to the config. Do not delete the old one though. Shipit should understand what is going on and deploy an empty commit with correct `adeira-source-id`.
2. Delete the original root from the config when the previous step succeeds. You should be good to go.

Don't worry if you mess up something. Monorepo is always a source of truth and it won't be messed up. Worst case scenario is that Shipit job will start failing. One way out of this situation is to either fix the previous steps or simply create manually an empty commit on GitHub with corrected `adeira-source-id` so that Shipit can catch up.

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

**Only imports from GitHub are currently supported. Help us to improve this part.**

## Usage

```
npx --package @adeira/monorepo-shipit monorepo-importit --help
```

## How it works

This is how you'd import a pull request #1 from `adeira/js` GitHub repository into your local branch (to be later merged into your monorepo):

```text
npx --package @adeira/monorepo-shipit monorepo-importit --committer-name=A --committer-email=B --pull-request=https://github.com/adeira/js/pull/1
```

Technically, _Importit_ part works just like _Shipit_ except in the opposite direction and from pull requests:

```text
   .-----------------------------------.
   |                                   |
   |      adeira/universe monorepo     |
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
      |              |         .---------------.
      |              |         | GH repo PR #1 |
      |              |         `---------------`
      |         .----------------.
      |         | GH repo PR #21 |
      |         `----------------`
 .----------------.
 | GH repo PR #42 |
 `----------------`
```

## Filters

The only filter being applied when importing the projects is filter which moves directories (see Shipit filters) except it's applied in the reversed order. One important drawback here to understand is that while Shipit filters can have duplicate destinations, Importit filters cannot. This means that not every Shipit filter can be inverted. It's because it would be impossible to figure out how should be the files restored when importing back to our monorepo.

# Main differences from facebook/fbshipit

- our version is tailored for our needs and infra, not Facebook ones
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
