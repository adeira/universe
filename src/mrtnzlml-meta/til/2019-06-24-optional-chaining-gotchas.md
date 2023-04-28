---
title: Optional chaining gotchas
tags: ['javascript']
---

Optional chaining != error suppression operator.

```js
(function () {
  'use strict';
  undeclared_var?.b; // ReferenceError: undeclared_var is not defined
  arguments?.callee; // TypeError: 'callee' may not be accessed in strict mode
  arguments.callee?.(); // TypeError: 'callee' may not be accessed in strict mode
  true?.(); // TypeError: true is not a function
})();
```

- https://v8.dev/features/optional-chaining
- https://github.com/tc39/proposal-optional-chaining/commit/87e408d375bd749b21d70e65bd0cbbf57d9bcf82
