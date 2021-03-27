/**
 * Note: all colors are written using RGB triplet. Why? It's because it allows us to optionally
 * apply alpha channel when needed (https://stackoverflow.com/a/41265350). Usage:
 *
 * ```js
 * { color: 'rgba(var(--sx-text-color))' }
 * ```
 *
 * With optional alpha channel:
 *
 * ```js
 * { color: 'rgba(var(--sx-text-color), 0.5)' }
 * ```
 *
 * @flow
 */

export default {
  // Check and update README.md as well!
  common: {
    '--sx-skipLink-background-color': '28, 30, 33',
    '--sx-skipLink-text-color': '255, 255, 255',
  },
  lightTheme: {
    '--sx-background-color': '255, 255, 255',
    '--sx-text-color': '28, 30, 33',
    '--sx-text-link-color': '3, 102, 214',
  },
  darkTheme: {
    '--sx-background-color': '51, 51, 51',
    '--sx-text-color': '255, 255, 255',
    '--sx-text-link-color': '88, 166, 255',
  },
};
