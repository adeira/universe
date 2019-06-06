---
id: installation
title: Install & Run this monorepo
sidebar_label: Installation
---

This project is _monorepo_ for projects created in Incubator tribe which essentially means it contains many smaller repositories (do not confuse it with monolith). Some of these subprojects are exposed publicly via NPM (see [Public NPM Packages](oss/npm-packages.md) for more info).

Requirements:

- _latest_ [Git](https://git-scm.com/)
- _latest_ [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/) version >1.0

Installation:

<!--DOCUSAURUS_CODE_TABS-->
<!--Stable method-->

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

<!--Experimental methods-->

> Here be dragons! Do not use these methods unless you understand it.

First technique (sparse checkout):

```text
mkcd universe
git init
git config --local core.sparseCheckout true
echo "src/apps/graphql/*" > .git/info/sparse-checkout
git remote add -f origin git@gitlab.skypicker.com:incubator/universe.git
git checkout master
```

Sparse checkout definitions should be predefined by Universe. My idea is to provide some simple installer where everything is gonna be prepared. Even better technique is to use clone filters. However, our company server currently doesn't support cloning with filters. This example shows simulation using our local repository instead to demonstrate this technique:

```text
# this must be set on the server (in this case local Universe repo)
git config --local uploadpack.allowFilter true
git config --local uploadpack.allowAnySHA1InWant true
```

Now clone the local repo (combined with sparse checkout) - do not forget to change your paths:

```text
git clone --depth=1000 --no-checkout --filter=blob:none "file:///Users/mrtnzlml/Work/kiwi-private/incubator/universe"
cd universe
git config --local core.sparseCheckout true
echo "src/apps/graphql/*" > .git/info/sparse-checkout
git checkout master
```

This is surprisingly effective method (final size is 6.3M compared to previous 166M with simple sparse checkout) but Git world is not quite ready for this yet.

References:

- https://gitlab.com/groups/gitlab-org/-/epics/915
- https://gitlab.com/gitlab-org/gitaly/issues/1581
- https://stackoverflow.com/a/52270636/3135248

<!--END_DOCUSAURUS_CODE_TABS-->
