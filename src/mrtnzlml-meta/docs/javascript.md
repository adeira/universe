---
id: javascript
title: JavaScript
sidebar_label: JavaScript
---

- https://justjavascript.com/
- http://exploringjs.com/es6/
- https://ponyfoo.com/articles/es6
- https://developer.mozilla.org/en-US/docs/Web
- https://github.com/jamiebuilds/itsy-bitsy-data-structures/blob/master/itsy-bitsy-data-structures.js
- https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js
- https://github.com/ehmicky/cross-platform-node-guide, https://shapeshed.com/writing-cross-platform-node/
- https://github.com/leebyron/spec-md/blob/f1392942b69fb7868baf64129f615f97739d9058/static/linkSelections.js
- [Computing average in a constant time](https://stackoverflow.com/a/22999488/3135248) (average streaming)
- [connect.js explained](https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e)
- [slim-redux.js](https://gist.github.com/gaearon/ffd88b0e4f00b22c3159)
- https://github.com/gaearon/suspense-experimental-github-demo
- https://github.com/relayjs/relay-examples/blob/4fe8cbf44e03d50972b1ff4da4b9c205e0525d47/issue-tracker/src/JSResource.js

## V8 Built-in functions

- https://v8.dev/docs/builtin-functions
- https://github.com/v8/v8/blob/master/src/runtime/runtime.h
- https://v8.dev/docs/memory-leaks

```js
function foo() {
  const x = { bar: 'bar' };
  %DebugTrackRetainingPath(x);
  return () => {
    return x;
  };
}
const closure = foo();
gc();
```

vvv

```text
💃 universe [master] node --allow-natives-syntax --track-retaining-path --expose-gc src/test.js

#################################################
Retaining path for 0x33a90e9bcb89:

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Distance from root 3: 0x33a90e9bcb89 <Object map = 0x33a9d65bbf09>

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Distance from root 2: 0x33a90e9bcb51 <FunctionContext[5]>

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Distance from root 1: 0x33a90e9bcc09 <JSFunction (sfi = 0x33a99d8d7a89)>

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Root: (Isolate)
-------------------------------------------------
```

## Yarn comments in `package.json`

```json
{
  "private": true,
  "devDependencies": {
    "//": [
      "Please note: `react` dependency here is necessary in order to solve hoisting issues",
      "with React Native (Expo) and their locked React version. Yarn hoisted wrong version.",
      "It can eventually be removed (try Relay and RN-Expo examples to verify it works)."
    ],
    "flow-bin": "^0.95.1",
    "react": "^16.8.6"
  }
}
```

https://github.com/yarnpkg/yarn/pull/3829/files (also great example of `test.concurrent` usage ^^)
