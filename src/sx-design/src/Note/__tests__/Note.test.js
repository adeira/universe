/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import { fbt } from 'fbt';

import Button from '../../Button/Button';
import Note from '../Note';
import { render, initFbt } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

describe('note tints', () => {
  it('renders unspecified tint as expected', () => {
    const { getByText } = render(
      <Note
        notePrefix={
          <fbt desc="default note prefix" doNotExtract={true}>
            Note
          </fbt>
        }
      >
        default note
      </Note>,
    );
    expect(getByText('Note:')).toBeInTheDocument();
    expect(getByText('default note')).toBeInTheDocument();
  });

  it('render default tint as expected', () => {
    const { getByText } = render(
      <Note
        tint="default"
        notePrefix={
          <fbt desc="default note prefix" doNotExtract={true}>
            Note
          </fbt>
        }
      >
        default note
      </Note>,
    );
    expect(getByText('Note:')).toBeInTheDocument();
    expect(getByText('default note')).toBeInTheDocument();
  });

  it('render success tint as expected', () => {
    const { getByText } = render(
      <Note
        tint="success"
        notePrefix={
          <fbt desc="success note prefix" doNotExtract={true}>
            Success
          </fbt>
        }
      >
        success note
      </Note>,
    );
    expect(getByText('Success:')).toBeInTheDocument();
    expect(getByText('success note')).toBeInTheDocument();
  });

  it('render error tint as expected', () => {
    const { getByText } = render(
      <Note
        tint="error"
        notePrefix={
          <fbt desc="error note prefix" doNotExtract={true}>
            Error
          </fbt>
        }
      >
        error note
      </Note>,
    );
    expect(getByText('Error:')).toBeInTheDocument();
    expect(getByText('error note')).toBeInTheDocument();
  });

  it('render warning tint as expected', () => {
    const { getByText } = render(
      <Note
        tint="warning"
        notePrefix={
          <fbt desc="warning note prefix" doNotExtract={true}>
            Warning
          </fbt>
        }
      >
        warning note
      </Note>,
    );
    expect(getByText('Warning:')).toBeInTheDocument();
    expect(getByText('warning note')).toBeInTheDocument();
  });
});

it('renders null action as expected', () => {
  const { getByText } = render(
    <Note
      notePrefix={
        <fbt desc="default note prefix" doNotExtract={true}>
          Note
        </fbt>
      }
      action={null}
    >
      default note
    </Note>,
  );
  expect(getByText('Note:')).toBeInTheDocument();
  expect(getByText('default note')).toBeInTheDocument();
});

it('renders action with HTML button as expected', () => {
  const { getByText, getByTestId } = render(
    <Note
      notePrefix={
        <fbt desc="default note prefix" doNotExtract={true}>
          Note
        </fbt>
      }
      action={
        // eslint-disable-next-line react/forbid-elements
        <button type="button" data-testid="note-button">
          button
        </button>
      }
    >
      default note
    </Note>,
  );
  expect(getByText('Note:')).toBeInTheDocument();
  expect(getByText('default note')).toBeInTheDocument();
  expect(getByTestId('note-button')).toBeInTheDocument();
});

it('renders action with SX Design Button as expected', () => {
  const { getByText, getByTestId } = render(
    <Note
      notePrefix={
        <fbt desc="default note prefix" doNotExtract={true}>
          Note
        </fbt>
      }
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
  );
  expect(getByText('Note:')).toBeInTheDocument();
  expect(getByText('default note')).toBeInTheDocument();
  expect(getByTestId('note-button')).toBeInTheDocument();
});
