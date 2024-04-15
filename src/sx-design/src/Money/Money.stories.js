// @flow

import Money from './Money';
import { SupportedCurrencies } from '../constants';

export default {
  component: Money,
  title: 'Components/Money',
  tags: ['autodocs'],
  args: {
    priceUnitAmount: 42,
  },
};

export const MXN = {
  name: 'MXN currency',
  args: {
    priceUnitAmountCurrency: SupportedCurrencies.MXN,
  },
};

export const USD = {
  name: 'USD currency',
  args: {
    priceUnitAmountCurrency: SupportedCurrencies.USD,
  },
};
