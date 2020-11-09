# eslint-plugin-sx

Eslint rules for [@adeira/sx](https://www.npmjs.com/package/@adeira/sx)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-sx`:

```
$ npm install eslint-plugin-sx --save-dev
```

## Usage

Add `sx` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["sx"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "sx/no-unused-stylesheet": 2
  }
}
```

## Supported Rules

- [no-unused-stylesheet](docs/rules/no-unused-stylesheet.md)
- TODO
