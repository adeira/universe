/**
 * Note: all colors are written using RGB triplet. Why? It's because it allows us to optionally
 * apply alpha channel when needed (https://stackoverflow.com/a/41265350). Usage:
 *
 * ```js
 * { color: 'rgba(var(--sx-foreground))' }
 * ```
 *
 * With optional alpha channel:
 *
 * ```js
 * { color: 'rgba(var(--sx-foreground), 0.5)' }
 * ```
 *
 * @flow
 */

export default {
  common: {
    // Colors (https://coolors.co/ee0000-007012-f5a623):
    '--sx-error-lighter': '247, 212, 214',
    '--sx-error-light': '255, 26, 26',
    '--sx-error': '238, 0, 0',
    '--sx-error-dark': '197, 0, 0',

    '--sx-success-lighter': '211, 229, 255',
    '--sx-success-light': '50, 145, 255',
    '--sx-success': '0, 112, 243',
    '--sx-success-dark': '7, 97, 209',

    '--sx-warning-lighter': '255, 239, 207',
    '--sx-warning-light': '247, 185, 85',
    '--sx-warning': '245, 166, 35',
    '--sx-warning-dark': '171, 87, 10',

    // Other variables:
    '--sx-radius': '5px',
    '--sx-shadow-small': '0 5px 10px rgba(0,0,0,0.12)',
    '--sx-shadow-medium': '0 8px 30px rgba(0,0,0,0.12)',
    '--sx-shadow-large': '0 30px 60px rgba(0,0,0,0.12)',
    '--sx-spacing-small': '10px',
  },
  lightTheme: {
    // Colors:
    '--sx-background': '255, 255, 255', // lighter
    '--sx-accent-1': '227, 227, 227',
    '--sx-accent-2': '198, 199, 200',
    '--sx-accent-3': '170, 171, 172',
    '--sx-accent-4': '142, 143, 144',
    '--sx-accent-5': '113, 114, 116',
    '--sx-accent-6': '85, 86, 89',
    '--sx-accent-7': '56, 58, 61',
    '--sx-foreground': '28, 30, 33', // darker

    // Other variables:
    '--sx-link-text-color': '3, 102, 214',
  },
  darkTheme: {
    // Colors:
    '--sx-background': '51, 51, 51',
    '--sx-accent-1': '77, 77, 77',
    '--sx-accent-2': '102, 102, 102',
    '--sx-accent-3': '128, 128, 128',
    '--sx-accent-4': '153, 153, 153',
    '--sx-accent-5': '179, 179, 179',
    '--sx-accent-6': '204, 204, 204',
    '--sx-accent-7': '230, 230, 230',
    '--sx-foreground': '255, 255, 255',

    // Other variables:
    '--sx-link-text-color': '88, 166, 255',
  },
};
