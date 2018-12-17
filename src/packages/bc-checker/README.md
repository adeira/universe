This package checks breaking changes in your GraphQL schema. It saves the schema snapshot (you should version it) and it compares it with newest changes in your schema. This way it's possible to discover breaking changes and it helps you to fix them. It also detects manual changes. This script should be executed on CI server.

# Usage

First install the package:

```
yarn add --dev @kiwicom/graphql-bc-checker
```

And use it as you wish (`scripts/test-bc.js`):

```js
import testBC from '@kiwicom/graphql-bc-checker';

import Schema from './src/Schema';

testBC({
  allowBreakingChanges: false,
  snapshotLocation: './schema-snapshot.graphql',
  schema: Schema,
});
```

You should get this response:

```
🤓 graphql [master] yarn test-bc
yarn run v1.12.1
$ yarn babel-node src/packages/bc-checker/src/index.js
$ /Users/mrtnzlml/Work/kiwi-private/graphql/node_modules/.bin/babel-node src/packages/bc-checker/src/index.js

Congratulations! NO BREAKING CHANGES or OUTDATED SCHEMA. Good job!

✨  Done in 2.68s.
```

It automatically updates the snapshot when you do non-breaking changes (you have to commit it afterwards). This is how it looks like when you do a breaking change:

```
🤓 graphql [master] yarn test-bc
yarn run v1.12.1
$ yarn babel-node src/packages/bc-checker/src/index.js
$ /Users/mrtnzlml/Work/kiwi-private/graphql/node_modules/.bin/babel-node src/packages/bc-checker/src/index.js
You introduced breaking changes into the public GraphQL schema. This change may or may not be intentional. These breaking changes may break some clients consuming our public API. Please try to find a way how to avoid breaking changes and try it again. Here is list of all breaking changes:

VALUE_REMOVED_FROM_ENUM - FUTURE was removed from enum type AllBookingsOnlyEnum.
VALUE_REMOVED_FROM_ENUM - PAST was removed from enum type AllBookingsOnlyEnum.

Tips how to avoid breaking changes:

- field removal/modification (introduce new field and only deprecate the old one)
- type removal/modification (just deprecate it and leave it there)
- removal from enum/union (introduce new enum/union)
- arguments removal/modification (introduce new query or graph node)
- change non-nullable -> nullable (just don't do it or introduce new field)
- change of default argument value (don't or introduce new argument/query)

error Command failed with exit code 1.
```

Good strategy is to fix the breaking change (do it differently). However, there are some cases where you really want to do the breaking change. There is a way how to do it:

```
yarn babel-node src/packages/bc-checker/src/index.js --allow-breaking-changes
```

This will do the breaking change (**DANGEROUS!**) and it will log the changes for the future reference. Always use this command - never do it manually! It automatically generates log like this:

```graphql
# @generated SignedSource<<67af1504fcd9329208521d610def5208>>

# <BREAKING-CHANGES-LOG>
#  VALUE_REMOVED_FROM_ENUM: FUTURE was removed from enum type AllBookingsOnlyEnum.
#  VALUE_REMOVED_FROM_ENUM: PAST was removed from enum type AllBookingsOnlyEnum.
# </BREAKING-CHANGES-LOG>

schema {
  query: RootQuery
  # ...
```

(use git blame to check who did it)
