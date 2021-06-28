# eslint-plugin-sx

Eslint rules for [@adeira/sx](https://www.npmjs.com/package/@adeira/sx)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
yarn add --dev eslint
```

Next, install `eslint-plugin-sx`:

```
yarn add --dev eslint-plugin-sx
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
    "sx/no-concatenated-classes": 2,
    "sx/no-unused-stylesheet": 2,
    "sx/use-logical-properties": 2,
    "sx/valid-usage": 2
  }
}
```

## Supported Rules

- [no-concatenated-classes](docs/rules/no-concatenated-classes.md)
- [no-unused-stylesheet](docs/rules/no-unused-stylesheet.md)
- [use-logical-properties](docs/rules/use-logical-properties.md)
- [valid-usage](docs/rules/valid-usage.md)
- ...
