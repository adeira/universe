In conventional applications, CSS rules are duplicated throughout the stylesheet and that just means wasted bytes. Instead, SX generates atomic stylesheet every time so that each rule is defined only once. Each rule has its own CSS class and components can pick up multiple classes to get the same effect as with traditional stylesheets. New JS code doesn't need to mean new CSS (size of CSS grows logarithmically).

```text
TODOs and Ideas:
 - media queries (?)
 - autoprefixer via browserlist (https://github.com/robinweser/inline-style-prefixer?)
 - babel transpilation (compile time instead of runtime)
 - support for `marginEnd`, `marginVertical` and so on like in RN (for LRT/RTL layouts)
```

## Installation and Usage

First, install the package from NPM:

```text
yarn add @adeira/sx
```

Create a stylesheet and use it to generate `className` props for React:

```jsx
import * as React from 'react';
import sx from '@adeira/sx';

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

Finally, render somewhere the styles and HTML. Example for Next.js with [custom document](https://nextjs.org/docs/advanced-features/custom-document) would be:

```jsx
import sx from '@adeira/sx';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, css } = sx.renderStatic(renderPage);
    return { ...html, css };
  }

  render(): React.Node {
    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## Features

### Multiple stylesheets

The final style depends on the order of `styles` arguments rather than the style definitions.

```jsx
export function BlueComponent() {
  return <div className={styles('red', 'blue')}>I am BLUE</div>;
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
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
    '::after': {
      content: '∞',
    },
  },
});
```

### Precise Flow types

SX knows about every property which exists in CSS and tries to help with mistakes when writing the styles.

```jsx
export function FlowComponent() {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  aaa: {
    unknownProperty: 'red', // Flow error: `unknownProperty` is not a CSS property
    zIndex: '10', // Flow error: should be number instead
    alignContent: 'unknown', // Flow error: value `unknown` is not alowed for CSS `align-content`
  },
});
```

## Prior Art

- https://twitter.com/wongmjane/status/1187411809667436550
- https://reactnative.dev/docs/stylesheet
- https://github.com/Khan/aphrodite
- https://github.com/johanholmerin/style9
