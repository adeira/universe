---
title: V8 Built-in functions
tags: ['javascript']
---

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
