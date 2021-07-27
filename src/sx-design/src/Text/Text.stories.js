/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import fbt from 'fbt';

import Text from './Text';
import LayoutBlock from '../Layout/LayoutBlock';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Text',
  component: Text,
};

const LONG_TEXT = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only
      five centuries, but also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.`;

// 👇 We create a "template" of how args map to rendering
const TemplateLongText = (args) => <Text {...args}>{LONG_TEXT}</Text>;

const TemplateLongTextMaxWidth = (args) => (
  <div style={{ maxWidth: '50%' }}>
    <Text {...args}>{LONG_TEXT}</Text>
  </div>
);

const TemplateWeighted = () => (
  <LayoutBlock>
    {[950, 900, 800, 700, 600, 500, 400, 300, 200, 100].map((weight) => (
      <Text key={weight} weight={weight}>
        <fbt desc="weighted text" doNotExtract={true}>
          The quick brown fox jumps over a lazy dog. (<fbt:param name="weight">{weight}</fbt:param>)
        </fbt>
      </Text>
    ))}
  </LayoutBlock>
);

const TemplateSized = () => (
  <LayoutBlock>
    {[48, 40, 32, 24, 20, 16, 14, 12, 10].map((size) => (
      <Text key={size} size={size}>
        <fbt desc="sized text" doNotExtract={true}>
          The quick brown fox. (<fbt:param name="size">{size}</fbt:param>)
        </fbt>
      </Text>
    ))}
  </LayoutBlock>
);

const TemplateSemantic = () => (
  <LayoutBlock>
    {['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((as) => (
      <Text key={as} as={as}>
        <fbt desc="semantic text" doNotExtract={true}>
          The quick brown fox. (<fbt:param name="as">{as}</fbt:param>)
        </fbt>
      </Text>
    ))}
  </LayoutBlock>
);

initFbt();

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Text> = TemplateLongText.bind({});
Default.storyName = 'Default';

export const Weighted: StoryTemplate<typeof Text> = TemplateWeighted.bind({});
Weighted.storyName = 'Weighted';

export const Sized: StoryTemplate<typeof Text> = TemplateSized.bind({});
Sized.storyName = 'Sized';

export const Semantic: StoryTemplate<typeof Text> = TemplateSemantic.bind({});
Semantic.storyName = 'Semantic';

export const Truncated: StoryTemplate<typeof Text> = TemplateLongTextMaxWidth.bind({});
Truncated.storyName = 'Truncated';
Truncated.args = {
  truncate: true,
};

export const Transformed: StoryTemplate<typeof Text> = TemplateLongText.bind({});
Transformed.storyName = 'Transformed (uppercase)';
Transformed.args = {
  transform: 'uppercase',
};
