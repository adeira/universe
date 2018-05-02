<!--

CONTRIBUTING.md - what to do
README.md (docs) - how to do stuff

-->

Thanks for contributing to this repository. Please go through the following notes to make sure we keep this repository organized and consistent:

# Our Development Process

We want to push changes to the `master` branch as soon as possible and we consider `master` branch to be a stable branch (with continuous deployments from this branch). Every change should go through Pull Request (PR) and code review and we prefer smaller PRs even though the future is not completely finished yet.

Please read our main README file for more detailed info about how to write code or test it. Tl;dr:

- add your code and if you think it should be tested then do so (unit tests for non-trivial code, integration tests for business critical things)
- update the documentation if needed (README file)
- ensure the test suite passes (`yarn test-ci`)
- ensure it actually works (`yarn start` -> verify in the browser)
- submit PR and wait for the code review (do not let it die)

Every change is automatically deployed from the `master` if the tests are green!

# Styleguides

- [Directory Structure](https://github.com/kiwicom/graphql#directory-structure)
- [How to use localization, data loaders or output types?](https://github.com/kiwicom/graphql#design-style-guides)

# Updating snapshot of GraphQL schema

We have to be careful about what changes are landing in the master branch because. Especially considering Backward Compatibility (BC) breaks. For this reason we are testing BC breaks and we do not allow them at all. You can easily verify it after your changes with this command:

```
yarn test-bc
```

It should return something like this:

```
▲ graphql at contributing ✔ y test-bc
yarn run v1.7.0

Congratulations! NO BREAKING CHANGES or OUTDATED SCHEMA. Good job!

✨  Done in 3.24s.
```

Everything is fine! Otherwise, it will give you suggestions what to do:

```
▲ graphql at contributing ✖ y test-bc
yarn run v1.7.0
You introduced breaking changes into the public GraphQL schema. This change may or may not be intentional. These breaking changes may break some clients consuming our public API. Please try to find a way how to avoid breaking changes and try it again. Here is list of all breaking changes:

FIELD_CHANGED_KIND - Address.street changed type from String to Int.
FIELD_REMOVED - Address.zip was removed.
VALUE_REMOVED_FROM_ENUM - id was removed from enum type Language.

Tips how to avoid breaking changes:

- field removal/modification (introduce new field and only deprecate the old one)
- type removal/modification (just deprecate it and leave it there)
- removal from enum/union (introduce new enum/union)
- arguments removal/modification (introduce new query or graph node)
- change non-nullable -> nullable (just don't do it or introduce new field)
- change of default argument value (don't or introduce new argument/query)
```

Please note - the schema snapshot is being saved automatically and you cannot affect it in any way. Schema must be always commited to the repository with your changes. Also, this checks only structural BC breaks but it will not check BC breaks in your code behavior. So it's still possible to introduce breaking changes to the code and you should always think about that.
