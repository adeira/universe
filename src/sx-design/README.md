**🚧 WORK in PROGRESS 🚧**

[![Crowdin](https://badges.crowdin.net/sx-design/localized.svg)](https://crowdin.com/project/sx-design)

Inclusive design system written using [`@adeira/sx`](https://github.com/adeira/sx). Core value of this project are (in this order):

- ⚛️ exclusively using atomic CSS via [`@adeira/sx`](https://github.com/adeira/sx)
- 🏳️‍🌈 fully supported localization ([🇺🇸🇲🇽🇨🇿🇳🇴🇺🇦🇷🇺](https://crowdin.com/project/sx-design))
- ☯️ light and dark theme out of the box
- 🆘 accessible components for people with visual impairment
- حلال support for RTL layouts

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
      locale="en-US" // affects translations as well as dates, monetary values and similar
      theme="light" // or "dark" or "system"
      direction="ltr" // or "rtl"
    >
      <ErrorBoundary>{/* … */}</ErrorBoundary>
    </SxDesignProvider>
  );
}
```

The error boundary is optional but highly recommended.

# Styles customization

SX Design leverages full power of [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) as a main way of style customization. You can optionally adjust the values if you want from your application. Here are some component specific default values and colors (not dependent on dark mode):

<!-- TODO: generate automatically from the source code? -->

```text
--sx-kbd-border: 1px solid #b4b4b4
--sx-money-text-color: var(--sx-foreground) ¹

--sx-error-lighter: 247, 212, 214 ²
--sx-error-light: 255, 26, 26
--sx-error: 238, 0, 0
--sx-error-dark: 197, 0, 0

--sx-success-lighter: 211, 229, 255
--sx-success-light: 50, 145, 255
--sx-success: 0, 112, 243
--sx-success-dark: 7, 97, 209

--sx-warning-lighter: 255, 239, 207
--sx-warning-light: 247, 185, 85
--sx-warning: 245, 166, 35
--sx-warning-dark: 171, 87, 10
```

Generic default values for light mode:

```text
--sx-background: 255, 255, 255 ²
--sx-accent-1: 227, 227, 227
--sx-accent-2: 198, 199, 200
--sx-accent-3: 170, 171, 172
--sx-accent-4: 142, 143, 144
--sx-accent-5: 113, 114, 116
--sx-accent-6: 85, 86, 89
--sx-accent-7: 56, 58, 61
--sx-foreground: 28, 30, 33
--sx-text-link-color: 3, 102, 214
```

And finally generic default values for dark mode:

```text
--sx-background: 51, 51, 51 ²
--sx-accent-1: 77, 77, 77
--sx-accent-2: 102, 102, 102
--sx-accent-3: 128, 128, 128
--sx-accent-4: 153, 153, 153
--sx-accent-5: 179, 179, 179
--sx-accent-6: 204, 204, 204
--sx-accent-7: 230, 230, 230
--sx-foreground: 255, 255, 255
--sx-text-link-color: 88, 166, 255
```

¹ Some CSS variables fallback to default value of some other CSS variable. This allows you to overwrite very specific value if you want or just leave it to the common default.

² All colors are written as triplets of values from 0 to 255 and passed to RGBA function likes so: `rgba(--var)`. This allows us to optionally specify an alpha channel when needed: `rgba(--var, 0.5)`.

You can access the dark mode even programmatically via `useSxDesignContext` hook:

```js
export default function MyComponent() {
  // `theme` can be "light", "dark" or "system"
  const { theme } = useSxDesignContext();
}
```

# Available components

**🚧 WORK in PROGRESS 🚧**

Legend:

```text
✅  yes! (or not relevant)
🧐  not evaluated/ready yet
```

| Component             | Localized?¹ | Dark mode?² | Has stories?³ | Tested?⁴ | RTL?⁵ |
| --------------------- | :---------: | :---------: | :-----------: | :------: | :---: |
| [`<Badge />`]         |     ✅      |     ✅      |      ✅       |    🧐    |  🧐   |
| [`<Button />`]        |     ✅      |     ✅      |      ✅       |    🧐    |  🧐   |
| [`<ButtonLink />`]    |     ✅      |     ✅      |      ✅       |    🧐    |  🧐   |
| [`<Emoji />`]         |     ✅      |     ✅      |      ✅       |    🧐    |  ✅   |
| [`<ErrorBoundary />`] |     ✅      |     ✅      |      🧐       |    ✅    |  🧐   |
| [`<Heading />`]       |     ✅      |     ✅      |      ✅       |    ✅    |  🧐   |
| [`<Kbd />`]           |     ✅      |     ✅      |      ✅       |    ✅    |  🧐   |
| [`<Link />`]          |     ✅      |     ✅      |      ✅       |    ✅    |  🧐   |
| [`<LinkButton />`]    |     ✅      |     ✅      |      ✅       |    🧐    |  🧐   |
| [`<Money />`]         |     ✅      |     ✅      |      🧐       |    ✅    |  🧐   |
| [`<Note />`]          |     ✅      |     ✅      |      ✅       |    ✅    |  🧐   |
| [`<ProductCard />`]   |     ✅      |     ✅      |      ✅       |    ✅    |  🧐   |
| [`<Section />`]       |     ✅      |     ✅      |      ✅       |    🧐    |  🧐   |
| [`<Skeleton />`]      |     ✅      |     ✅      |      ✅       |    🧐    |  🧐   |
| [`<SkipLink />`]      |     ✅      |     🧐      |      🧐       |    🧐    |  🧐   |

[`<badge />`]: https://sx-design.vercel.app/?path=/story/example-badge
[`<button />`]: https://sx-design.vercel.app/?path=/story/example-button
[`<buttonlink />`]: https://sx-design.vercel.app/?path=/story/example-buttonlink
[`<emoji />`]: https://sx-design.vercel.app/?path=/story/example-emoji
[`<errorboundary />`]: https://sx-design.vercel.app/?path=/story/example-errorboundary
[`<heading />`]: https://sx-design.vercel.app/?path=/story/example-heading
[`<kbd />`]: https://sx-design.vercel.app/?path=/story/example-kbd
[`<link />`]: https://sx-design.vercel.app/?path=/story/example-link
[`<linkbutton />`]: https://sx-design.vercel.app/?path=/story/example-linkbutton
[`<money />`]: https://sx-design.vercel.app/?path=/story/example-money
[`<note />`]: https://sx-design.vercel.app/?path=/story/example-note
[`<productcard />`]: https://sx-design.vercel.app/?path=/story/example-productcard
[`<section />`]: https://sx-design.vercel.app/?path=/story/example-section
[`<skeleton />`]: https://sx-design.vercel.app/?path=/story/example-skeleton
[`<skiplink />`]: https://sx-design.vercel.app/?path=/story/example-skiplink

_Did you find a mistake in this table? Please, [report is as an issue](https://github.com/adeira/universe/issues/new)._

¹ Localized means that it's either translated by us or the component inputs are (Flow) typed in a way that encourages passing translated strings instead of plain strings.

² Component should look fine in both light and dark mode.

³ There are stories in the [Storybook](https://sx-design.vercel.app/) and these stories are somehow useful and explanatory.

⁴ There are tests available to make sure that the component works as expected and we won't break it by accident.

⁵ Component correctly supports right-to-left (RTL) as well as traditional left-to-right (LTR) layouts

# Development

## Storybook

The easiest way how to develop these components is to run a Storybook:

```bash
yarn workspace @adeira/sx-design storybook
```

Please, make sure that any changes still follow the core values of this project and the matrix of available components was updated accordingly.

## Working with SX Design colors

It's recommended to use [`pastel`](https://github.com/sharkdp/pastel) when working with the SX Design colors:

```bash
brew install pastel
```

SX Design commonly uses colors written as triplets of values from 0 to 255. Here is how you can convert these triplets back and forth:

```bash
pastel color "28, 30, 33"
pastel format hex "28, 30, 33"
```

To generate colors gradient run:

```bash
pastel gradient -n 9 '255, 255, 255' '28, 30, 33'
pastel gradient -s rgb -n 9 '255, 255, 255' '28, 30, 33' | pastel format rgb
```

Another interesting command for checking colors with simulated colorblindness:

```bash
pastel colorblind deuter "247,212,214" "255,26,26" "238,0,0" "197,0,0"
```

For more info run:

```bash
pastel --help
```

# Prior art

- https://vercel.com/design
- https://github.com/vercel/commerce
