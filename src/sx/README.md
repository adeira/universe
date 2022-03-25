In conventional applications, CSS rules are duplicated throughout the stylesheet and that just means wasted bytes. Instead, SX generates atomic stylesheet every time so that each rule is defined only once. Each rule has its own CSS class and components can pick up multiple classes to get the same effect as with traditional stylesheets. New JS code doesn't need to mean new CSS (size of CSS grows logarithmically).

- [Installation and Usage](#installation-and-usage)
- [SX Ecosystem](#sx-ecosystem)
- [Features](#features)
  - [Multiple stylesheets precedence](#multiple-stylesheets-precedence)
  - [Pseudo CSS classes and elements](#pseudo-css-classes-and-elements)
  - [`@media` and `@supports`](#media-and-supports)
  - [Keyframes](#keyframes)
  - [Composability and customizability](#composability-and-customizability)
  - [Conditional styling](#conditional-styling)
  - [Precise Flow types](#precise-flow-types)
  - [Automatic vendor prefixes](#automatic-vendor-prefixes)
- [Server-side rendering](#server-side-rendering)
- [Architecture](#architecture)
- [Prior Art](#prior-art)

## Installation and Usage

First, install the package from NPM:

```text
yarn add @adeira/sx
```

It's highly recommended (but optional) to use related [eslint-plugin-sx](https://github.com/adeira/eslint-plugin-sx) as well:

```text
yarn add --dev eslint-plugin-sx
```

Create a stylesheet and use it to generate `className` props for React:

```jsx
import sx from '@adeira/sx';

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

```css
._1DKsqE {
  font-size: 32px;
}
.v2kHO {
  text-decoration: none;
}
.stDQH {
  background-color: var(--main-bg-color);
}
```

It's highly recommended enabling [server-side rendered styles](#server-side-rendering) for production use (see below).

## SX Ecosystem

SX itself is just a core of the atomic CSS for JS. There are other projects helping with writing the SX code or building on top of it (sorted alphabetically):

- [SX Design](https://github.com/adeira/sx-design) - inclusive design system based on SX
- [SX Eslint](https://github.com/adeira/eslint-plugin-sx) - Eslint rules for SX
- [SX Jest Snapshot Serializer](https://github.com/adeira/sx-jest-snapshot-serializer) - Jest serializer for SX (WIP 🚧)
- [SX Tailwind](https://github.com/adeira/sx-tailwind) - SX port of Tailwind CSS, see: [https://sx-tailwind-website.vercel.app/](https://sx-tailwind-website.vercel.app/)

_Missing something? Let us know!_

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
  '0%': { opacity: 0 },
  '50%, 55%': { opacity: 0.3 },
  '100%': { opacity: 1 },
});

const styles = sx.create({
  text: {
    // See: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
    animationName: fadeIn,
    animationDuration: '2s',
    animationFillMode: 'none',
    animationTimingFunction: 'ease',
  },
});
```

It also supports `from` and `to` for simpler animations.

```js
const simple = sx.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});
```

### Composability and customizability

SX supports composability with external styles. Have a look at this base component example (uses [Flow](https://github.com/facebook/flow) types):

```js
import sx, { type AllCSSProperties } from '@adeira/sx';

type Props = {
  +xstyle?: AllCSSProperties,
};

const styles = sx.create({ default: { fontSize: 16 } });

function MyBaseComponent(props: Props) {
  return <div className={sx(styles.default, props.xstyle)} />;
}
```

Now, let's say we are building a design library and we want to affect the base styles externally. Here is how would our customized (wrapper) component look like:

```js
const styles = sx.create({ spacing: { marginTop: 4 } });

function MyCustomComponent() {
  return <MyBaseComponent xstyle={styles.spacing} />;
}
```

Always prefer this style of customization instead of concatenating or prop-drilling external CSS classes in your components. You can merge as many stylesheets as you want with `sx(…)` function.

### Conditional styling

Sometimes it's necessary to apply styles conditionally. For example, changing button styles when the button should be disabled. Or different styles for active links in your menu. There are 2 way how to do it in SX:

1. inline conditions

```js
const styles = sx.create({
  button: { margin: 4 },
  disabled: { opacity: 0.5 },
});

function MyConditionalComponent({ isDisabled }) {
  return (
    <>
      <button style={styles('button', isDisabled && 'disabled')} />
      <button style={styles('button', isDisabled ? 'disabled' : null)} />
    </>
  );
}
```

2. object conditions

```js
// same styles as above

function MyConditionalComponent({ isDisabled }) {
  return <button style={styles({ button: true, disabled: isDisabled })} />;
}
```

Both styles are equivalent, and it's up to you which one do you choose (they cannot be combined). The resulting style would be `margin` + conditional `opacity`.

### Precise Flow types

SX knows about almost every property or rule which exists in CSS and tries to help with mistakes when writing the styles.

```jsx
export function FlowComponent() {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  aaa: {
    zIndex: '10', // Flow error: should be number (or 'auto') instead
    alignContent: 'unknown', // Flow error: value `unknown` is not alowed for CSS `align-content`
  },
});
```

Sometimes it's hard or even impossible to have sound types for some CSS properties/values though. In such case, we choose the unsound strategy. Typical example of such unsoundness is when it comes to complex media queries or CSS variables - they cannot be statically analyzed. These situations are usually complemented with runtime checks and/or [Eslint rules](https://github.com/adeira/eslint-plugin-sx).

### Automatic vendor prefixes

Vendor prefixes are automatically added whenever needed.

```js
const styles = sx.create({
  title: {
    backgroundClip: 'text',
  },
});
```

The example above will generate CSS like this:

```css
._2D4soO {
  -webkit-background-clip: text;
  background-clip: text;
}
```

## Server-side rendering

_This is an optional part and `@adeira/sx` will work even without it. However, it's highly recommended._

Example for Next.js with [custom document](https://nextjs.org/docs/advanced-features/custom-document):

```jsx
import sx from '@adeira/sx';
import Document from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = await renderPage();
    return { ...page, styles: [sx.getStyleTag()] };
  }

  // `render` is not needed to change
}
```

This simple code should create a `style` tag in your HTML header with all the CSS styles generated by SX.

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

   ```css
   .c0 {
     color: blue;
   }
   .c1 {
     color: red;
   }
   .c2 {
     font-size: 32px;
   }
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
- https://youtu.be/9JZHodNR184
