**This package is ONLY for BE services at this moment!**

When shipping to production we need to transpile all our code including our used workspaces (and their respective workspaces). These steps are necessary in order to successfully build GraphQL (or any other backend JS service):

1. transpile and copy `src/incubator/graphql`
2. transpile and copy all workspaces used by GraphQL recursively
3. copy root `package.json` and `yarn.lock`
4. copy Yarn itself, Yarn config and offline mirror
5. run `yarn install` from this new destination
6. delete Yarn offline mirror
7. 🚀

Please note: these steps **must** be executed from Docker image to compile native C++ dependencies correctly!

Why not webpack or naive Babel CLI? Babel CLI doesn't understand workspaces and their dependencies. It's quite complicated after some time to manage this manually and not to forget anything. Webpack is great next step because it can handle these dependencies via file requires and therefore build a minimal subset of your codebase. However, some dependencies can opt-out from this via [`__non_webpack_require__`](https://webpack.js.org/api/module-variables/#__non_webpack_require__-webpack-specific) and effectively make it useless. It's quite rare but possible. Moreover some dependencies strictly require predefined structure in `node_modules` (typically the ones working with native C++ dependencies). This package builds on both of these previous steps and solves both mentioned issues.

Eventually, we'll have proper build system for our JS applications like Buck or Bazel.

## Usage

_This script is currently quickly baked together to make it work. It will most likely change._

```text
yarn monorepo-babel-node src/core/monorepo-builder/src/index.js <ROOT_WORKSPACE_NAME> <BUILD_DIRECTORY_NAME>
```

So for example:

```text
yarn monorepo-babel-node src/core/monorepo-builder/src/index.js @kiwicom/graphql com.kiwi.universe.graphql.build
```
