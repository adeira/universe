# Thanks for contributing to Adeira Universe.

We want to push changes to the `master` branch as soon as possible and we consider `master` branch to be a stable branch (with continuous deployments from this branch). Every change should go through Merge Request (MR) and code review and we prefer smaller MRs even though the feature is not completely finished yet.

This project is a monorepo so please consult documentation for your project. However, these simple rules apply in general:

- add your code and if you think it should be tested then do so (unit tests for non-trivial code, integration tests for business critical things)
- update the documentation if needed
- ensure the test suite passes (`yarn test`)
- make sure it actually works by trying it
- submit a merge request and wait for the code review (do not let it die)

Every change is automatically deployed from the `master` if the tests are green.

# Contribution guide

## Code of Conduct

Adeira Universe uses Contributor Covenant, read [the full text](/CODE_OF_CONDUCT.md) to understand what working environment we want to adhere.

## Commit messages

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

## Releasing package to NPM

Our NPM packages are being released automatically on NPM when you increase a version in `package.json` file and this version is not in NPM yet (applies only to packages with `private:false` visibility). We use [`@adeira/monorepo-npm-publisher`](https://github.com/adeira/universe/tree/master/src/monorepo-npm-publisher) behind the scenes.

This publisher automatically transpiles your code in order to ship compatible JS code, Flow types and modern JS variant with `import/export` keywords (ES6 modules). Read more about how it works in [behind the scenes explanation](https://github.com/adeira/universe/tree/master/src/monorepo-npm-publisher#behind-the-scenes-explanation).

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

When you send MR with new feature or bug fixing reported issue, we might ask you to add short description under `unreleased` during code review. Once it's merged to master, changes are released by bumping package version and updating its `CHANGELOG.md` as e.g. can be seen here: https://github.com/adeira/universe/pull/93


