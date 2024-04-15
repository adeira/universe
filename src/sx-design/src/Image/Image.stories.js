// @flow

import Image from './Image';

export default {
  component: Image,
  title: 'Components/Image',
  tags: ['autodocs'],
};

export const WithoutProps = {
  args: {},
};

export const WithBlurhash = {
  args: {
    blurhash: 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+',
  },
};

export const WithBlurhashAndImage = {
  args: {
    blurhash: 'UIFrw^~Wx^NH.8D*t7%L.8RjMxRixu%ME1R+',
    src: 'https://placekitten.com/500/500?image=12',
  },
};
