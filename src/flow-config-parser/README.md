Permissive [Flow config](https://flow.org/en/docs/config/) parser.

```text
yarn add @adeira/flow-config-parser
```

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

TKTK
