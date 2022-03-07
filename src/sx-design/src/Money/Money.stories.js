/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Money from './Money';
import { SupportedCurrencies } from '../constants';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Money',
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
        options: ['MXN', 'USD', 'AED'],
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
export const MXN: StoryTemplate<typeof Money> = Template.bind({});
MXN.storyName = 'MXN currency';
MXN.args = {
  priceUnitAmountCurrency: SupportedCurrencies.MXN,
};

export const USD: StoryTemplate<typeof Money> = Template.bind({});
USD.storyName = 'USD currency';
USD.args = {
  priceUnitAmountCurrency: SupportedCurrencies.USD,
};
