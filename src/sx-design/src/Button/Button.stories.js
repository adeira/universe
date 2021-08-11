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
  title: 'Components/Button',
  component: Button,
  argTypes: {
    'prefix': { table: { disable: true } },
    'suffix': { table: { disable: true } },
    'children': { table: { disable: true } },
    'data-testid': { table: { disable: true } },
  },
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => (
  <LayoutInline>
    <Button {...args}>
      <fbt desc="button title" doNotExtract={true}>
        Default button
      </fbt>
    </Button>
    <Button {...args} isDisabled={true}>
      <fbt desc="button title" doNotExtract={true}>
        Disabled button
      </fbt>
    </Button>
  </LayoutInline>
);

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

const SizesTemplate = (args) => (
  <LayoutInline>
    <Button {...args} size="small">
      <fbt desc="small button title" doNotExtract={true}>
        small button
      </fbt>
    </Button>
    <Button {...args} size="medium">
      <fbt desc="medium button title" doNotExtract={true}>
        medium button
      </fbt>
    </Button>
    <Button {...args} size="large">
      <fbt desc="large button title" doNotExtract={true}>
        large button
      </fbt>
    </Button>
  </LayoutInline>
);

initFbt();

// 👇 Each story then reuses that template
export const ButtonDefault: StoryTemplate<typeof Button> = BasicTemplate.bind({});
ButtonDefault.storyName = 'Default';

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

export const ButtonSizes: StoryTemplate<typeof Button> = SizesTemplate.bind({});
ButtonSizes.storyName = 'With various sizes';
ButtonSizes.argTypes = {
  tint: { table: { disable: true } },
};

export const ButtonShowcase: StoryTemplate<typeof Button> = ShowcaseTemplate.bind({});
ButtonShowcase.storyName = 'Showcase';
ButtonShowcase.argTypes = {
  tint: { table: { disable: true } },
};
