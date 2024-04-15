// @flow

import React, { type ElementConfig, type Node } from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import LayoutBlock from '../Layout/LayoutBlock';
import Note from './Note';
import { initFbt } from '../test-utils';

export default {
  component: Note,
  title: 'Components/Note',
  tags: ['autodocs'],
};

const ShowcaseActionTemplate = (args: ElementConfig<typeof Note>) => (
  <LayoutBlock>
    <Note {...args} tint="default" />
    <Note {...args} tint="success" />
    <Note {...args} tint="error" />
    <Note {...args} tint="warning" />
  </LayoutBlock>
);

initFbt();

export const Default = {
  render: (): Node => <Note>this is a default note, modify me</Note>,
};

export const Showcase = {
  render: (): Node => (
    <LayoutBlock>
      <Note tint="default">this is a default note</Note>
      <Note tint="success">this is a success note</Note>
      <Note tint="error">this is an error note</Note>
      <Note tint="warning">this is a warning note</Note>
    </LayoutBlock>
  ),
};

export const WithActionButton = {
  render: (): Node => (
    <ShowcaseActionTemplate
      tint="default"
      action={
        <Button onClick={() => {}}>
          <fbt desc="button title" doNotExtract={true}>
            test
          </fbt>
        </Button>
      }
    >
      this is a note with action button (the button respects the note tint)
    </ShowcaseActionTemplate>
  ),
};
