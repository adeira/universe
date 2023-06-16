/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import FormText from '../FormText';
import { customRender, getAllAttributes, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormText" input as expected', () => {
  // This test should be using only the necessary fields.

  const { getByTestId } = customRender(
    <FormText
      data-testid="text-input"
      name="text-input-name"
      label={
        <fbt doNotExtract={true} desc="text label">
          text label
        </fbt>
      }
    />,
  );

  expect(getByTestId('text-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('text-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    {
      "class": Any<String>,
      "data-testid": "text-input",
      "name": "text-input-name",
      "type": "text",
      "value": "",
    }
  `,
  );
});

it('renders complex "FormText" input as expected', () => {
  // This test should be using as many fields as possible.

  const { getByTestId } = customRender(
    <FormText
      data-testid="text-input"
      name="text-input-name"
      value="text value"
      required={true}
      label={
        <fbt doNotExtract={true} desc="text label">
          text label
        </fbt>
      }
    />,
  );

  expect(getByTestId('text-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('text-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    {
      "class": Any<String>,
      "data-testid": "text-input",
      "name": "text-input-name",
      "required": "",
      "type": "text",
      "value": "text value",
    }
  `,
  );
});
