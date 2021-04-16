// @flow

import { render } from '@testing-library/react';
import React from 'react';
import { fbt } from 'fbt';

import Note from '../Note';
import { Button, SxDesignProvider } from '../../../index';

const SpanishTestNote = (props) => {
  const { children, ...rest } = props;
  return (
    <SxDesignProvider locale="es-MX">
      <Note {...rest}>{children}</Note>
    </SxDesignProvider>
  );
};

describe('note tints', () => {
  it('renders unspecified tint as expected', () => {
    const { getByText } = render(<SpanishTestNote>default note</SpanishTestNote>);
    expect(getByText('Nota:')).toBeDefined();
    expect(getByText('default note')).toBeDefined();
  });

  it('render default tint as expected', () => {
    const { getByText } = render(<SpanishTestNote tint="default">default note</SpanishTestNote>);
    expect(getByText('Nota:')).toBeDefined();
    expect(getByText('default note')).toBeDefined();
  });

  it('render success tint as expected', () => {
    const { getByText } = render(<SpanishTestNote tint="success">success note</SpanishTestNote>);
    expect(getByText('Exitoso:')).toBeDefined();
    expect(getByText('success note')).toBeDefined();
  });

  it('render error tint as expected', () => {
    const { getByText } = render(<SpanishTestNote tint="error">error note</SpanishTestNote>);
    expect(getByText('Error:')).toBeDefined();
    expect(getByText('error note')).toBeDefined();
  });

  it('render warning tint as expected', () => {
    const { getByText } = render(<SpanishTestNote tint="warning">warning note</SpanishTestNote>);
    expect(getByText('Atención:')).toBeDefined();
    expect(getByText('warning note')).toBeDefined();
  });
});

it('renders null action as expected', () => {
  const { getByText } = render(<SpanishTestNote action={null}>default note</SpanishTestNote>);
  expect(getByText('Nota:')).toBeDefined();
  expect(getByText('default note')).toBeDefined();
});

it('renders action with HTML button as expected', () => {
  const { getByText, getByTestId } = render(
    <SpanishTestNote
      action={
        // eslint-disable-next-line react/forbid-elements
        <button type="button" data-testid="note-button">
          button
        </button>
      }
    >
      default note
    </SpanishTestNote>,
  );
  expect(getByText('Nota:')).toBeDefined();
  expect(getByText('default note')).toBeDefined();
  expect(getByTestId('note-button')).toBeDefined();
});

it('renders action with SX Design Button as expected', () => {
  const { getByText, getByTestId } = render(
    <SpanishTestNote
      action={
        <Button data-testid="note-button" onClick={() => {}}>
          <fbt desc="button text" doNotExtract={true}>
            button
          </fbt>
        </Button>
      }
    >
      default note
    </SpanishTestNote>,
  );
  expect(getByText('Nota:')).toBeDefined();
  expect(getByText('default note')).toBeDefined();
  expect(getByTestId('note-button')).toBeDefined();
});
