---
id: installation
title: Install & Run GraphQL API server
sidebar_label: Installation
---

Install:

```text
git clone git@gitlab.skypicker.com:graphql/graphql.git
( cd graphql ; yarn install )
```

Run:

```text
yarn start
```

Server runs by default on `http://127.0.0.1:3000/`. All environment variables necessary for development are stored in our [Vault](https://confluence.kiwi.com/display/PT/Vault). For accessing the Vault you need a token which you can obtain by pinging `@martin.zlamal` on Slack. Make sure you have Keybase set up and listed on your Slack profile.

You can get environment variables using the Vault key by running the following command:

```
yarn vault --token=<VAULT_TOKEN>
```

You have to be connected on VPN in order for this to work (request it using kiwibase.kiwi.com).

Please note: you should not be able to write into this vault and you are not going to have access to production environment variables.

## Run tests

```text
yarn test         # unit and integration tests
yarn test-bc      # backward compatibility
yarn test-ci      # everything above + lints and typechecks (runs on the CI server)
```

## About this project

This project is monorepository which essentially means it contains many smaller repositories (do not confuse it with monolith). Some of these subprojects are exposed publicly via NPM:

<!-- AUTOMATOR:1 -->

- 1.1.0 [@kiwicom/babel-preset-kiwicom](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/babel-preset-kiwicom) - Babel preset for JS used at Kiwi.com.
- 1.1.0 [@kiwicom/graphql-bc-checker](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/bc-checker) - Script to detect breaking changes in GraphQL schema with ability to log these changes.
- 2.2.0 [@kiwicom/eslint-config](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/eslint-config-kiwicom) - Eslint configuration describing rules for JS used at Kiwi.com.
- 1.0.0 [eslint-plugin-kiwi-graphql](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/eslint-plugin-kiwi-graphql) - Rules for Kiwi.com GraphQL
- 0.4.0 [@kiwicom/graphql-global-id](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/global-id) - Utility to manage ID fields in GraphQL correctly.
- 1.0.0 [@kiwicom/graphql-resolve-wrapper](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/graphql-resolve-wrapper) - Utility which enables to wrap GraphQL resolvers with your custom functions.
- 0.3.0 [@kiwicom/graphql-utils](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/graphql-utils) - Set of useful tools to build better GraphQL servers.
- 0.6.0 [@kiwicom/graphql-logz](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/logz) - Implementation of Logz.io handler for better GraphQL monitoring.
- 0.1.0 [@kiwicom/monorepo](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/monorepo) - Helpful functions to manage monorepos (using Yarn Workspaces).
- 0.3.0 [@kiwicom/npm-publisher](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/npm-publisher) - Tools for automatically publishing of NPM packages
- 1.0.0 [@kiwicom/signed-source](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/signed-source) - Utility for signing and verifying generated files.
- 0.3.0 [@kiwicom/test-utils](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/test-utils) - Set of tools for easier testing in JS.
- 1.0.0 [@kiwicom/vault2env](https://gitlab.skypicker.com/graphql/graphql/tree/master/src/packages/vault2env) - Utility to help us fetching ENV variables from Vault automatically.

<!-- /AUTOMATOR:1 -->

## Acceptance criteria

Any project from Incubator tribe can be accepted into this monorepo. However, there are some important criteria:

- project uses latest version of `@kiwicom/eslint-config` without any errors or warnings (preferably not masked with `eslint-disable` comments)
- project doesn't use any other additional Eslint rules (should be ported to `@kiwicom/eslint-config` but exceptions can be made after some discussion)
- project is using latest version of Flow
- project has all the dependencies updated
