/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import { rangeMap } from '@adeira/js';
import fbt from 'fbt';

import LayoutGrid from '../Layout/LayoutGrid';
import { initFbt } from '../test-utils';
import ProductCard from './ProductCard';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/ProductCard',
  component: ProductCard,
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
};

const BLURHASH = 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+';

initFbt();

// 👇 We create a "template" of how args map to rendering
const TemplateStandalone = (args) => <ProductCard {...args} />;
const Template = (args) => (
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

// 👇 Each story then reuses that template
export const Standalone: StoryTemplate<typeof ProductCard> = TemplateStandalone.bind({});
Standalone.storyName = 'Standalone (no image)';
Standalone.args = {
  title: 'My product',
  priceUnitAmount: 42,
  priceUnitAmountCurrency: 'MXN',
};

export const StandaloneWithImage: StoryTemplate<typeof ProductCard> = TemplateStandalone.bind({});
StandaloneWithImage.storyName = 'Standalone with image';
StandaloneWithImage.args = {
  title: 'My product',
  priceUnitAmount: 42,
  priceUnitAmountCurrency: 'USD',
  imgBlurhash: BLURHASH,
  imgSrc: 'https://placekitten.com/500/500?image=12',
};

export const InGrid: StoryTemplate<typeof ProductCard> = Template.bind({});
InGrid.storyName = 'In a CSS grid';
InGrid.args = {
  title: 'My awesome product with a very long name',
  priceUnitAmount: 42,
  priceUnitAmountCurrency: 'CZK',
  imgBlurhash: BLURHASH,
  imgSrc: 'https://placekitten.com/200/200?image=12',
};
