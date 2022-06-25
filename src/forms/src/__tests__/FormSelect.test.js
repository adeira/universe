/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import FormSelect from '../FormSelect';
import FormSelectOption from '../FormSelectOption';
import { customRender, getAllAttributes, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormSelect" input as expected', () => {
  const { getByTestId, getByText } = customRender(
    <FormSelect
      data-testid="normal-select"
      name="normal-select-name"
      value="POS"
      label={
        <fbt doNotExtract={true} desc={'normal upload label'}>
          normal upload label
        </fbt>
      }
    >
      <FormSelectOption value="POS" data-testid="normal-select-option-pov">
        <fbt doNotExtract={true} desc="POS option text">
          Point of sales
        </fbt>
      </FormSelectOption>
      <FormSelectOption value="TPV" data-testid="normal-select-option-tpv">
        <fbt doNotExtract={true} desc="TPV option text">
          Terminal punto de venta
        </fbt>
      </FormSelectOption>
    </FormSelect>,
  );

  expect(getByTestId('normal-select').nodeName.toLowerCase()).toBe('select');
  expect(getAllAttributes(getByTestId('normal-select'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "class": Any<String>,
      "data-testid": "normal-select",
    }
  `,
  );

  expect(getByText('Point of sales')).toBeInTheDocument();
  expect(getByText('Terminal punto de venta')).toBeInTheDocument();

  expect(getByText('--')).toBeInTheDocument(); // empty option
  expect(getAllAttributes(getByText('--'))).toStrictEqual({
    value: '',
  });
});
