/**
 * @flow
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import fbt from 'fbt';

import Button from '../../Button/Button';
import Modal from '../Modal';
import { initFbt, render, userEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

function TestingComponent(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          <fbt desc="modal title" doNotExtract={true}>
            Modal title
          </fbt>
        }
        {...props}
      >
        modal body
      </Modal>
    </>
  );
}

it('renders Modal component without any problems', () => {
  const { getByText, queryByText } = render(<TestingComponent />);

  // By default the modal is closed and the modal content is not being rendered:
  expect(queryByText('Modal title')).not.toBeInTheDocument();
  expect(queryByText('modal body')).not.toBeInTheDocument();

  // Open the modal:
  userEvent.click(getByText('Open modal'));

  // Now all the elements should be available:
  expect(getByText('Modal title')).toBeInTheDocument();
  expect(getByText('modal body')).toBeInTheDocument();
});

describe('closing mechanism', () => {
  it('closes Modal component by clicking on "X"', () => {
    const onClose = jest.fn();
    const { getByText, getByTestId, queryByTestId } = render(
      <TestingComponent onClose={onClose} />,
    );

    // Open the modal:
    expect(queryByTestId('ModalDialogCloseButton')).not.toBeInTheDocument();
    userEvent.click(getByText('Open modal'));
    expect(getByTestId('ModalDialogCloseButton')).toBeInTheDocument();

    // Close the modal:
    expect(onClose).not.toHaveBeenCalled();
    userEvent.click(getByTestId('ModalDialogCloseButton'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes Modal component by clicking on the backdrop', () => {
    const onClose = jest.fn();
    const { getByText, getByTestId, queryByTestId } = render(
      <TestingComponent onClose={onClose} />,
    );

    // Open the modal:
    expect(queryByTestId('ModalBackdrop')).not.toBeInTheDocument();
    userEvent.click(getByText('Open modal'));
    expect(getByTestId('ModalBackdrop')).toBeInTheDocument();

    // Close the modal:
    expect(onClose).not.toHaveBeenCalled();
    userEvent.click(getByTestId('ModalBackdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes Modal component by pressing "ESC"', () => {
    const onClose = jest.fn();
    const { getByText, queryByText } = render(<TestingComponent onClose={onClose} />);

    // Open the modal:
    expect(queryByText('Modal title')).not.toBeInTheDocument();
    userEvent.click(getByText('Open modal'));
    expect(getByText('Modal title')).toBeInTheDocument();

    // Close the modal:
    expect(onClose).not.toHaveBeenCalled();
    userEvent.keyboard('{esc}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('background scrolling prevention', () => {
  it('correctly applies body overflow (when modal is open) and resets it (when modal is closed)', () => {
    expect(
      window.getComputedStyle(document.body).getPropertyValue('overflow'),
    ).toMatchInlineSnapshot(`""`);

    const { getByText, getByTestId } = render(<TestingComponent />);

    // Open the modal:
    userEvent.click(getByText('Open modal'));

    // Body overflow should be hidden when the modal is open (this prevent the background from scrolling):
    expect(
      window.getComputedStyle(document.body).getPropertyValue('overflow'),
    ).toMatchInlineSnapshot(`"hidden"`);

    // Close the modal:
    userEvent.click(getByTestId('ModalDialogCloseButton'));

    // Body overflow allows the body to be scrollable again:
    expect(
      window.getComputedStyle(document.body).getPropertyValue('overflow'),
    ).toMatchInlineSnapshot(`""`);
  });

  it('does not overwrite default body overflow when modal is opened/closed', () => {
    // We set some default body overflow value here. The modal is going to overwrite it when opened,
    // but, it should return this value back when closed.
    if (document.body != null) {
      document.body.style.overflow = 'scroll';
    }

    expect(
      window.getComputedStyle(document.body).getPropertyValue('overflow'),
    ).toMatchInlineSnapshot(`"scroll"`);

    const { getByText, getByTestId } = render(<TestingComponent />);

    // Open the modal:
    userEvent.click(getByText('Open modal'));

    // Body overflow should be hidden when the modal is open (this prevent the background from scrolling):
    expect(
      window.getComputedStyle(document.body).getPropertyValue('overflow'),
    ).toMatchInlineSnapshot(`"hidden"`);

    // Close the modal:
    userEvent.click(getByTestId('ModalDialogCloseButton'));

    // The body overflow value should respect the initial value:
    expect(
      window.getComputedStyle(document.body).getPropertyValue('overflow'),
    ).toMatchInlineSnapshot(`"scroll"`);
  });
});
