/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React, { useState } from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import Modal from './Modal';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Modal',
  component: Modal,
};

initFbt();

// 👇 We create a "template" of how args map to rendering
const Template = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <fbt desc="open modal button title" doNotExtract={true}>
          Open Modal
        </fbt>
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        anything can be here at this moment
      </Modal>
    </div>
  );
};

// 👇 Each story then reuses that template
export const DefaultModal: StoryTemplate<typeof Modal> = Template.bind({});
DefaultModal.storyName = 'Default';
