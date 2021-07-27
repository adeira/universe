# Unreleased

# 2.2.0

- Added experimental function `convertToRGBTriplet`. Purpose of this function is to get any supported [color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) and convert it to the internal RGB triplet value.
- Added a new function `chooseHigherContrast` that can help you to choose the best color compared to the given background (in terms of contrast).

# 2.1.0

Note for all Flow users: all projects in [`adeira/universe`](https://github.com/adeira/universe) now use implicit exact Flow types (`{}` for strict objects and `{ ... }` for open objects, syntax `{||}` is deprecated). We do not expect any issues as long as you are using `exact_by_default=true` Flow option.

Other changes:

- New functions `calculateContrastRatio` and `isAccessible` were added.
- Functions `isDark` and `isBright` has been deprecated. You can use `isAccessible` function to make a better decision about colors contrast (for text and background colors for example). The following code snippets show possible migration strategy:

  ```js
  isDark(rgb);

  // replace with:
  isAccessible(rgb, [255, 255, 255]); // or better to use you actual bg/fg color
  ```

  ```js
  isBright(rgb);

  // replace with:
  isAccessible(rgb, [0, 0, 0]); // or better to use you actual bg/fg color
  ```

# 2.0.0

Support for Node.js 12 has been removed. This package might continue working on older Node.js versions, however, it's highly recommended upgrading to Node.js version 14 or newer. For more details, see: https://nodejs.org/en/about/releases/, or discuss here: https://github.com/adeira/universe/discussions/1588

# 1.1.0

- added new functions `isBright` and `isDark`

# 1.0.0

Initial stable release.
