The purpose of this package is to provide all necessary functions for working with [CSS colors](https://www.w3.org/TR/css-color-4/) as well as additional useful utilities for real-world use-cases.

# Installation

```
yarn add @adeira/css-colors
```

# Usage

## Get color keywords

```js
import { cssColorNames } from '@adeira/css-colors';

cssColorNames.get('rebeccapurple'); // => #663399
```

The imported `cssColorNames` is a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of all CSS keywords, so you can use any available `Map` methods.

## Is it a color?

```js
import { isColor } from '@adeira/css-colors';

isColor('#663399'); // true
isColor('rebeccapurple'); // true
isColor('rgb(255, 255, 128)'); // true
isColor('transparent'); // true
isColor('currentcolor'); // true
isColor('hsl(50, 33%, 25)'); // false (last number should be 25%)
```

## What is the color contrast ratio?

This function takes triplet of colors for foreground and background colors and calculates their contrast ratio (from 1:1 for no contrast up to 25:1 for excellent contrast):

```js
import { calculateContrastRatio } from '@adeira/css-colors';

calculateContrastRatio([130, 242, 75], [119, 46, 242]); // 4.27 (4.27:1)
```

See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast

## Is the pair of colors accessible?

Allows you to decide whether a pair of two colors (typically foreground and background) is accessible:

```js
import { isAccessible } from '@adeira/css-colors';

isAccessible([0, 0, 0], [255, 255, 255]); // true (black and white combo)

// optionally, you can specify context of these colors and success criteria for accessibility:
isAccessible([64, 32, 17], [201, 120, 136], 'NORMAL_TEXT', 'AAA'); // false
isAccessible([64, 32, 17], [201, 120, 136], 'NORMAL_TEXT', 'AA'); // true
isAccessible([64, 32, 17], [201, 120, 136], 'LARGE_TEXT', 'AAA'); // true
isAccessible([64, 32, 17], [201, 120, 136], 'GRAPHICAL_OBJECTS'); // true
```

Note on colors accessibility: it can happen that some backgrounds are never accessible under **AAA** criteria. For example [`#FF1A1A`](https://webaim.org/resources/contrastchecker/?fcolor=000000&bcolor=FF1A1A) always fails "normal text" test for **AAA** criteria (no matter whether you choose completely white or completely black font).

## What color is the best for this background?

```js
import { chooseHigherContrast } from '@adeira/css-colors';

chooseHigherContrast(
  [255, 255, 255], // foreground color 1 ✅
  [128, 128, 128], // foreground color 2 ❌
  [0, 0, 0], // background
);
```

The function above returns `[255, 255, 255]` because white is better on a black background than grey.

## Normalize colors

```js
import { normalizeColor } from '@adeira/css-colors';

normalizeColor('#639'); // #639
normalizeColor('#663399'); // #639
normalizeColor('rebeccapurple'); // #639
```

## HEX to HEX

```js
import { hex3ToHex6, hex6ToHex3 } from '@adeira/css-colors';

hex3ToHex6('#639'); // #663399
hex6ToHex3('#663399'); // #639
```

## Is the color bright or dark? (DEPRECATED)

This function can be used to detect whether the color is bright or dark, so you can decide whether you should use white or black text for the color background (or vice versa):

```js
import { isDark, isBright } from '@adeira/css-colors';

isDark([0, 0, 0]); // true (it's black)
isBright([0, 0, 0]); // false

isDark([144, 238, 144]); // false (lightgreen)
isBright([144, 238, 144]); // true

isDark([255, 255, 255]); // false (it's white)
isBright([255, 255, 255]); // true
```

_Please note that while this function is simple, it takes into account only one color. Consider using [`calculateContrastRatio`](#what-is-the-color-contrast-ratio) and/or [`isAccessible`](#is-the-pair-of-colors-accessible) described above where you can specify 2 colors (for example, text and its background)._

## `convertToRGBTriplet`

TKTK
