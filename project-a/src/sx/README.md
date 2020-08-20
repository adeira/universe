In conventional applications, CSS rules are duplicated throughout the stylesheet and that just means wasted bytes. Instead, SX generates atomic stylesheet every time so that each rule is defined only once. Each rule has own CSS class and components can pick up multiple classes to get the same effect as with traditional stylesheets. New JS code doesn't need to mean new CSS (size of CSS grows logarithmically).

## TODOs

- multiple styles as an input (`styles('red', 'blue')`), TODO: test the ordering (https://youtu.be/9JZHodNR184?t=334)
- CSS pseudo classes (https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
- media queries
- autoprefixer via browserlist
- babel transpilation (long in the future)

## Motivation

TKTK (logarithmic style size growth, FB)

## Installation and Usage

TKTK

```jsx
import * as React from 'react';
import sx from './sx'; // TODO

export default function Example() {
  return <div className={styles('example')}>example</div>;
}

const styles = sx.create({
  example: {
    fontSize: 32, // converted to REM units (fonts only)
    padding: 0, // converted to PX units
    textDecoration: 'none',
  },
});
```

The example above will generate something like this:

```css
._444sSt {
  font-size: 2rem;
}
._1qVfLL {
  padding: 0px;
}
._3nPNZx {
  text-decoration: none;
}
```

TKTK: SSR stylesheet print

## Prior Art

- https://twitter.com/wongmjane/status/1187411809667436550
- https://reactnative.dev/docs/stylesheet
- https://github.com/Khan/aphrodite
- https://github.com/johanholmerin/style9
