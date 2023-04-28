---
title: Yarn comments in package.json
tags: ['yarn']
---

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
