**🚧 WORK in PROGRESS 🚧**

Basic design system written using [`@adeira/sx`](https://github.com/adeira/sx).

```text
yarn add @adeira/sx-design
```

TKTK

## Styles customization

SX Design uses [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) as a main way of style customization ([CSS Variables: Why Should You Care?](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care)). They are all optional but you can change them as needed. Here are the default values:

```css
:root {
  /* globals: */
  --sx-color-dark: #1c1e21;
  --sx-color-light: #ffffff;

  /* component specific: */
  --sx-kbd-border: 1px solid #b4b4b4;
}
```

https://caniuse.com/css-variables

## Development

To start storybook run:

```text
yarn workspace @adeira/sx-design storybook
```
