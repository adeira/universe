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
  title: 'Example/ProductCard',
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
  args: {
    title: 'My awesome product',
    priceUnitAmount: 42,
    imgBlurhash: 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+',
    imgSrc: 'https://placekitten.com/300/300?image=12',
  },
};

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
});

// 👇 We create a "template" of how args map to rendering
const Template = (args) => (
  <div className={styles('productsGrid')}>
    {rangeMap(12, (i) => (
      <ProductCard key={i} {...args} />
    ))}
  </div>
);

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof ProductCard> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  priceUnitAmountCurrency: 'MXN',
};
