/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Image from './Image';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Image',
  component: Image,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Image {...args} width={250} height={250} />;

// 👇 Each story then reuses that template
export const DefaultImage: StoryTemplate<typeof Image> = Template.bind({});
DefaultImage.storyName = 'Without Blurhash (default)';

export const BlurhashImage: StoryTemplate<typeof Image> = Template.bind({});
BlurhashImage.storyName = 'With Blurhash';
BlurhashImage.args = {
  blurhash: 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+',
};

export const ExampleImage: StoryTemplate<typeof Image> = Template.bind({});
ExampleImage.storyName = 'With Image';
ExampleImage.args = {
  blurhash: 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+',
  src: 'https://placekitten.com/300/300?image=12',
};
