# Unreleased

Note for all Flow users: all projects in [`adeira/universe`](https://github.com/adeira/universe) now use implicit exact Flow types (`{}` for strict objects and `{ ... }` for open objects, syntax `{||}` is deprecated). We do not expect any issues as long as you are using `exact_by_default=true` Flow option.

- Support for non-standard `"module"` top field in `package.json` has been removed. The plan is to replace it with [more standardized packages approach](https://nodejs.org/api/packages.html) without our custom quirks.

# 2.0.0

- Support for Node.js 12 has been removed. This package might continue working on older Node.js versions, however, it's highly recommended upgrading to Node.js version 14 or newer. For more details, see: https://nodejs.org/en/about/releases/, or discuss here: https://github.com/adeira/universe/discussions/1588
- Upgrade `@adeira/babel-preset-adeira` to 2.0.0.
- Breaking Change: Add reactRuntime option. You can set it to `automatic` to use the new [JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html), or set it to `classic` to use the classical version. Note that `automatic` is the default.
- Improved NPM API error handling

# 1.0.0

- Updated dependencies

# 0.3.0

- Set root mode to upwards to apply consumer projects babel config
- Fixed simultaneous publishing of CJS and MJS files. MJS projects are now exported with correct `main` field in `package.json`.

# 0.2.0.0

- All JS files are now distributed in 3 variants: transpiled JS code, Flow versions and MJS versions supporting ES6 imports.
- Breaking: NPM publisher now accepts explicit `Set` of workspace names to publish. We changed it so you don't publish a package from your monorepo by accident - it's necessary to be explicit.

# 0.1.1.0

- Internal dependencies upgraded and `@adeira/babel-preset-adeira` bumped to version 3.0.0 which now supports dynamic `import()` syntax.
