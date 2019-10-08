This package contains some useful utilities to help you write JavaScript better. It is a great place where to add these small helpers (_without 3rd party dependencies_) to share them everywhere.

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

These both functions use [`sprintf`](#sprintf) behind the scenes.

# `sprintf`

This function allows you to replace string placeholders similar to how `console.log` or `util.format` work. However, this function is system independent and works in browsers, Node.js and RN. Only `%s` (String) and `%j` (JSON) is supported:

```js
import { sprintf } from '@kiwicom/js';

sprintf('Oh, %s', 'yeah!'); // Oh, yeah!
sprintf('Oh, %j', 'yeah!'); // Oh, "yeah!"
```

It can handle circular references gracefully:

```js
import { sprintf } from '@kiwicom/js';

const obj = {
  a: 'foo',
};
obj.b = obj;

sprintf('%s', obj); // '[object Object]'
sprintf('%j', obj); // '{"a":"foo","b":"[Circular]"}'
```

It is also possible to escape the percentage sign with `%%`.

# `isObject`

This function ignores internal JS implementation and returns true only for real objects (not arrays or nulls and similar).

```js
import { isObject } from '@kiwicom/js';

isObject({}); // true
isObject(new Date()); // true

isObject(null); // false
isObject([]); // false
```

# `isObjectEmpty`

```js
import { isObjectEmpty } from '@kiwicom/js';

isObjectEmpty({}); // true (the only case)

isObjectEmpty({ a: 1 }); // false
isObjectEmpty(null); // false
isObjectEmpty(new Date()); // false
```

# `isNumeric`

Correctly determines whether the value is numeric or not.

```js
import { isNumeric } from '@kiwicom/js';

isNumeric('42'); // true
isNumeric(42); // true
isNumeric(0xfff); // true

isNumeric(null); // false
isNumeric([]); // false
isNumeric(Infinity); // false
```

# `nullthrows`

This function allows you to reduce necessary boilerplate when checking for null and throwing an exception.

```js
function abc() {
  const x = dataloader.load(1);
  if (x == null) {
    throw new Error('Got unexpected null or undefined.');
  }
  return x;
}
```

Becomes:

```js
import { nullthrows } from '@kiwicom/js';

function abc() {
  return nullthrows(dataloader.load(1));
}
```

Alternatively, you can supply a custom error message:

```js
import { nullthrows } from '@kiwicom/js';

function abc() {
  return nullthrows(dataloader.load(1), 'UPS, this is an error!');
}
```

As you can see, it's very similar to `invariant` function. Tip: this function can be also handy in tests where you want to guard against nullable values.
