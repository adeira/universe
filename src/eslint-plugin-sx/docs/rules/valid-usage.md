# valid-usage

## Rule Details

This rule tries to catch obviously invalid SX usages.

Examples of **incorrect** code for this rule:

```jsx
const styles = sx.create(); // should not be empty ⚠️
const animation = sx.keyframes(); // should not be empty ⚠️
```

```jsx
const styles = sx.create(
  'should be an object, not a string', // ⚠️
);
```

```jsx
const styles = sx.create({
  aaa: 'this should be an object', // ⚠️
});
```

```jsx
const styles = sx.create(
  { aaa: { color: 'red' } },
  'unknown argument', // ⚠️
);
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

There should be no valid reason to turn this rule off.
