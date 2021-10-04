/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import { fbt } from 'fbt';

import Button from '../../Button/Button';
import Note from '../Note';
import { render } from '../../test-utils';

describe('note tints', () => {
  it('renders unspecified tint as expected', () => {
    const { getByText } = render(<Note>default note</Note>, { locale: 'es-MX' });
    expect(getByText('Nota:')).toBeInTheDocument();
    expect(getByText('default note')).toBeInTheDocument();
  });

  it('render default tint as expected', () => {
    const { getByText } = render(<Note tint="default">default note</Note>, { locale: 'es-MX' });
    expect(getByText('Nota:')).toBeInTheDocument();
    expect(getByText('default note')).toBeInTheDocument();
  });

  it('render success tint as expected', () => {
    const { getByText } = render(<Note tint="success">success note</Note>, { locale: 'es-MX' });
    expect(getByText('Exitoso:')).toBeInTheDocument();
    expect(getByText('success note')).toBeInTheDocument();
  });

  it('render error tint as expected', () => {
    const { getByText } = render(<Note tint="error">error note</Note>, { locale: 'es-MX' });
    expect(getByText('Error:')).toBeInTheDocument();
    expect(getByText('error note')).toBeInTheDocument();
  });

  it('render warning tint as expected', () => {
    const { getByText } = render(<Note tint="warning">warning note</Note>, { locale: 'es-MX' });
    expect(getByText('Atención:')).toBeInTheDocument();
    expect(getByText('warning note')).toBeInTheDocument();
  });
});

it('renders null action as expected', () => {
  const { getByText } = render(<Note action={null}>default note</Note>, { locale: 'es-MX' });
  expect(getByText('Nota:')).toBeInTheDocument();
  expect(getByText('default note')).toBeInTheDocument();
});

it('renders action with HTML button as expected', () => {
  const { getByText, getByTestId } = render(
    <Note
      action={
        // eslint-disable-next-line react/forbid-elements
        <button type="button" data-testid="note-button">
          button
        </button>
      }
    >
      default note
    </Note>,
    { locale: 'es-MX' },
  );
  expect(getByText('Nota:')).toBeInTheDocument();
  expect(getByText('default note')).toBeInTheDocument();
  expect(getByTestId('note-button')).toBeInTheDocument();
});

it('renders action with SX Design Button as expected', () => {
  const { getByText, getByTestId } = render(
    <Note
      action={
        <Button data-testid="note-button" onClick={() => {}}>
          <fbt desc="button text" doNotExtract={true}>
            button
          </fbt>
        </Button>
      }
    >
      default note
    </Note>,
    { locale: 'es-MX' },
  );
  expect(getByText('Nota:')).toBeInTheDocument();
  expect(getByText('default note')).toBeInTheDocument();
  expect(getByTestId('note-button')).toBeInTheDocument();
});
