In conventional applications, CSS rules are duplicated throughout the stylesheet and that just means wasted bytes. Instead, SX generates atomic stylesheet every time so that each rule is defined only once. Each rule has its own CSS class and components can pick up multiple classes to get the same effect as with traditional stylesheets. New JS code doesn't need to mean new CSS (size of CSS grows logarithmically).

- [Installation and Usage](#installation-and-usage)
- [Features](#features)
  - [Multiple stylesheets precedence](#multiple-stylesheets-precedence)
  - [Pseudo CSS classes and elements](#pseudo-css-classes-and-elements)
  - [`@media` and `@supports`](#media-and-supports)
  - [Keyframes](#keyframes)
  - [Precise Flow types](#precise-flow-types)
- [Production usage considerations](#production-usage-considerations)
- [Server-side rendering](#server-side-rendering)
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
  // className={styles('example')}
  //   ↓ ↓ ↓
  // class="_1DKsqE v2kHO stDQH"
  return <div className={styles('example')}>example</div>;
}

const styles = sx.create({
  example: {
    fontSize: 32, // converted to PX units
    textDecoration: 'none',
    backgroundColor: 'var(--main-bg-color)', // CSS variables are supported as well
  },
});
```

That's it. The example above will generate atomic CSS like this:

```text
._1DKsqE { font-size: 32px; }
.v2kHO { text-decoration: none; }
.stDQH { background-color: var(--main-bg-color); }
```

It's highly recommended enabling [server-side rendered styles](#server-side-rendering) for production use (see below).

## Features

### Multiple stylesheets precedence

The final style depends on the order of `styles` arguments rather than the style definitions as it's usual in plain CSS:

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

This makes it very predictable and easy to use. Always call `className={styles('red', 'blue')}` instead of `` className={`${styles('red')} ${styles('blue')}`} ``! This is very important because the first call guarantees to resolve the CSS precedence correctly as opposed to the second call which does not and might behave unpredictably.

It works similarly for shorthand CSS properties (however, try to avoid them - see below):

```jsx
export function ButtonsComponent() {
  return (
    <>
      <button className={styles('button', 'primary')}>WITH margin top 10px</button>
      <button className={styles('primary', 'button')}>WITHOUT margin top</button>
    </>
  );
}

const styles = sx.create({
  primary: { marginTop: '10px' },
  button: { margin: 0 },
});
```

It's better to avoid shorthand CSS properties in SX because it yields larger output. Using explicit properties like `background-color`, `margin-top` and similar will result in a smaller output since we can leverage browser defaults better. It's because all shorthand properties need to be expanded into their initial values (which is normally job of a web browser). Without expanding them, we could not resolve cases like this one:

```js
const styles = sx.create({
  bgBlue: { background: 'blue' },
  bgNone: { background: 'none' },
});

<div className={styles('bgBlue', 'bgNone')}>I am blue or without background?</div>;
```

The `div` should not have a color. We achieve this effect by expanding the `background` property and merging it together with the other `background shorthand. The resulting style would be:

```text
background-image: none
background-position: 0% 0%
background-size: auto auto
background-repeat: repeat
background-origin: padding-box
background-clip: border-box
background-attachment: scroll
background-color: transparent
```

Changing the styles order would result in a blue `div` (this is different from how CSS normally works but it's more obvious in CSS-in-JS context):

```js
<div className={styles('bgNone', 'bgBlue')}>I am BLUE!</div>
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
      content: '"∞"',
    },
  },
});
```

Note that if you want to add some styling of the same property with different pseudo classes, there might be some specificity issues. Say you want to do this:

```js
const styles = sx.create({
  button: {
    ':hover': {
      color: 'pink',
    },
    ':active': {
      color: 'blue',
    },
  },
});
```

These 2 rules will have the same specificity, and the one defined last in the stylesheet will win. It may or may not help to change order in this style, because the class could be created by a different rule. What will help is to raise the specificity of the active class. You can do this:

```js
const styles = sx.create({
  button: {
    ':hover': {
      color: 'pink',
    },
    ':active:hover': {
      color: 'blue',
    },
  },
});
```

The `:active:hover` now has higher specificity than `:hover` and the result will be what you expected.

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

### Keyframes

SX also has support for keyframes, it exports a function that generates an animation name from the input you give it. You can use it like this:

```jsx
export function AnimatedComponent() {
  return <div className={styles('text')}>text</div>;
}

const fadeIn = sx.keyframes({
  '0%': {
    opacity: 0,
  },
  '50%, 55%': {
    opacity: 0.3,
  },
  '100%': {
    opacity: 1,
  },
});

const styles = sx.create({
  text: {
    animationName: fadeIn,
    animationDuration: '2s',
  },
});
```

It also supports `from` and `to` for simpler animations.

```js
const simple = sx.keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });
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

Sometimes it's hard or even impossible to have sound types for some CSS properties/values though. In such case, we choose the unsound strategy. Typical example of such unsoundness is when it comes to complex media queries or CSS variables - they cannot be statically analyzed. These situations are usually complemented with runtime checks and eventually even Eslint rules.

## Production usage considerations

1. SX does not include any CSS reset or CSS normalization. It's because we couldn't decide which strategy would be the best. We concluded that each user should choose their own strategy (either reset, normalizer or nothing) alongside SX.
1. _TKTK (Babel transpilation)_

## Server-side rendering

_This is an optional part, `@adeira/sx` will work even without it. However, it's highly recommended._

Example for Next.js with [custom document](https://nextjs.org/docs/advanced-features/custom-document):

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

This simple code should create a `style` tag in your HTML header with all the CSS styles geenrated by SX.

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
   .c2 { font-size: 32px }
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
- https://github.com/necolas/react-native-web
- https://github.com/styled-components/styled-components
- https://reactnative.dev/docs/stylesheet
- https://sebastienlorber.com/atomic-css-in-js
- https://twitter.com/wongmjane/status/1187411809667436550
