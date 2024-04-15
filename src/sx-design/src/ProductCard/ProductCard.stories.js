// @flow

import React, { type ElementConfig, type Node } from 'react';
import { rangeMap } from '@adeira/js';
import fbt from 'fbt';

import LayoutGrid from '../Layout/LayoutGrid';
import ProductCard from './ProductCard';
import { initFbt } from '../test-utils';
import { SupportedCurrencies } from '../constants';

export default {
  component: ProductCard,
  title: 'Components/ProductCard',
  tags: ['autodocs'],
};

const BLURHASH = 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+';

initFbt();

const TemplateStandalone = (args: ElementConfig<typeof ProductCard>) => <ProductCard {...args} />;
const Template = (args: ElementConfig<typeof ProductCard>) => (
  <LayoutGrid minColumnWidth="200px">
    {rangeMap(16, (i) => (
      <ProductCard
        key={i}
        {...args}
        warningMessage={
          [0, 2].includes(i) ? (
            <fbt desc="example warning message" doNotExtract={true}>
              example warning message
            </fbt>
          ) : undefined
        }
        errorMessage={
          [1, 2].includes(i) ? (
            <fbt desc="example error message" doNotExtract={true}>
              example error message
            </fbt>
          ) : undefined
        }
      />
    ))}
  </LayoutGrid>
);

export const Standalone = {
  name: 'Standalone (no image)',
  render: (): Node => (
    <TemplateStandalone
      title="My product"
      priceUnitAmount={42}
      priceUnitAmountCurrency={SupportedCurrencies.MXN}
    />
  ),
};

export const StandaloneWithImage = {
  name: 'Standalone with image',
  render: (): Node => (
    <TemplateStandalone
      title="My product"
      priceUnitAmount={42}
      priceUnitAmountCurrency={SupportedCurrencies.USD}
      imgBlurhash={BLURHASH}
      imgSrc="https://placekitten.com/500/500?image=12"
    />
  ),
};

export const InGrid = {
  name: 'In a CSS grid',
  render: (): Node => (
    <Template
      title="My awesome product with a very long name"
      priceUnitAmount={42}
      priceUnitAmountCurrency={SupportedCurrencies.CZK}
      imgBlurhash={BLURHASH}
      imgSrc="https://placekitten.com/500/500?image=12"
    />
  ),
};
