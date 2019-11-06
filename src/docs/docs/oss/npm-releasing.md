---
id: npm-releasing
title: Releasing of NPM packages
sidebar_label: NPM Releasing
---

Our NPM packages are being released automatically on NPM when you increase a version in `package.json` file and this version is not in NPM yet (applies only to packages with `private:false` visibility). We use [`@adeira/monorepo-npm-publisher`](https://github.com/adeira/universe/tree/master/src/monorepo-npm-publisher) behind the scenes.

This publisher automatically transpiles your code in order to ship compatible JS code, Flow types and modern JS variant with `import/export` keywords (ES6 modules). Read more about how it works in [behind the scenes explanation](https://github.com/adeira/universe/tree/master/src/monorepo-npm-publisher#behind-the-scenes-explanation).

Every package with version greater than 1.0 (ignoring patch version) must have `CHANGELOG.md` file with the following format:

```text
# Unreleased
- change description

# 1.2.0
- change description
- change description

# 1.1.0
- change description
- change description
```

This changelog is being tested so you have to follow this format otherwise new version won't be released and the test will fail.
