/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import sx from '@adeira/sx';
import React, { type ElementConfig } from 'react';
import fbt from 'fbt';

import ButtonLink from './ButtonLink';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/ButtonLink',
  component: ButtonLink,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args: ElementConfig<typeof ButtonLink>) => <ButtonLink {...args} />;

/* eslint-disable sx/no-unused-stylesheet */
const styles = sx.create({
  custom: {
    'color': 'rgba(var(--sx-error))',
    'textDecoration': 'underline',
    ':hover': {
      textDecoration: 'none',
    },
  },
});
/* eslint-enable sx/no-unused-stylesheet */

initFbt();

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof ButtonLink> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  children: (
    <fbt desc="button link title" doNotExtract={true}>
      Click me, I am a button but I look like a link!
    </fbt>
  ),
  // eslint-disable-next-line no-alert
  onClick: () => alert('Yay!'),
};

export const CustomStyle: StoryTemplate<typeof ButtonLink> = Template.bind({});
CustomStyle.storyName = 'Custom style';
CustomStyle.args = {
  children: (
    <fbt desc="button link title" doNotExtract={true}>
      Click me, I am a button but I look like a link! (with custom styles)
    </fbt>
  ),
  // eslint-disable-next-line no-alert
  onClick: () => alert('Yay!'),
  xstyle: styles.custom,
};
