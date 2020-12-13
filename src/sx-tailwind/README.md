Experimental port of [Tailwind CSS](https://tailwindcss.com/) (version 1.9.6) into [SX](https://github.com/adeira/sx).

## Usage

```js
export default function Button() {
  return (
    <button sxt="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Button
    </button>
  );
}
```

## Demo

[sx-tailwind.adeira.dev](https://sx-tailwind.adeira.dev/)

## Install

```
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
