// @flow

import * as React from 'react';
import fbt from 'fbt';

import FormNumber from '../FormNumber';
import { customRender, getAllAttributes, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormNumber" input as expected', () => {
  const { getByTestId } = customRender(
    <FormNumber
      data-testid="number-input"
      name="number-input-name"
      value={-1}
      label={
        <fbt doNotExtract={true} desc={'number label'}>
          number label
        </fbt>
      }
    />,
  );

  expect(getByTestId('number-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('number-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "class": Any<String>,
      "data-testid": "number-input",
      "name": "number-input-name",
      "step": "any",
      "type": "number",
      "value": "-1",
    }
  `,
  );
});

it('renders complex "FormNumber" input as expected', () => {
  const { getByTestId } = customRender(
    <FormNumber
      data-testid="number-input"
      name="number-input-name"
      value={-1}
      min={-10}
      max={10}
      required={true}
      step={5}
      label={
        <fbt doNotExtract={true} desc={'number label'}>
          number label
        </fbt>
      }
    />,
  );

  expect(getByTestId('number-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('number-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "class": Any<String>,
      "data-testid": "number-input",
      "max": "10",
      "min": "-10",
      "name": "number-input-name",
      "required": "",
      "step": "5",
      "type": "number",
      "value": "-1",
    }
  `,
  );
});
