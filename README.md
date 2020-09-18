[![Adeira logo](/src/adeira.dev/static/img/logo-banner.png)](https://adeira.dev/)

`adeira/universe` monorepo is an open-source collection of projects created in our free time. We are friends helping each other to build libraries and applications and effectively share knowledge and work among all of us.

![Continuous Integration (JavaScript)](<https://github.com/adeira/universe/workflows/Continuous%20Integration%20(JavaScript)/badge.svg>) ![Continuous Integration (Rust)](<https://github.com/adeira/universe/workflows/Continuous%20Integration%20(Rust)/badge.svg>) ![Continuous Integration (Bazel)](<https://github.com/adeira/universe/workflows/Continuous%20Integration%20(Bazel)/badge.svg>)

![Shipit](https://github.com/adeira/universe/workflows/Shipit/badge.svg) ![NPM Publisher](https://github.com/adeira/universe/workflows/NPM%20Publisher/badge.svg) ![Dockerfile Builder](https://github.com/adeira/universe/workflows/Dockerfile%20Builder/badge.svg)

See: https://adeira.dev/ for more info.

## Quick start

First, install [Bazelisk](https://github.com/bazelbuild/bazelisk/) if you don't have it yet:

```bash
brew install bazelisk
```

Now, you can clone the repository and install it:

```bash
git clone --depth=100 git@github.com:adeira/universe.git
cd universe
bazel run @nodejs//:yarn
```

And finally, run the tests, build or anything you want. The repository should be ready:

```bash
bazel test //...
bazel build //...
bazel query //...
```

Note: first build might take longer time - it's normal. Consecutive builds will be _much_ faster.

To autofix Bazel files run:

```bash
# TODO: move this somewhere else (should not be in "quick start" section)
bazel run --build_tag_filters=manual //:buildifier.fix
```

What now? There are many projects under [`src/`](/src) and all of them are tested and linted together (with many monorepo optimizations). You can try to run all the checks:

```bash
yarn test
```

It runs only the necessary checks based on what changed last. This monorepo si divided into many workspaces. You can access commands of each workspace like so:

```bash
yarn workspace @adeira/example-relay start
```

Specific workspace names can be found in individual `package.json` files of each workspace.

_Do you need some help? Feel free to [ask](https://github.com/adeira/universe/discussions). :)_

## `adeira/universe` monorepo structure

Overall picture of this monorepo:

```text
/
├── .github/
│   ├── workflows/              # global GitHub CI job definitions
├── .yarn/
│   └── releases/               # Yarn itself
├── flow-typed/                 # external Flow types definitions
├── node_modules/
├── scripts/                    # support scripts for this monorepo
├── src/                        # all the source codes (workspaces)
│   ├── fetch/
│   ├── js/
│   ├── relay/
│   └── …
├── .eslintrc.js                # global Eslint config
├── .flowconfig                 # global Flow config
└── package.json                # global workspaces definition
```

As you can see we store all the code of this monorepo in [`src/`](/src) folder which contains additional subfolders for each project. You will spend most of the time there. Tools like Eslint and Flow (+ the whole testing system) is defined globally for everyone.

_Node: we require you to install Yarn version 1.0+ but the actual version used when working with Universe is defined in `.yarnrc` and it's stored in `.yarn/release`. Your local Yarn version us just an initial executor for the actual Yarn._

## Contributing

Check our [Contribution guide](/.github/CONTRIBUTING.md) on how to report issues, suggest improvements, commit changes and release.

## Information for `adeira/universe` maintainers

- [adeira.slack.com](https://app.slack.com/) - our internal Slack channel
- [Figma designs](https://www.figma.com/file/bAVVTRg9w2vDJ1Hph82hky/Adeira)
- [https://vercel.com/adeira](https://vercel.com/adeira) - our Vercel platform for deployments
- [Kodiak dashboard](https://app.kodiakhq.com/) - automated PR merging
- [Docker Hub](https://hub.docker.com/orgs/adeira)

### Upgrading Flow

Flow is currently being released approx. every 14 days with each release introducing improvements into the type system soundness. It is common that there will be new errors discovered with each release. The recommended strategy is to acknowledge these new errors and suppress them to ease the version upgrade (they were most likely there the whole time anyway). To do so, please clone locally [`facebook/flow`](https://github.com/facebook/flow/) repository, install dependencies via `yarn install` and run the following command (modify as needed):

```bash
./tool add-comments --all --comment "This comment suppresses an error when upgrading Flow to version 0.155.0. To see the error delete this comment and run Flow." --bin /Work/adeira/universe/node_modules/.bin/flow /Work/adeira/universe/src
```

Optionally, you can try to run the `flow fix` command:

```bash
yarn flow fix --write
```

### Troubleshooting

<details>
<summary>Click to expand</summary>

Things go broken and sometimes it's difficult to understand what's going on. This section should help with these tricky problems. Please help us expand it as you go.

#### When running tests

Problem (some unexpected Babel behavior which doesn't seem to be a code problem):

```text
TypeError: /adeira/universe/src/relay/.babelrc.js: Error while loading config - yield* (intermediate value)(intermediate value)(intermediate value)(intermediate value) is not iterable
```

```text
TypeError: [BABEL] /adeira/universe/src/sx/src/__tests__/StyleCollectorPseudoNode.test.js: (0 , _parser(...).parse) is not a function
```

Solution:

```bash
yarn test-only --clearCache
```

You can also try to delete `node_modules/.cache/@babel/` folder.

---

Problem:

```text
node:internal/process/promises:218
          triggerUncaughtException(err, true /* fromPromise */);
          ^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "Error: secret error ccc".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
```

This happens on Node.js version 15 due to this Jest issue: https://github.com/facebook/jest/issues/10784

Solution: switch to later (LTS) Node.js version (`nvm use 14`) to see the full error message and run the test again.

---

Problem:

```text
jest-haste-map: Watchman crawl failed. Retrying once with node crawler.
Usually this happens when watchman isn't running. Create an empty `.watchmanconfig` file in your project's root folder or initialize a git or hg repository in your project.
Error: Watchman error: query failed: synchronization failed: Operation timed out. Make sure watchman is running for this project. See https://facebook.github.io/watchman/docs/troubleshooting.
```

And all the scripts (lints, tests) are slow or unresponsive.

Solution:

```bash
watchman shutdown-server
```

</details>
