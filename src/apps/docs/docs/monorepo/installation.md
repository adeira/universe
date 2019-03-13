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
git clone git@gitlab.skypicker.com:incubator/universe.git
( cd universe ; yarn install )
```

If everything looks OK then you just successfully installed all the necessary dependencies. Now, go to the docs of the project you need to work with and follow the _run_ instructions there. You can run this documentation locally using this command:

```text
yarn workspace @kiwicom/docs start
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

## Writing commit messages

Please read this legendary article first: https://chris.beams.io/posts/git-commit/

TL;DR:

- Separate subject from body with a blank line
- Limit the subject line to 50 characters
- Capitalize the subject line
- Do not end the subject line with a period
- Use the imperative mood in the subject line
- Wrap the body at 72 characters
- Use the body to explain _what_ and _why_ vs. _how_

Please note that these rules are not enforced in any way and you should not get blocked on it. Need more than 50 characters? Use more - don't worry about it that much. But have these rules in your mind. They will significantly improve the way how you contribute. Also, do not consider Merge Request (MR) messages to be source of truth. They are not part of Git history. Commit message and body is always source of the truth. It's not unusual to have MR without any description but with 5 commits containing proper explanation.

There is one more trick related to monorepo (but works really well anywhere, not only in monorepo): prefix the commit title with part of application it relates to. Examples:

```text
e9700715 Eslint config: enable warnings for 'react/sort-comp' rule
a040f357 Docs: update NPM packages list
96afa50e Automator: add support for filtering multiple Git workspaces to GitHub
```

You can skip the prefix if it's not necessary. But imagine the situation without the prefixes for the previous commit messages:

```text
# ⚠️ this is example of what NOT to do

e9700715 Enable warnings for 'react/sort-comp' rule
a040f357 Update NPM packages list
96afa50e Add support for filtering multiple Git workspaces to GitHub
```

It's not very clear if you don't know what is going on (and you won't after a few weeks).

Some people also tend to use prefixes like _chore_, _fix_, _feat_ and similar. Please try to avoid this here. It is just a noise without any real value. It also implies that updating docs, fixing something or doing maintenance is something less important or different from regular development. It is not. Try this instead:

```text
b0951c5b GraphQL: fix dynamic packages tests on Node 10
0c81cf14 Upgrade Docusaurus to the latest version (^1.7.1)
70e5225a Tests runner: add support for circular dependencies among workspaces
```

These commit titles are sufficient. No need for additional keyword describing _maintenance_ or _new feature_ commit type.
