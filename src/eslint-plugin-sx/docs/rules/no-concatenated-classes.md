# no-concatenated-classes

## Rule Details

This rule aims to find incorrect usage of template strings inside `className`.

Examples of **incorrect** code for this rule:

```jsx
import { create } from '@adeira/sx';

export default function MyComponent() {
  // Should be:
  //
  //   className={styles('aaa', 'bbb')}
  //
  //   - or -
  //
  //   className={styles('bbb', 'aaa')}
  return <div className={`${styles('aaa')} ${styles('bbb')}`} />;
}

const styles = create({
  aaa: { color: 'red' },
  bbb: { color: 'blue' },
});
```

Examples of **correct** code for this rule:

```jsx
import { create } from '@adeira/sx';

export default function MyComponent() {
  return <div className={styles('aaa', 'bbb')} />;
}

const styles = create({
  aaa: { color: 'red' },
  bbb: { color: 'blue' },
});
```

### Options

_none_

## When Not To Use It

TKTK
