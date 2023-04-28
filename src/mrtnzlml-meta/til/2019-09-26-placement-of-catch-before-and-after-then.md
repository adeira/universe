---
title: Placement of catch BEFORE and AFTER then
tags: ['javascript']
---

Source: https://stackoverflow.com/questions/42013104/placement-of-catch-before-and-after-then

```js
return p.then(...).catch(...);

// - vs -

return p.catch(...).then(...);
```

There are differences either when p resolves or rejects, but whether those differences matter or not depends upon what the code inside the `.then()` or `.catch()` handlers does.

### What happens when p resolves

In the first scheme, when p resolves, the .then() handler is called. If that .then() handler either returns a value or another promise that eventually resolves, then the .catch() handler is skipped. But, if the .then() handler either throws or returns a promise that eventually rejects, then the .catch() handler will execute for both a reject in the original promise p, but also an error that occurs in the .then() handler.

In the second scheme, when p resolves, the .then() handler is called. If that .then() handler either throws or returns a promise that eventually rejects, then the .catch() handler cannot catch that because it is before it in the chain.

So, that's difference #1. If the .catch() handler is AFTER, then it can also catch errors inside the .then() handler.

### What happens when p rejects

Now, in the first scheme, if the promise p rejects, then the .then() handler is skipped and the .catch() handler will be called as you would expect. What you do in the .catch() handler determines what is returned as the final result. If you just return a value from the .catch() handler or return a promise that eventually resolves, then the promise chain switches to the resolved state because you "handled" the error and returned normally. If you throw or return a rejected promise in the .catch() handler, then the returned promise stays rejected.

In the second scheme, if the promise p rejects, then the .catch() handler is called. If you return a normal value or a promise that eventually resolves from the .catch() handler (thus "handling" the error), then the promise chain switches to the resolved state and the .then() handler after the .catch() will be called.

So that's difference #2. If the .catch() handler is BEFORE, then it can handle the error and allow the .then() handler to still get called.
