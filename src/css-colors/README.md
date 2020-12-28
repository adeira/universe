Utility functions for working with CSS/HTML colors.

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

The imported `cssColorNames` is actually a `Map` of all CSS keywords.

## Is it a color?

```js
import { isColor } from '@adeira/css-colors';

isColor('#663399'); // true
isColor('rebeccapurple'); // true
isColor('rgb(255, 255, 128)'); // true
isColor('hsl(50, 33%, 25)'); // false (should be 25%)
```

## Is the color bright or dark?

This function can be used to detect whether the color is bright or dark so you can decide whether you should use white or black text for the color background (for example).

```js
import { isDark, isBright } from '@adeira/css-colors';

isDark([0, 0, 0]); // true (it's black)
isBright([0, 0, 0]); // false

isDark([255, 255, 255]); // false (it's white)
isBright([255, 255, 255]); // true
```

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
