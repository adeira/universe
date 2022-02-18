---
title: "Flow: spreads don't preserve read-only-ness"
tags: ['javascript', 'flow']
---

```js
type A = {| +readOnlyKey: string |};
type B = {| ...A, +otherKey: string |};

function test(x: B) {
  x.readOnlyKey = 'overwrite'; // no error ?
  x.otherKey = 'overwrite'; // no error ??
}
```

This applies to value spreads as well since they are creating a new object. It's less understandable for these type spreads where value spread is not involved.
