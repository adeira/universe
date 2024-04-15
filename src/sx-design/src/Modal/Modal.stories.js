// @flow

import { rangeMap } from '@adeira/js';
import React, { useState, type Node } from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import LayoutGrid from '../Layout/LayoutGrid';
import Modal from './Modal';
import ProductCard from '../ProductCard/ProductCard';
import { initFbt } from '../test-utils';
import { SupportedCurrencies } from '../constants';

export default {
  component: Modal,
  title: 'Components/Modal',
  tags: ['autodocs'],
};

initFbt();

const ModalExampleEmpty = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <fbt desc="open modal button title" doNotExtract={true}>
          Open empty modal
        </fbt>
      </Button>
      <Modal
        title={
          <fbt desc="empty modal" doNotExtract={true}>
            Empty modal
          </fbt>
        }
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        Anything can be here but it&apos;s empty now.
      </Modal>
    </>
  );
};

const ModalExampleWithProductCards = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <fbt desc="open modal button title" doNotExtract={true}>
          Open modal (containing product cards)
        </fbt>
      </Button>
      <Modal
        title={
          <fbt desc="with product cards" doNotExtract={true}>
            With product cards
          </fbt>
        }
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <LayoutGrid minColumnWidth="200px">
          {rangeMap(10, (i) => (
            <ProductCard
              key={i}
              title="My Product"
              priceUnitAmount={42}
              priceUnitAmountCurrency={SupportedCurrencies.AED}
              imgSrc="https://placekitten.com/500/500?image=12"
            />
          ))}
        </LayoutGrid>
      </Modal>
    </>
  );
};

const ModalExampleWithModalInsideModal = (): Node => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <fbt desc="open modal button title" doNotExtract={true}>
          Open modal (with another modal inside)
        </fbt>
      </Button>
      <Modal
        title={
          <fbt desc="modal inside modal" doNotExtract={true}>
            Modal inside modal
          </fbt>
        }
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <ModalExampleWithModalInsideModal />
      </Modal>
    </>
  );
};

export const EmptyModal = {
  render: (): Node => <ModalExampleEmpty />,
};

export const WithProductCards = {
  render: (): Node => <ModalExampleWithProductCards />,
};

export const ModalInsideModal = {
  render: (): Node => <ModalExampleWithModalInsideModal />,
};
