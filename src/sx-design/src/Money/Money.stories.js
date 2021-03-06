/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Money from './Money';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Money',
  component: Money,
  argTypes: {
    locale: {
      control: {
        type: 'select',
        options: ['en-US', 'es-MX'],
      },
    },
    priceUnitAmount: {
      control: {
        type: 'number',
      },
    },
    priceUnitAmountCurrency: {
      control: {
        type: 'select',
        options: ['MXN', 'USD'],
      },
    },
  },
  args: {
    priceUnitAmount: 42,
  },
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Money {...args} />;

// 👇 Each story then reuses that template
export const MXNinUS: $FlowFixMe = Template.bind({});
MXNinUS.storyName = 'MXN in en-US';
MXNinUS.args = {
  locale: 'en-US',
  priceUnitAmountCurrency: 'MXN',
};

export const MXNinMX: $FlowFixMe = Template.bind({});
MXNinMX.storyName = 'MXN in es-MX';
MXNinMX.args = {
  locale: 'es-MX',
  priceUnitAmountCurrency: 'MXN',
};

export const USDinMX: $FlowFixMe = Template.bind({});
USDinMX.storyName = 'USD in es-MX';
USDinMX.args = {
  locale: 'es-MX',
  priceUnitAmountCurrency: 'USD',
};

export const USDinUS: $FlowFixMe = Template.bind({});
USDinUS.storyName = 'USD in en-US';
USDinUS.args = {
  locale: 'en-US',
  priceUnitAmountCurrency: 'USD',
};
