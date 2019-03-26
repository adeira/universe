---
id: installation
title: Install & Run this monorepo
sidebar_label: Installation
---

This project is _monorepo_ for projects created in Incubator tribe which essentially means it contains many smaller repositories (do not confuse it with monolith). Some of these subprojects are exposed publicly via NPM (see [Public NPM Packages](npm/packages.md) for more info).

Requirements:

- latest [Git](https://git-scm.com/)
- latest [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/) version >1.0

Install:

```text
git clone --depth=1000 git@gitlab.skypicker.com:incubator/universe.git
( cd universe ; yarn install --offline )
```

It can take some time. If everything looks OK then you just successfully installed all the necessary dependencies. Now, go to the docs of the project you need to work with and follow the _run_ instructions there. You can run this documentation locally using this command:

```text
yarn workspace @kiwicom/docs start
```

Previous install command downloads only limited history. You can backfill the whole history using this command (usually not necessary):

```text
git pull --unshallow
```

## Acceptance criteria

Any project from Incubator tribe can be accepted into this monorepo. However, there are some important criteria:

- project uses latest version of `@kiwicom/eslint-config` without any errors or warnings (preferably not masked with `eslint-disable` comments)
- project doesn't use any other additional Eslint rules (should be ported to `@kiwicom/eslint-config` but exceptions can be made after some discussion)
- project is using latest version of Flow
- project uses latest version of `@kiwicom/fetch` as a primary fetch library
- `package.json` contains these fields: `private: true`, `name: @kiwicom/*`
- tests are nested in the `__tests__` folder with `*.test.js` extension
- project has all the dependencies updated

The following workflow is used in order to import the project _including_ Git history. First it's necessary to create the same directory structure in the initial repository to copy monorepo structure. This basically means you have to nest everything inside `src/apps` so in this example it would be `src/apps/geojson-editor`. Now it's possible to merge the repository into monorepo easily:

```text
# executed from incubator/universe

git remote add geojson-editor git@gitlab.skypicker.com:alex.alexeev/geojson-editor.git
git fetch geojson-editor --no-tags
git merge --allow-unrelated-histories geojson-editor/master
git remote remove geojson-editor
```

TODO: sync instructions (we are probably going to import it first, do some tweaks and then sync it for real)

Git >=2.19 is needed (https://git-scm.com/docs/git-merge#git-merge---allow-unrelated-histories).

[source](https://stackoverflow.com/a/10548919/3135248)
