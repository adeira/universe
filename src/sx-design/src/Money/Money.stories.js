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
export const MXN: $FlowFixMe = Template.bind({});
MXN.storyName = 'MXN currency';
MXN.args = {
  priceUnitAmountCurrency: 'MXN',
};

export const USD: $FlowFixMe = Template.bind({});
USD.storyName = 'USD currency';
USD.args = {
  priceUnitAmountCurrency: 'USD',
};
