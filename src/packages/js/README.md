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
  if (process.env.NODE_ENV !== 'production') {
    console.warn('This is not a workspace directory.');
  }
}
```

First it's more readable this way - you don't have to use conditions at all. But more importantly we can now work with these errors/warnings a bit better. The idea is to transpile these functions so they do not contain sensitive error messages in production. These functions are therefore perfect fit for your production applications.

Invariant has also great [native support in Flow](https://flow.org/en/docs/linting/rule-reference/#toc-unnecessary-invariant). Just add this to your Flow config file:

```ini
[lints]
unnecessary-invariant=error
```

It can detect unreachable code after this invariant as well as unnecessary usage of this function:

```text
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/packages/js/src/invariant.js:32:3

This use of `invariant` is unnecessary because boolean [1] is always truthy. (unnecessary-invariant)

     29│ ): void {
     30│   validateFormat(format);
     31│
 [1] 32│   invariant(true, 'What is the point?');
     33│
     34│   if (!condition) {
     35│     let error;
```

These both functions use `sprintf` behind the scenes:

# `sprintf`

Only `%s` (String) and `%j` (JSON) is supported:

```js
import { sprintf } from '@kiwicom/js';

sprintf('Oh, %s', 'yeah!'); // Oh, yeah!
sprintf('Oh, %j', 'yeah!'); // Oh, "yeah!"
```

# `isObject`

This function ignores internal JS implementation and returns true only for real objects (not arrays or nulls and similar).

```js
import { isObject } from '@kiwicom/js';

isObject({}); // true

isObject(null); // false
isObject([]); // false
```
