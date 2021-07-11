/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Image from './Image';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Image',
  component: Image,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Image {...args} />;

// 👇 Each story then reuses that template
export const DefaultImage: StoryTemplate<typeof Image> = Template.bind({});
DefaultImage.storyName = 'Without props (default)';

export const BlurhashImage: StoryTemplate<typeof Image> = Template.bind({});
BlurhashImage.storyName = 'With Blurhash';
BlurhashImage.args = {
  blurhash: 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+',
};

export const ExampleImage: StoryTemplate<typeof Image> = Template.bind({});
ExampleImage.storyName = 'With Blurhash and Image';
ExampleImage.args = {
  blurhash: 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+',
  src: 'https://placekitten.com/500/500?image=12',
};
