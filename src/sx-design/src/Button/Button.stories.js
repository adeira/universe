/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import Button from './Button';
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

// 👇 Each story then reuses that template
export const ButtonDefault: StoryTemplate<typeof Button> = BasicTemplate.bind({});
ButtonDefault.storyName = 'Default';
// $FlowExpectedError[incompatible-type]: children should be FBT, not a string
ButtonDefault.args = {
  children: 'Button',
};

export const ButtonShowcase: StoryTemplate<typeof Button> = ShowcaseTemplate.bind({});
ButtonShowcase.storyName = 'Showcase';
ButtonShowcase.argTypes = {
  children: { table: { disable: true } },
  onClick: { table: { disable: true } },
  tint: { table: { disable: true } },
};
// $FlowExpectedError[incompatible-type]: children should be FBT, not a string
ButtonShowcase.args = {
  children: 'Button',
};
