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
