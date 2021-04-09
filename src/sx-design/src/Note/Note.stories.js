/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Note from './Note';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Note',
  component: Note,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => <Note {...args} />;

// 👇 Each story then reuses that template
export const NoteDefault: $FlowFixMe = BasicTemplate.bind({});
NoteDefault.storyName = 'Default';
NoteDefault.args = {
  children: 'this is a default note',
};

export const NoteSuccess: $FlowFixMe = BasicTemplate.bind({});
NoteSuccess.storyName = 'Success';
NoteSuccess.args = {
  tint: 'success',
  children: 'this is a success note',
};

export const NoteError: $FlowFixMe = BasicTemplate.bind({});
NoteError.storyName = 'Error';
NoteError.args = {
  tint: 'error',
  children: 'this is an error note',
};

export const NoteWarning: $FlowFixMe = BasicTemplate.bind({});
NoteWarning.storyName = 'Warning';
NoteWarning.args = {
  tint: 'warning',
  children: 'this is a warning note',
};
