// @flow

import { addons } from '@storybook/addons';

import SxDesignTheme from './SxDesignTheme';

addons.setConfig({
  panelPosition: 'right',
  theme: SxDesignTheme,
});
