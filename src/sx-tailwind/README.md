Experimental port of [Tailwind CSS](https://tailwindcss.com/) (version 1.8.7) into [SX](https://github.com/adeira/sx).

## Usage

```js
import { sxt } from '@adeira/sx-tailwind';

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

Faster copy&paste from Tailwind examples can be done with `tailwind` helper. The downside is you don't get a type check here, only warnings in the console during development mode when the invalid class name is used.

```js
import { tailwind } from '@adeira/sx-tailwind';

export default function Button() {
  return (
    <button
      className={tailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')}
    >
      Button
    </button>;
```

## Demo

[sx-tailwind.adeira.dev](https://sx-tailwind.adeira.dev/)

## Install

```
yarn add @adeira/sx-tailwind
yarn add --dev @adeira/babel-plugin-transform-sx-tailwind
```

Register the plugin in your Babel config (e.g. `.babelrc`):

```
{
  "plugins": ["@adeira/babel-plugin-transform-sx-tailwind"]
}
```

## Develop

Generate stylesheets and types:

```
yarn generate
```
