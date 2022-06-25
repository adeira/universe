/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import FormTextArea from '../FormTextArea';
import { customRender, getAllAttributes, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormTextArea" input as expected', () => {
  const { getByTestId } = customRender(
    <FormTextArea
      data-testid="text-area-input"
      name="text-area-input-name"
      value="text area value"
      label={
        <fbt doNotExtract={true} desc={'text area label'}>
          text area label
        </fbt>
      }
    />,
  );

  expect(getByTestId('text-area-input').nodeName.toLowerCase()).toBe('textarea');
  expect(getAllAttributes(getByTestId('text-area-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "class": Any<String>,
      "data-testid": "text-area-input",
      "name": "text-area-input-name",
      "rows": "5",
    }
  `,
  );
});

it('renders complex "FormTextArea" input as expected', () => {
  const { getByTestId } = customRender(
    <FormTextArea
      data-testid="text-area-input"
      name="text-area-input-name"
      value="text area value"
      required={true}
      label={
        <fbt doNotExtract={true} desc={'text area label'}>
          text area label
        </fbt>
      }
    />,
  );

  expect(getByTestId('text-area-input').nodeName.toLowerCase()).toBe('textarea');
  expect(getAllAttributes(getByTestId('text-area-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "class": Any<String>,
      "data-testid": "text-area-input",
      "name": "text-area-input-name",
      "required": "",
      "rows": "5",
    }
  `,
  );
});
