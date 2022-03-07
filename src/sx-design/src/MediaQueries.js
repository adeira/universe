// @flow strict

/**
 * Example usage:
 *
 * ```
 * const styles = sx.create({
 *   aaa: {
 *     [MediaQueryDevice.MOBILE]: {
 *       // styles for the mobile version
 *     },
 *     [MediaQueryDevice.DESKTOP]: {
 *       // styles for the desktop version
 *     },
 *   },
 * });
 * ```
 *
 * TODO: DRY with `MOBILE_WIDTH_BOUNDARY` (constants.js)?
 */
export const MediaQueryDevice = Object.freeze({
  DESKTOP: '@media screen and (min-width: 600px)',
  MOBILE: '@media screen and (max-width: 600px)',
});

export const MediaQueryMotion = Object.freeze({
  NO_PREFERENCE: '@media (prefers-reduced-motion: no-preference)',
  REDUCE: '@media (prefers-reduced-motion: reduce)',
});

export const MediaQueryColorScheme = Object.freeze({
  DARK: '@media (prefers-color-scheme: dark)',
  LIGHT: '@media (prefers-color-scheme: light)',
});
