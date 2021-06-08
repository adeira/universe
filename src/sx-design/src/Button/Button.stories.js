/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import fbt from 'fbt';

import Button from './Button';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Button',
  component: Button,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <Button {...args} />;

const ShowcaseTemplate = (args) => (
  <>
    <Button {...args} tint="default" />
    <Button {...args} tint="error" />
    <Button {...args} tint="success" />
    <Button {...args} tint="warning" />
  </>
);

initFbt();

// 👇 Each story then reuses that template
export const ButtonDefault: StoryTemplate<typeof Button> = BasicTemplate.bind({});
ButtonDefault.storyName = 'Default';
ButtonDefault.args = {
  children: (
    <fbt desc="button title" doNotExtract={true}>
      Button
    </fbt>
  ),
};

export const ButtonShowcase: StoryTemplate<typeof Button> = ShowcaseTemplate.bind({});
ButtonShowcase.storyName = 'Showcase';
ButtonShowcase.argTypes = {
  children: { table: { disable: true } },
  onClick: { table: { disable: true } },
  tint: { table: { disable: true } },
};
ButtonShowcase.args = {
  children: (
    <fbt desc="button title" doNotExtract={true}>
      Button
    </fbt>
  ),
};
