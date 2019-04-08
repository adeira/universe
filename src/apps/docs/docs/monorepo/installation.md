---
id: installation
title: Install & Run this monorepo
sidebar_label: Installation
---

This project is _monorepo_ for projects created in Incubator tribe which essentially means it contains many smaller repositories (do not confuse it with monolith). Some of these subprojects are exposed publicly via NPM (see [Public NPM Packages](oss/npm-packages.md) for more info).

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
