/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import Icon from '@adeira/icons';
import fbt from 'fbt';

import Button from './Button';
import LayoutInline from '../Layout/LayoutInline';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    'prefix': { table: { disable: true } },
    'suffix': { table: { disable: true } },
    'children': { table: { disable: true } },
    'data-testid': { table: { disable: true } },
  },
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <Button {...args} />;
const ShowcaseTemplate = (args) => (
  <LayoutInline>
    <Button {...args} tint="default">
      <fbt desc="default button title" doNotExtract={true}>
        Default
      </fbt>
    </Button>
    <Button {...args} tint="secondary">
      <fbt desc="secondary button title" doNotExtract={true}>
        Secondary
      </fbt>
    </Button>
    <Button {...args} tint="error">
      <fbt desc="error button title" doNotExtract={true}>
        Error
      </fbt>
    </Button>
    <Button {...args} tint="success">
      <fbt desc="success button title" doNotExtract={true}>
        Success
      </fbt>
    </Button>
    <Button {...args} tint="warning">
      <fbt desc="warning button title" doNotExtract={true}>
        Warning
      </fbt>
    </Button>
  </LayoutInline>
);

initFbt();

// 👇 Each story then reuses that template
export const ButtonDefault: StoryTemplate<typeof Button> = BasicTemplate.bind({});
ButtonDefault.storyName = 'Default';
ButtonDefault.args = {
  children: (
    <fbt desc="button title" doNotExtract={true}>
      Default button
    </fbt>
  ),
};

export const ButtonPrefixSuffix: StoryTemplate<typeof Button> = BasicTemplate.bind({});
ButtonPrefixSuffix.storyName = 'With prefix/suffix';
ButtonPrefixSuffix.args = {
  prefix: <Icon name="exit_right" />,
  suffix: <Icon name="exit_left" />,
  children: (
    <fbt desc="button title" doNotExtract={true}>
      Button
    </fbt>
  ),
};

export const ButtonShowcase: StoryTemplate<typeof Button> = ShowcaseTemplate.bind({});
ButtonShowcase.storyName = 'Showcase';
ButtonShowcase.argTypes = {
  tint: { table: { disable: true } },
};
