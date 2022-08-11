/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import FormEmail from '../FormEmail';
import { customRender, getAllAttributes, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormEmail" input as expected', () => {
  // This test should be using only the necessary fields.

  const { getByTestId } = customRender(
    <FormEmail
      data-testid="email-input"
      name="email-input-name"
      label={
        <fbt doNotExtract={true} desc={'email label'}>
          email label
        </fbt>
      }
    />,
  );

  expect(getByTestId('email-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('email-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "class": Any<String>,
      "data-testid": "email-input",
      "name": "email-input-name",
      "type": "email",
      "value": "",
    }
    `,
  );
});

it('renders complex "FormEmail" input as expected', () => {
  // This test should be using as many fields as possible.

  const { getByTestId } = customRender(
    <FormEmail
      data-testid="email-input"
      name="email-input-name"
      value="email value"
      required={true}
      label={
        <fbt doNotExtract={true} desc={'email label'}>
          email label
        </fbt>
      }
    />,
  );

  expect(getByTestId('email-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('email-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "class": Any<String>,
      "data-testid": "email-input",
      "name": "email-input-name",
      "required": "",
      "type": "email",
      "value": "email value",
    }
  `,
  );
});
