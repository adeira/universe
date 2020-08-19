TKTK (what is it)

## TODOs

- CSS pseudo classes
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
  return <div className={sx(styles.example)}>example</div>;
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
