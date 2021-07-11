/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import fbt from 'fbt';

import LinkButton from './LinkButton';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/LinkButton',
  component: LinkButton,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <LinkButton {...args} />;

const ShowcaseTemplate = (args) => (
  <>
    <LinkButton {...args} tint="default" />
    <LinkButton {...args} tint="secondary" />
    <LinkButton {...args} tint="error" />
    <LinkButton {...args} tint="success" />
    <LinkButton {...args} tint="warning" />
  </>
);

initFbt();

// 👇 Each story then reuses that template
export const ButtonDefault: StoryTemplate<typeof LinkButton> = BasicTemplate.bind({});
ButtonDefault.storyName = 'Default';
ButtonDefault.args = {
  children: (
    <fbt desc="link button title" doNotExtract={true}>
      Click me, I am a link but I look like a button!
    </fbt>
  ),
  href: 'https://github.com/adeira/universe/stargazers',
};

export const ButtonShowcase: StoryTemplate<typeof LinkButton> = ShowcaseTemplate.bind({});
ButtonShowcase.storyName = 'Showcase';
ButtonShowcase.argTypes = {
  children: { table: { disable: true } },
  href: { table: { disable: true } },
  tint: { table: { disable: true } },
};
ButtonShowcase.args = {
  children: (
    <fbt desc="link button title" doNotExtract={true}>
      Click me, I am a link but I look like a button!
    </fbt>
  ),
  href: 'https://github.com/adeira/universe/stargazers',
};
