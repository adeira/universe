Experimental port of [Tailwind CSS](https://tailwindcss.com/) (version 1.8.7) into [SX](https://github.com/adeira/sx).

> Not ready for production yet!

## Usage

```js
import { sxt } from '@adeira/sxTailwind';

export default function Button() {
  return (
    <button
      className={sxt(
        'bg-blue-500',
        'hover:bg-blue-700',
        'text-white',
        'font-bold',
        'py-2',
        'px-4',
        'rounded',
      )}
    >
      Button
    </button>;
```

## Develop

Generate stylesheets and helper files:

```
yarn monorepo-babel-node src/generate.js
```
