---
id: exhaustive-checking
title: Exhaustive checking with empty type
sidebar_label: Exhaustive checking
---

[flow.org/try](https://flow.org/try/#0C4TwDgpgBAwghgZwgqBeKByAghqAfTAIQwG4AoMgMwFcA7AY2AEsB7WqCADwAs5qFgACk4AuWImQBKKAG8yUKE0pRhaVOmwZpchQoD0eqABMWUAdUqV5UAL4cANkkXLV6jcW3X9hk8aWUIACcIWmAzYAsrBTsIR2gdXQMoNnsQKGBA6mglKAB3aF5aI3sIIyg4e3soegkELxVRDgBbMFBJcmiyGzIgA)

```js
type Cases = 'A' | 'B';

function exhaust(x: Cases) {
  if (x === 'A') {
    // do stuff
  } else if (x === 'B') {
    // do different stuff
  } else {
    // highlight-start
    // only true if we handled all cases
    (x: empty);
    // highlight-end
  }
}
```

What happens when you add new case `'C'`? You will get this error:

```text
Cannot cast x to empty because string literal C [1] is incompatible with empty [2].

 [1]  5│ function exhaust(x: Cases) {
      6│   if (x === 'A') {
      7│     // do stuff
      8│   } else if (x === 'B') {
      9│     // do different stuff
     10│   } else {
     11│     // only true if we handled all cases
 [2] 12│     (x: empty);
     13│   }
     14│ }
     15│
```

You can be sure that you covered all the cases this way. Another real-life example:

```js
export function exhaustB(reason: 'magicLink' | 'signUpConfirmation' | 'resetPassword') {
  switch (reason) {
    case 'magicLink':
      return __('account.check_email_magic_link');
    case 'signUpConfirmation':
      return __('account.check_email_sign_up');
    case 'resetPassword':
      return __('account.you_will_recieve_password');
    default:
      // highlight-next-line
      return invariant(false, 'Unsupported reason: %j', (reason: empty));
  }
}
```

Notice how is the `empty` type used at the same time with `reason`.

- https://github.com/facebook/flow/commit/c603505583993aa953904005f91c350f4b65d6bd
- https://medium.com/@ibosz/advance-flow-type-1-exhaustive-checking-with-empty-type-a02e503cd3a0
- https://github.com/facebook/flow/pull/7655/files
