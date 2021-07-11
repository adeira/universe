/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import sx from '@adeira/sx';
import React from 'react';
import { rangeMap } from '@adeira/js';

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

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
  },
});

// 👇 We create a "template" of how args map to rendering
const TemplateStandalone = (args) => <ProductCard {...args} />;
const Template = (args) => (
  <div className={styles('productsGrid')}>
    {rangeMap(16, (i) => (
      <ProductCard key={i} {...args} />
    ))}
  </div>
);

// 👇 Each story then reuses that template
export const Standalone: StoryTemplate<typeof ProductCard> = TemplateStandalone.bind({});
Standalone.storyName = 'Standalone (no image)';
Standalone.args = {
  title: 'My awesome product',
  priceUnitAmount: 42,
  priceUnitAmountCurrency: 'MXN',
};

export const StandaloneWithImage: StoryTemplate<typeof ProductCard> = TemplateStandalone.bind({});
StandaloneWithImage.storyName = 'Standalone with image';
StandaloneWithImage.args = {
  title: 'My awesome product',
  priceUnitAmount: 42,
  priceUnitAmountCurrency: 'USD',
  imgBlurhash: BLURHASH,
  imgSrc: 'https://placekitten.com/500/500?image=12',
};

export const InGrid: StoryTemplate<typeof ProductCard> = Template.bind({});
InGrid.storyName = 'In a CSS grid';
InGrid.args = {
  title: 'Product',
  priceUnitAmount: 42,
  priceUnitAmountCurrency: 'CZK',
  imgBlurhash: BLURHASH,
  imgSrc: 'https://placekitten.com/200/200?image=12',
};
