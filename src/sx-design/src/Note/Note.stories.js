/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import LayoutBlock from '../Layout/LayoutBlock';
import Note from './Note';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Note',
  component: Note,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <Note {...args} />;

const ShowcaseTemplate = (args) => (
  <LayoutBlock>
    <Note {...args} tint="default">
      this is a default note
    </Note>
    <Note {...args} tint="success">
      this is a success note
    </Note>
    <Note {...args} tint="error">
      this is an error note
    </Note>
    <Note {...args} tint="warning">
      this is a warning note
    </Note>
  </LayoutBlock>
);

const ShowcaseActionTemplate = (args) => (
  <LayoutBlock>
    <Note {...args} tint="default" />
    <Note {...args} tint="success" />
    <Note {...args} tint="error" />
    <Note {...args} tint="warning" />
  </LayoutBlock>
);

initFbt();

// 👇 Each story then reuses that template
export const NoteDefault: StoryTemplate<typeof Note> = BasicTemplate.bind({});
NoteDefault.storyName = 'Default';
NoteDefault.args = {
  children: 'this is a default note, modify me',
};

export const NoteShowcase: StoryTemplate<typeof Note> = ShowcaseTemplate.bind({});
NoteShowcase.storyName = 'Showcase';
NoteShowcase.argTypes = {
  children: { table: { disable: true } },
  tint: { table: { disable: true } },
  action: { table: { disable: true } },
};

export const NoteWithAction: StoryTemplate<typeof Note> = ShowcaseActionTemplate.bind({});
NoteWithAction.storyName = 'With action button';
NoteWithAction.args = {
  tint: 'default',
  children: 'this is a note with action button (the button respects the note tint)',
  action: (
    <Button onClick={() => {}}>
      <fbt desc="button title" doNotExtract={true}>
        test
      </fbt>
    </Button>
  ),
};
