This package prepares our public NPM packages to be published. It can automatically find these packages, transpile them based on our Babel configuration, copy Flow versions of the files and automatically publish it to NPM (in CI). It publishes only packages with new version and it ignores old or current versions.

# Usage

```
yarn babel-node src/packages/npm-publisher/src/index.js
```

**Please note:** it's important to run this script like this and not through Yarn using `scripts` in `package.json`. Yarn is messing up NPM registry address and the publishing wouldn't work otherwise.

# TODOs

- automatically generate changelog for each package
- publish itself on NPM (using bin script)
