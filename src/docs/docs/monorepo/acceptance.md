---
id: acceptance
title: Acceptance criteria
sidebar_label: Acceptance criteria
---

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
