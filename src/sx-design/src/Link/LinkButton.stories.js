/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import Icon from '@adeira/icons';
import fbt from 'fbt';

import LayoutInline from '../Layout/LayoutInline';
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
  <LayoutInline>
    <LinkButton {...args} tint="default" />
    <LinkButton {...args} tint="secondary" />
    <LinkButton {...args} tint="error" />
    <LinkButton {...args} tint="success" />
    <LinkButton {...args} tint="warning" />
  </LayoutInline>
);

const SizesTemplate = (args) => (
  <LayoutInline>
    <LinkButton {...args} size="small">
      <fbt desc="link button title" doNotExtract={true}>
        small link button
      </fbt>
    </LinkButton>
    <LinkButton {...args} size="medium">
      <fbt desc="link button title" doNotExtract={true}>
        medium link button
      </fbt>
    </LinkButton>
    <LinkButton {...args} size="large">
      <fbt desc="link button title" doNotExtract={true}>
        large link button
      </fbt>
    </LinkButton>
  </LayoutInline>
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

export const ButtonPrefixSuffix: StoryTemplate<typeof LinkButton> = BasicTemplate.bind({});
ButtonPrefixSuffix.storyName = 'With prefix/suffix';
ButtonPrefixSuffix.args = {
  prefix: <Icon name="exit_right" />,
  suffix: <Icon name="exit_left" />,
  children: (
    <fbt desc="link button title" doNotExtract={true}>
      Click me, I am a link but I look like a button!
    </fbt>
  ),
  href: 'https://github.com/adeira/universe/stargazers',
};

export const ButtonSizes: StoryTemplate<typeof LinkButton> = SizesTemplate.bind({});
ButtonSizes.storyName = 'With various sizes';
ButtonSizes.args = {
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
