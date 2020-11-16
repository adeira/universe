# no-unused-stylesheet

## Rule Details

This rule aims to find unused SX stylesheet definitions.

Examples of **incorrect** code for this rule:

```jsx
import sx from '@adeira/sx';

export default function MyComponent() {
  return null;
}

// Unused ⚠️
const styles = sx.create({
  aaa: { color: 'red' },
});
```

```jsx
import sx from '@adeira/sx';

export default function MyComponent() {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  aaa: { color: 'red' },
  bbb: { color: 'blue' }, // Unused ⚠️
  ccc: { color: 'green' }, // Unused ⚠️
});
```

Examples of **correct** code for this rule:

```jsx
import sx from '@adeira/sx';

export default function MyComponent() {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  aaa: { color: 'red' },
});
```

### Options

_none_

## When Not To Use It

There should be no valid reason to turn this rule off. It helps with a dead code elimination.
