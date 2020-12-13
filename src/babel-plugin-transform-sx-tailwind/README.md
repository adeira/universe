Transformation of [SX Tailwind](https://github.com/adeira/universe/tree/master/src/sx-tailwind) helpers into direct [SX](https://github.com/adeira/universe/tree/master/src/sx) calls.

This has a positive impact on the final bundle size because the huge Tailwind definitions file can be omitted.

## How does it work

```diff
import React from 'react';
+ import sx from '@adeira/sx';

export default function Example() {
  return (
    <button
-      sxt="bg-blue-500 text-white font-bold"
+      className={__styles('bg-blue-500', 'text-white', 'font-bold')}
      type="button"
    >
      Button
    </button>
  );
}

+ const __styles = sx.create({
+   'bg-blue-500': {
+     backgroundColor: '#4299e1',
+   },
+   'text-white': {
+     color: '#fff',
+   },
+   'font-bold': {
+     fontWeight: 700,
+   },
+ });
```

## Install

```
yarn add --dev @adeira/babel-plugin-transform-sx-tailwind
```

Register in your Babel config (e.g. `.babelrc`):

```
{
  "plugins": ["@adeira/babel-plugin-transform-sx-tailwind"]
}
```
