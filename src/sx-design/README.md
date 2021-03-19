**🚧 WORK in PROGRESS 🚧**

[![Crowdin](https://badges.crowdin.net/sx-design/localized.svg)](https://crowdin.com/project/sx-design)

Basic design system written using [`@adeira/sx`](https://github.com/adeira/sx). Core value of this project are (in this order):

- exclusively using atomic CSS via [`@adeira/sx`](https://github.com/adeira/sx)
- fully supported localization
- dark mode out of the box
- accessible components

# Installation and Usage

Using SX Design is as simple as installing the package via NPM or Yarn and importing the right component from `@adeira/sx-design`.

```bash
yarn add @adeira/sx-design
```

SX Design is fully localized and requires information about the current application locale. This typically changes with every user, so it's necessary pro provide it via `SxDesignProvider` React component (before the first SX Design component in the React tree):

```js
import { ErrorBoundary, SxDesignProvider } from '@adeira/sx-design';

export default function MyRootApp() {
  return (
    <SxDesignProvider
      locale={
        'en-US' // affects translations as well as dates, monetary values and similar
      }
      darkMode={true}
    >
      <ErrorBoundary>{/* … */}</ErrorBoundary>
    </SxDesignProvider>
  );
}
```

The error boundary is optional but highly recommended.

## Styles customization

SX Design leverages full power of [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) as a main way of style customization. You can optionally adjust the values if you want from your application. Here are some component specific default values (not dependent on dark mode):

<!-- TODO: generate automatically from the source code? -->

```text
--sx-kbd-border: '1px solid #b4b4b4'
--sx-money-text-color: var(--sx-text-color) ¹
--sx-skipLink-background-color: '28, 30, 33' ²
--sx-skipLink-text-color: '255, 255, 255'
```

Generic default values for light mode:

```text
--sx-background-color: '255, 255, 255' ²
--sx-text-color: '28, 30, 33'
```

And finally generic default values for dark mode:

```text
--sx-background-color: '51, 51, 51' ²
--sx-text-color: '255, 255, 255'
```

¹ Some CSS variables fallback to default value of some other CSS variable. This allows you to overwrite very specific value if you want or just leave it to the common default.

² All colors are written as triplets of values from 0 to 255 and passed to RGBA function likes so: `rgba(--var)`. This allows us to optionally specify an alpha channel when needed: `rgba(--var, 0.5)`.

## Available components

**🚧 WORK in PROGRESS 🚧**

Legend:

```text
✅  yes! (or not relevant)
🧐  not evaluated/ready yet
```

| Component           | Localized? | Dark mode? | Has stories? | Tested? |
| ------------------- | :--------: | :--------: | :----------: | :-----: |
| `<ErrorBoundary />` |     ✅     |     ✅     |      🧐      |   ✅    |
| `<Heading />`       |     ✅     |     🧐     |      🧐      |   ✅    |
| `<Kbd />`           |     ✅     |     ✅     |      ✅      |   ✅    |
| `<Money />`         |     ✅     |     ✅     |      🧐      |   ✅    |
| `<ProductCard />`   |     ✅     |     ✅     |      ✅      |   🧐    |
| `<Section />`       |     ✅     |     🧐     |      🧐      |   🧐    |
| `<Skeleton />`      |     ✅     |     🧐     |      ✅      |   🧐    |
| `<SkipLink />`      |     ✅     |     🧐     |      🧐      |   🧐    |

Note: stories should be somehow useful to mark them as being done.

## Development

To start storybook run:

```bash
yarn workspace @adeira/sx-design storybook
```

Please, make sure that any changes still follow the core values of this project and the matrix of available components was updated accordingly.
