/**
 * Check and update README.md as well!
 *
 * Note: all colors are written using RGB triplet. Why? It's because it allows us to optionally
 * apply alpha channel when needed (https://stackoverflow.com/a/41265350). Usage:
 *
 * ```js
 * { color: 'rgb(var(--sx-text-color))' }
 * ```
 *
 * With optional alpha channel:
 *
 * ```js
 * { color: 'rgb(var(--sx-text-color), 0.5)' }
 * ```
 *
 * @flow
 */

export default {
  common: {
    '--sx-skipLink-background-color': '28, 30, 33', // #1c1e21
    '--sx-skipLink-text-color': '255, 255, 255', // #ffffff
  },
  lightTheme: {
    '--sx-background-color': '255, 255, 255', // #ffffff
    '--sx-text-color': '28, 30, 33', // #1c1e21
  },
  darkTheme: {
    '--sx-background-color': '51, 51, 51', // #333333
    '--sx-text-color': '255, 255, 255', // #ffffff
  },
};
