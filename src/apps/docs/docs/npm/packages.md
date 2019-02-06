---
id: packages
title: Public NPM Packages
sidebar_label: Public NPM Packages
---

This monorepo hosts source code of the following NPM packages. They are being deployed automatically to NPM when you increase the version in `package.json` file and this version is not in NPM yet (applies only to packages with `private:false` visibility).

<!-- AUTOMATOR:UPDATE_DOCS -->

- 1.3.0 [@kiwicom/babel-preset-kiwicom](https://github.com/kiwicom/babel-preset-kiwicom) - Babel preset for JS used at Kiwi.com.
- 1.1.2 [@kiwicom/graphql-bc-checker](https://github.com/kiwicom/graphql-bc-checker) - Script to detect breaking changes in GraphQL schema with ability to log these changes.
- 2.7.0 [@kiwicom/eslint-config](https://github.com/kiwicom/eslint-config-kiwicom) - Eslint configuration describing rules for JS used at Kiwi.com.
- 1.0.1 [eslint-plugin-kiwi-graphql](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/eslint-plugin-kiwi-graphql) - Rules for Kiwi.com GraphQL
- 2.0.1 [@kiwicom/fetch](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/fetch) - Production ready fetch function with advanced capabilities like retries with delay and request cancellation after timeout.
- 0.4.1 [@kiwicom/graphql-global-id](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/global-id) - Utility to manage ID fields in GraphQL correctly.
- 1.0.2 [@kiwicom/graphql-resolve-wrapper](https://github.com/kiwicom/graphql-resolve-wrapper) - Utility which enables to wrap GraphQL resolvers with your custom functions.
- 0.3.1 [@kiwicom/graphql-utils](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/graphql-utils) - Set of useful tools to build better GraphQL servers.
- 0.7.0 [@kiwicom/graphql-logz](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/logz) - Implementation of Logz.io handler for better GraphQL monitoring.
- 0.1.1 [@kiwicom/monorepo](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/monorepo) - Helpful functions to manage monorepos (using Yarn Workspaces).
- 0.3.1 [@kiwicom/npm-publisher](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/npm-publisher) - Tools for automatically publishing of NPM packages
- 0.1.0 [@kiwicom/relay](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/relay) - Highly opinionated Relay Environment used at Kiwi.com
- 1.0.1 [@kiwicom/signed-source](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/signed-source) - Utility for signing and verifying generated files.
- 0.3.1 [@kiwicom/test-utils](https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/test-utils) - Set of tools for easier testing in JS.
- 1.0.2 [@kiwicom/vault2env](https://github.com/kiwicom/vault2env-js) - Utility to help us fetching ENV variables from Vault automatically.

<!-- /AUTOMATOR:UPDATE_DOCS -->

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
