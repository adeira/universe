---
id: eslint-config-migration
title: Migration to @adeira/eslint-config
sidebar_label: Migration to ESLint config
---

So you are working on a project for some time and finally an idea to start using `@adeira/eslint-config` appears. You set up everything quickly based on [the documentation](https://www.npmjs.com/package/@adeira/eslint-config), run `yarn eslint .` for the first time and receive output like this:

```text
2972 problems (2543 errors, 429 warnings)
62 errors and 82 warnings potentially fixable with the `--fix` option.
```

The goal of this article is you don't quit after such a message.

# Make it done, make it right

It's totally OK to have many errors and warnings if you don't use `@adeira/eslint-config` in your project since the beginning. Important thing is to have a plan of how to come from zero to hero.

The plan **should not be** like:

1. Stop everything else
2. Fix all problems in one branch
3. Don't tell anyone about concerns

The plan **should be** like:

1. Start moving the right direction
2. Merge often so other branches can be rebased
3. Ask in `#monorepo` channel

# First things first

The low hanging fruit is this:

```bash
yarn eslint . --fix
```

Now you fixed everything that was possible to be fixed automatically.

Next step is to make the pipeline green by disabling all the problematic rules in `.eslint.js`:

```js
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  extends: ['@adeira/eslint-config'],
  parser: 'babel-eslint',
  rules: {
    'babel/camelcase': OFF,
    'babel/no-unused-expressions': OFF,
    'consistent-return': OFF,
    // ...
    'relay/graphql-syntax': OFF,
    'relay/unused-fields': OFF,
    'require-await': OFF,
  },
};
```

Now you can create a merge request and get this into `master`.

# Roll up your sleeves

The **most important step** has to follow - make a short term plan on how to remove all the disabled rules from `.eslint.js`. Group the rules into batches that can be fixed in one day and create issues for this. Merge ASAP and rebase other branches.

It could help to add info about warning and errors into issue description:

```text
'jest/no-test-return-statement': OFF, // 1 error
'jest/prefer-called-with': OFF, // 2 warnings
'adeira-incubator/no-invalid-flow-annotations': OFF, // 44 errors
```

Focus on errors first. Warnings don't break the pipeline (until next major version release of the config), just take a look if it isn't pretty easy to fix them now.

The whole team should be committed to fixing the errors, don't make it to be a one man show.

# Think, have questions

It's hard to have a motivation for this if you don't understand the purpose. If it's unclear for you why some rule was added into `@adeira/eslint-config` don't be afraid to ask on Slack in `#monorepo` channel.

The same goes with fixing blindly every rule. It can happen you have a very good reason to break some rule in your project, just please provide your feedback in `#monorepo`. It can be explained why it's not a good idea or you can explain why it is a good idea to ignore that in your project or even why to remove that rule in the next `@adeira/eslint-config` release.
