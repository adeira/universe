# Unreleased
- All JS files are now distributed in 3 variants: transpiled JS code, Flow versions and MJS versions supporting ES6 imports.
- Breaking: NPM publisher now accepts explicit `Set` of workspace names to publish. We changed it so you don't publish a package from your monorepo by accident - it's necessary to be explicit.

# 1.1.0
- Internal dependencies upgraded and `@kiwicom/babel-preset-kiwicom` bumped to version 3.0.0 which now supports dynamic `import()` syntax.
