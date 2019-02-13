This package contains some useful utilities to help you write JavaScript better. This package is a great place where to add these small helpers to share them everywhere.

```text
yarn add @kiwicom/js
```

# `invariant`, `warning`

Use these functions instead of traditional error throwing or `console.warn`. Compare these two examples:

```js
import { invariant } from '@kiwicom/js';

invariant(isWorkspaceDirectory === true, 'This is not a workspace directory.');

// vs:

if (isWorkspaceDirectory !== true) {
  throw new Error('This is not a workspace directory.');
}
```

It is a common idiom to use `invariant()` or `invariant(false, ...)` to throw in code that should be unreachable. The rules apply to warning (except it doesn't throw but log to stdout instead):

```js
import { warning } from '@kiwicom/js';

warning(isWorkspaceDirectory === true, 'This is not a workspace directory.');

// vs:

if (isWorkspaceDirectory !== true) {
  console.warn('This is not a workspace directory.');
}
```

First it's more readable this way - you don't have to use conditions at all. But more importantly we can now work with these errors/warnings a bit better. The idea is to transpile these functions so they do not contain sensitive error messages in production. These functions are therefore perfect fit for production applications. Not so great for NPM packages though because you may want to preserve the error messages.

> Please note: this transpilation is currently not implemented yet.

These both functions use `sprintf` behind the scenes (only `%s` is supported):

```js
import { sprintf } from '@kiwicom/js';

sprintf('Oh, %s', 'yeah!');
```
