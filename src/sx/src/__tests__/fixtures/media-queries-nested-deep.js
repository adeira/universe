// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  test: {
    '@media (max-width: 10cm)': {
      'color': '#F00000',
      'backgroundColor': '#FFFFFF',
      '@media (max-width: 9cm)': {
        'color': '#0F0000',
        'backgroundColor': '#FFFFFF',
        '@media (max-width: 8cm)': {
          'color': '#00F000',
          'backgroundColor': '#FFFFFF',
          '@media (max-width: 7cm)': {
            'color': '#000F00',
            'backgroundColor': '#FFFFFF',
            '@media (max-width: 6cm)': {
              'color': '#0000F0',
              'backgroundColor': '#FFFFFF',
              '@media (max-width: 5cm)': {
                color: '#00000F',
                backgroundColor: '#FFFFFF',
              },
            },
          },
        },
      },
    },
  },
}: SheetDefinitions);
