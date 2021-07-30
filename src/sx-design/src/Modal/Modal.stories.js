/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import { rangeMap } from '@adeira/js';
import React, { useState } from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import LayoutGrid from '../Layout/LayoutGrid';
import ProductCard from '../ProductCard/ProductCard';
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
const TemplateEmpty = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <fbt desc="open modal button title" doNotExtract={true}>
          Open empty modal
        </fbt>
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        Anything can be here but it&apos;s empty now.
      </Modal>
    </div>
  );
};

const TemplateWithProductCards = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <fbt desc="open modal button title" doNotExtract={true}>
          Open modal (containing product cards)
        </fbt>
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <LayoutGrid minColumnWidth="200px">
          {rangeMap(10, (i) => (
            <ProductCard
              key={i}
              title={'My Product'}
              priceUnitAmount={42}
              priceUnitAmountCurrency={'AED'}
              imgSrc={'https://placekitten.com/500/500?image=12'}
            />
          ))}
        </LayoutGrid>
      </Modal>
    </div>
  );
};

const TemplateWithModalInsideModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <fbt desc="open modal button title" doNotExtract={true}>
          Open modal (with another modal inside)
        </fbt>
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <TemplateWithModalInsideModal />
      </Modal>
    </div>
  );
};

// 👇 Each story then reuses that template
export const EmptyModal: StoryTemplate<typeof Modal> = TemplateEmpty.bind({});
EmptyModal.storyName = 'Empty modal';

export const ModalWithProductCards: StoryTemplate<typeof Modal> = TemplateWithProductCards.bind({});
ModalWithProductCards.storyName = 'With product cards';

export const ModalInsideModal: StoryTemplate<typeof Modal> = TemplateWithModalInsideModal.bind({});
ModalInsideModal.storyName = 'Modal inside modal';
