---
title: How to use __DEV__ constant in ReScript
tags: ['rescript']
---

Global constant `__DEV__` is not part of the ReScript language, but you can use it via `%external`. It is a common pattern that allows you to easily distinguish dev and prod environments. I started using it in my projects [as well](https://github.com/adeira/universe/tree/e769861df645885f9c646416a4855ce944a3839c/src/babel-preset-adeira#__dev__-expression).

```reason
switch %external(__DEV__) {
| Some(_) => Js.log("dev mode")
| None => Js.log("production mode")
}
```

The code above translates to something like this:

```js
var match$1 = typeof __DEV__ === 'undefined' ? undefined : __DEV__;
if (match$1 !== undefined) {
  console.log('dev mode');
} else {
  console.log('production mode');
}
```

Obviously, this code still needs some kind of transpilation (since `__DEV__` doesn't exist in JS either).
