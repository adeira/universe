// @flow

import * as React from 'react';
import fbt from 'fbt';

import FormMultiUpload from '../FormMultiUpload';
import { customRender, getAllAttributes, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormMultiUpload" input as expected', () => {
  const { getByTestId } = customRender(
    <FormMultiUpload
      data-testid="file-input"
      name="file-input-name"
      accept="image/jpeg,image/png"
      label={
        <fbt doNotExtract={true} desc={'file label'}>
          file label
        </fbt>
      }
    />,
  );

  expect(getByTestId('file-input').nodeName.toLowerCase()).toBe('input');
  expect(getAllAttributes(getByTestId('file-input'))).toMatchInlineSnapshot(
    { class: expect.any(String) },
    `
    Object {
      "accept": "image/jpeg,image/png",
      "class": Any<String>,
      "data-testid": "file-input",
      "multiple": "",
      "name": "file-input-name",
      "type": "file",
    }
    `,
  );
});
