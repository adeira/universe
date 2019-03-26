---
id: releasing
title: Releasing of new versions
sidebar_label: Releasing
---

Our NPM packages are being released automatically on NPM when you increase a version in `package.json` file and this version is not in NPM yet (applies only to packages with `private:false` visibility).

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
