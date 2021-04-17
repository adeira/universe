/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Button from '../Button/Button';
import Note from './Note';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Note',
  component: Note,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <Note {...args} />;

const Spacer = (props) => <div style={{ marginBottom: 10 }}>{props.children}</div>;
const ShowcaseTemplate = (args) => (
  <>
    <Spacer>
      <Note {...args} tint="default">
        this is a default note
      </Note>
    </Spacer>
    <Spacer>
      <Note {...args} tint="success">
        this is a success note
      </Note>
    </Spacer>
    <Spacer>
      <Note {...args} tint="error">
        this is an error note
      </Note>
    </Spacer>
    <Spacer>
      <Note {...args} tint="warning">
        this is a warning note
      </Note>
    </Spacer>
  </>
);

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

export const NoteWithAction: StoryTemplate<typeof Note> = BasicTemplate.bind({});
NoteWithAction.storyName = 'With action button';
NoteWithAction.args = {
  tint: 'default',
  children: 'this is a note with action button (the button respects the note tint)',
  // $FlowExpectedError[incompatible-type]: Button children should be FBT, not a string
  action: <Button onClick={() => {}}>test</Button>,
};
