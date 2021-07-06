This is a port of awesome [**System UIcons**](https://systemuicons.com/) to be used directly in React. How does it work? We take _all_ available System UIcons, optimize them and automatically convert them from SVG to React components so they can be used directly in React.

## Installation and Usage

```text
yarn add @adeira/icons
```

Usage:

```js
import Icon from '@adeira/icons';

function MyComponent() {
  return (
    <Icon
      name="question_circle" // Flow types available so it's hard to make a mistake here
    />
  );
}
```

All these icons are automatically adjusting to the surrounding font size and color.

## Lazy-loading considerations

There are many icons available and it would not be a good idea to bundle them all together. For this reason we are internally using [`React.lazy`](https://reactjs.org/docs/code-splitting.html#reactlazy). Support for lazy-loading can be enabled via [`@adeira/babel-preset-adeira`](https://github.com/adeira/babel-preset-adeira) like so:

```js
module.exports = {
  presets: [
    [
      '@adeira/babel-preset-adeira',
      {
        target: 'js-esm', // To support dynamic `import(…)` for `@adeira/icons`.
      },
    ],
  ],
};
```

Make sure to verify that the icons are actually being lazy-loaded via network.
