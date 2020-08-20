In conventional applications, CSS rules are duplicated throughout the stylesheet and that just means wasted bytes. Instead, SX generates atomic stylesheet every time so that each rule is defined only once. Each rule has own CSS class and components can pick up multiple classes to get the same effect as with traditional stylesheets. New JS code doesn't need to mean new CSS (size of CSS grows logarithmically).

## TODOs and Ideas

- pseudo CSS elements (https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
- styles precedence - we must merge/overwrite identical properties with different values (https://youtu.be/9JZHodNR184?t=334)
- media queries
- autoprefixer via browserlist
- babel transpilation (compile time instead of runtime)
- support for `marginEnd`, `marginVertical` and so on like in RN (for LRT/RTL layouts)

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

## Features

### Multiple stylesheets

The final style depend on the order of `classNames` rather than the styles definition.

```jsx
export function ExampleComponent() {
  return <div className={styles('red', 'blue')} />;
}

const styles = sx.create({
  red: { color: 'red' },
  blue: { color: 'blue' },
});
```

### Pseudo CSS classes

TKTK

```jsx
export function ExampleComponent() {
  return <a className={styles('link', 'linkHover')}>link</a>;
}

const styles = sx.create({
  link: {
    textDecoration: 'none',
  },
  linkHover: sx.pseudo({
    hover: {
      textDecoration: 'underline',
    },
  }),
});
```

### Precise Flow types

```jsx
export function ExampleComponent() {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  aaa: {
    unknownProperty: 'red', // <<< this CSS property is incorrect
  },
});
```

```text
Cannot call create with object literal bound to sheetDefinitions because property unknownProperty is missing in
AllCSSPropertyTypes [1] but exists in object literal [2] in property aaa. [prop-missing]
```

## Prior Art

- https://twitter.com/wongmjane/status/1187411809667436550
- https://reactnative.dev/docs/stylesheet
- https://github.com/Khan/aphrodite
- https://github.com/johanholmerin/style9
