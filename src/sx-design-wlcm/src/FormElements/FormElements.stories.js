/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import { FormRoot } from '@adeira/forms'; // TODO: remove
import React, { type ElementConfig } from 'react';
import NextLink from 'next/link';

import FormEmail from './FormEmail';
import FormText from './FormText';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

initFbt();

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/FormElements',
  component: FormEmail,
};

// 👇 We create a "template" of how args map to rendering
const TemplateShowcase = () => (
  <FormRoot>
    <FormEmail label="Email label" name="email" required={true} />
    <FormText label="Text label" name="text" required={true} />
    {/*<FormSubmit>TKTK</FormSubmit>*/}
  </FormRoot>
);

// 👇 Each story then reuses that template
export const Showcase: StoryTemplate<typeof $FlowFixMe> = TemplateShowcase.bind({});
Showcase.storyName = 'Showcase';
