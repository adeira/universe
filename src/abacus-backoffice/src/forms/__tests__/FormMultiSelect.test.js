/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import FormMultiSelect from '../FormMultiSelect';
import FormSelectOption from '../FormSelectOption';
import { customRender, getAllAttributes, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormMultiSelect" input as expected', () => {
  const { getByTestId } = customRender(
    <FormMultiSelect
      data-testid="multi-select"
      name="multi-select-name"
      size={3}
      value={['POS']}
      label={
        <fbt doNotExtract={true} desc={'multi upload label'}>
          multi upload label
        </fbt>
      }
    >
      <FormSelectOption value="POS" data-testid="multi-select-option-pov">
        <fbt doNotExtract={true} desc="POS option text">
          Point of sales
        </fbt>
      </FormSelectOption>
      <FormSelectOption value="TPV" data-testid="multi-select-option-tpv">
        <fbt doNotExtract={true} desc="TPV option text">
          Terminal punto de venta
        </fbt>
      </FormSelectOption>
    </FormMultiSelect>,
  );

  expect(getByTestId('multi-select').nodeName.toLowerCase()).toBe('select');
  expect(getAllAttributes(getByTestId('multi-select'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "class": Any<String>,
      "data-testid": "multi-select",
      "multiple": "",
      "size": "3",
    }
  `,
  );
  expect(getByTestId('multi-select-option-pov')).toBeDefined();
  expect(getByTestId('multi-select-option-tpv')).toBeDefined();
});
