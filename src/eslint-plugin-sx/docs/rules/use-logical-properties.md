# use-logical-properties

## Rule Details

This rule aims to suggest logical CSS properties instead of physical CSS properties to improve support of other layouts (LTR/RTL, …).

Examples of **incorrect** code for this rule:

```jsx
const styles = sx.create({
  incorrectBorder: {
    borderBottom: 'solid',
  },
});
```

Examples of **correct** code for this rule:

```jsx
const styles = sx.create({
  correctBorder: {
    borderBlockEnd: 'solid',
  },
});
```

### Options

_none_

## When Not To Use It

Do not use this rule if you don't want to support RTL (and other) layouts or when you are concerned about supporting older browsers.
