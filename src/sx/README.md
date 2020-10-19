In conventional applications, CSS rules are duplicated throughout the stylesheet and that just means wasted bytes. Instead, SX generates atomic stylesheet every time so that each rule is defined only once. Each rule has its own CSS class and components can pick up multiple classes to get the same effect as with traditional stylesheets. New JS code doesn't need to mean new CSS (size of CSS grows logarithmically).

- [Installation and Usage](#installation-and-usage)
- [Features](#features)
  - [Multiple stylesheets](#multiple-stylesheets)
  - [Pseudo CSS classes and elements](#pseudo-css-classes-and-elements)
  - [`@media` and `@supports`](#media-and-supports)
  - [Precise Flow types](#precise-flow-types)
- [Architecture](#architecture)
- [Prior Art](#prior-art)

## Installation and Usage

First, install the package from NPM:

```text
yarn add @adeira/sx
```

Create a stylesheet and use it to generate `className` props for React:

```jsx
import * as sx from '@adeira/sx';

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

```text
._444sSt { font-size: 2rem; }
._1qVfLL { padding: 0px; }
._3nPNZx { text-decoration: none; }
```

Finally, render somewhere the styles and HTML. Example for Next.js with [custom document](https://nextjs.org/docs/advanced-features/custom-document) would be:

```jsx
import * as sx from '@adeira/sx';
import Document from 'next/document';

export default class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext) {
    return sx.renderPageWithSX(ctx.renderPage);
  }

  // `render` is not needed to change
}
```

## Features

### Multiple stylesheets

The final style depends on the order of `styles` arguments rather than the style definitions.

```jsx
export function ColorfulComponent() {
  return (
    <>
      <div className={styles('red', 'blue')}>I am BLUE</div>
      <div className={styles('blue', 'red')}>I am RED</div>
    </>
  );
}

const styles = sx.create({
  red: { color: 'red' },
  blue: { color: 'blue' },
});
```

### Pseudo CSS classes and elements

```jsx
export function LinkComponent() {
  return <a className={styles('link')}>link</a>;
}

const styles = sx.create({
  link: {
    'textDecoration': 'none',
    ':hover': {
      textDecoration: 'underline',
    },
    '::after': {
      content: '∞',
    },
  },
});
```

### `@media` and `@supports`

```jsx
export function MediaComponent() {
  return <a className={styles('text')}>text</a>;
}

const styles = sx.create({
  text: {
    'fontSize': 16,
    '@media print': {
      fontSize: 12,
    },
    '@media screen': {
      'fontSize': 14,
      ':hover': {
        color: 'pink',
      },
    },
  },
});
```

Media queries can also be nested (see: https://www.w3.org/TR/css3-conditional/#processing):

```jsx
const styles = sx.create({
  text: {
    '@media print': {
      'color': 'red',
      '@media (max-width: 12cm)': {
        color: 'blue',
      },
    },
  },
});
```

The same rules apply to `@supports` at rule (including infinite nesting):

```jsx
const styles = sx.create({
  text: {
    '@supports (display: grid)': {
      display: 'grid',
    },
    '@supports not (display: grid)': {
      float: 'right',
    },
  },
});
```

### Precise Flow types

SX knows about almost every property or rule which exists in CSS and tries to help with mistakes when writing the styles.

```jsx
export function FlowComponent() {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  aaa: {
    unknownProperty: 'red', // Flow error: `unknownProperty` is not a CSS property
    zIndex: '10', // Flow error: should be number (or 'auto') instead
    alignContent: 'unknown', // Flow error: value `unknown` is not alowed for CSS `align-content`
  },
});
```

Sometimes it's hard or even impossible to have sound types for some CSS properties/values though. In such case, we choose the unsound strategy. Typical example of such unsoundness is when it comes to complex media queries - they cannot be statically analyzed. These situations are usually complemented with runtime checks and eventually even Eslint rules.

## Architecture

First, `@adeira/sx` takes all your CSS-in-JS definitions, normalizes it and then fills style buffer and hash registry.

```text
+-------------+   style normalization   +-----------------+
|  CSS-in-JS  | --------+-------------> |  Style buffer   | ---> CSS output
|   styles    |         |               +-----------------+
+-------------+         |
                        |               +-----------------+
                        \-------------> |  Hash registry  | ---> HTML classes
                                        +-----------------+
```

Style buffer contains all the style information which is eventually being printed as an atomic CSS. Hash registry contains all the hashed styles (essentially CSS classes) and prints them into your HTML output.

Internally, these steps are happening:

1. `sx.create` gets stylesheet definition:

   ```json
   {
     "blue": { "color": "blue" },
     "default": { "color": "red", "fontSize": 32 }
   }
   ```

2. it generates atomic CSS from it (this is where style buffer and hash registry starts acting)

   ```text
   .c0 { color: blue }
   .c1 { color: red }
   .c2 { font-size: 2rem }
   ```

3. we transform the original stylesheet using these new atomic classes:

   ```json
   {
     "blue": { "color": "c0" },
     "default": { "color": "c1", "fontSize": "c2" }
   }
   ```

4. now, we reduce the styles to solve specificity issues, there are two example cases:

   1. `styles('default', 'blue')` resolves like so:

      ```json
      { "color": "c0", "fontSize": "c2" }
      ```

   2. `styles('blue', 'default')` resolves to (notice the change in color, overwritten by default - different from how CSS behaves):

      ```json
      { "color": "c1", "fontSize": "c2" }
      ```

5. and finally, we collect the values of the final object and print them as `className`

## Prior Art

_sorted alphabetically_

- https://github.com/4Catalyzer/astroturf
- https://github.com/cssinjs/jss
- https://github.com/johanholmerin/style9
- https://github.com/Khan/aphrodite
- https://github.com/styled-components/styled-components
- https://reactnative.dev/docs/stylesheet
- https://sebastienlorber.com/atomic-css-in-js
- https://twitter.com/wongmjane/status/1187411809667436550
