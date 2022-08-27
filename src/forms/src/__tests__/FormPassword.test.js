/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import FormPassword from '../FormPassword';
import { customRender, getAllAttributes, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormPassword" input as expected', () => {
  const { getByTestId } = customRender(
    <FormPassword
      data-testid="password-input"
      name="password-input-name"
      label={
        <fbt doNotExtract={true} desc={'password label'}>
          password label
        </fbt>
      }
    />,
  );

  expect(getByTestId('password-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('password-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    {
      "class": Any<String>,
      "data-testid": "password-input",
      "name": "password-input-name",
      "type": "password",
      "value": "",
    }
  `,
  );
});

it('renders complex "FormPassword" input as expected', () => {
  const { getByTestId } = customRender(
    <FormPassword
      data-testid="password-input"
      name="password-input-name"
      required={true}
      label={
        <fbt doNotExtract={true} desc={'password label'}>
          password label
        </fbt>
      }
    />,
  );

  expect(getByTestId('password-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('password-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    {
      "class": Any<String>,
      "data-testid": "password-input",
      "name": "password-input-name",
      "required": "",
      "type": "password",
      "value": "",
    }
  `,
  );
});
