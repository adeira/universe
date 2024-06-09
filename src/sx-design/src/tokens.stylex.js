// TODO:flow

import * as sx from '@stylexjs/stylex';

const DARK = '@media (prefers-color-scheme: dark)';

export const colors = sx.defineVars({
  // Colors (https://coolors.co/ee0000-007012-f5a623):
  errorLighter: sx.types.color('rgba(247, 212, 214)'),
  errorLight: sx.types.color('rgba(255, 26, 26)'),
  error: sx.types.color('rgba(238, 0, 0)'),
  errorDark: sx.types.color('rgba(197, 0, 0)'),

  successLighter: sx.types.color('rgba(211, 229, 255)'),
  successLight: sx.types.color('rgba(50, 145, 255)'),
  success: sx.types.color('rgba(0, 112, 243)'),
  successDark: sx.types.color('rgba(7, 97, 209)'),

  warningLighter: sx.types.color('rgba(255, 239, 207)'),
  warningLight: sx.types.color('rgba(247, 185, 85)'),
  warning: sx.types.color('rgba(245, 166, 35)'),
  warningDark: sx.types.color('rgba(171, 87, 10)'),

  background: { default: 'rgba(255, 255, 255)', [DARK]: 'rgba(51, 51, 51)' },
  // background: sx.types.color({ default: 'rgba(255, 255, 255)', [DARK]: 'rgba(51, 51, 51)' }),
  accent1: sx.types.color({ default: 'rgba(227, 227, 227)', [DARK]: 'rgba(77, 77, 77)' }),
  accent2: sx.types.color({ default: 'rgba(198, 199, 200)', [DARK]: 'rgba(102, 102, 102)' }),
  accent3: sx.types.color({ default: 'rgba(170, 171, 172)', [DARK]: 'rgba(128, 128, 128)' }),
  accent4: sx.types.color({ default: 'rgba(142, 143, 144)', [DARK]: 'rgba(153, 153, 153)' }),
  accent5: sx.types.color({ default: 'rgba(113, 114, 116)', [DARK]: 'rgba(179, 179, 179)' }),
  accent6: sx.types.color({ default: 'rgba(85, 86, 89)', [DARK]: 'rgba(204, 204, 204)' }),
  accent7: sx.types.color({ default: 'rgba(56, 58, 61)', [DARK]: 'rgba(230, 230, 230)' }),
  foreground: sx.types.color({ default: 'rgba(28, 30, 33)', [DARK]: 'rgba(255, 255, 255)' }),

  // Other variables:
  // TODO
});
