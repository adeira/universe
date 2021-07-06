/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import fbt from 'fbt';

import ButtonLink from './ButtonLink_DEPRECATED';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/ButtonLink',
  component: ButtonLink,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <ButtonLink {...args} />;

const ShowcaseTemplate = (args) => (
  <>
    <ButtonLink {...args} tint="default" />
    <ButtonLink {...args} tint="error" />
    <ButtonLink {...args} tint="success" />
    <ButtonLink {...args} tint="warning" />
  </>
);

initFbt();

// 👇 Each story then reuses that template
export const ButtonDefault: StoryTemplate<typeof ButtonLink> = BasicTemplate.bind({});
ButtonDefault.storyName = 'Default';
ButtonDefault.args = {
  children: (
    <fbt desc="button link title" doNotExtract={true}>
      Button link
    </fbt>
  ),
  href: 'https://github.com/adeira/universe',
};

export const ButtonShowcase: StoryTemplate<typeof ButtonLink> = ShowcaseTemplate.bind({});
ButtonShowcase.storyName = 'Showcase';
ButtonShowcase.argTypes = {
  children: { table: { disable: true } },
  href: { table: { disable: true } },
  tint: { table: { disable: true } },
};
ButtonShowcase.args = {
  children: (
    <fbt desc="button link title" doNotExtract={true}>
      Button link
    </fbt>
  ),
  href: 'https://github.com/adeira/universe',
};
