Permissive [Flow config](https://flow.org/en/docs/config/) parser.

```text
yarn add @adeira/flow-config-parser
```

# Supported functions

## `parse`

Parse function doesn't do any magic. It simply takes the `.flowconfig` as a first argument and returns object with the config values:

```js
import { parse } from '@adeira/flow-config-parser';

parse(`
[version]
>=0.138.0 <0.140.0
`);
```

Returns:

```json
{
  "declarations": [],
  "ignore": [],
  "include": [],
  "libs": [],
  "lints": null,
  "options": null,
  "rollouts": null,
  "strict": [],
  "untyped": [],
  "version": ">=0.138.0 <0.140.0"
}
```

## `merge`

Merge functions merges two configs together and returns the final config:

```js
const configA = `
  [options]
  emoji=true
  module.file_ext=.foo
  module.file_ext=.bar
`;

const configB = `
  [options]
  emoji=false
  module.file_ext=.baz
  munge_underscores=false
`;

merge(configA, configB);
```

Returns:

```text
# ...

[options]
emoji=false
module.file_ext=.foo
module.file_ext=.bar
module.file_ext=.baz
munge_underscores=false

# ...
```

## `print`

Print function takes the parsed config and prints it into `.flowconfig` format:

```js
const parsedConfig = parse(' … '); // original config
print(parsedConfig);
```

# Caveats

This parser supports `[rollouts]` parsing only partially. Specifically, it omits rollout annotations when parsing. So for example, this config:

```text
[rollouts]
formed_exports=80% on, 20% off

[options]
(formed_exports=on) experimental.well_formed_exports=true
```

Returns the following object after being parsed (notice the missing `(formed_exports=on)`):

```json
{
  "declarations": [],
  "ignore": [],
  "include": [],
  "libs": [],
  "lints": null,
  "options": {
    "experimental.well_formed_exports": true
  },
  "rollouts": {
    "formed_exports": "80% on, 20% off"
  },
  "strict": [],
  "untyped": [],
  "version": null
}
```

It's because we didn't implement the options merging (on purpose). Rollouts seem to be quite internal and not very often used. However, we might change this if there is a real interest.
