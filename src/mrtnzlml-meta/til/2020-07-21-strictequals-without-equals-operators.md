---
title: strictEquals(a, b) without using "==="
tags: ['javascript']
---

> Write a function called `strictEquals(a, b)` that returns the same value as `a === b`. Your implementation must not use the `===` or `!==` operators.

Solution: https://gist.github.com/gaearon/08a85a33e3d08f3f2ca25fb17bd9d638?ck_subscriber_id=920605104

```js
function strictEquals(a, b) {
  if (Object.is(a, b)) {
    // Same value.
    // Is this NaN?
    if (Object.is(a, NaN)) {
      // We already know a and b are the same, so it's enough to check a.
      // Special case #1.
      return false;
    } else {
      // They are equal!
      return true;
    }
  } else {
    // Different value.
    // Are these 0 and -0?
    if ((Object.is(a, 0) && Object.is(b, -0)) || (Object.is(a, -0) && Object.is(b, 0))) {
      // Special case #2.
      return true;
    } else {
      // They are not equal!
      return false;
    }
  }
}
```
