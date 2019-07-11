// @flow

import { getRequestBody } from '../helpers';

it('returns request body without uploadables', () => {
  expect(
    getRequestBody(
      {
        text: '{__typename}',
      },
      {}, // variables
    ),
  ).toMatchInlineSnapshot(`"{\\"query\\":\\"{__typename}\\",\\"variables\\":{}}"`);
});

it('returns request body without uploadables - persistent queries', () => {
  expect(
    getRequestBody(
      {
        id: '1234567890',
      },
      { aaa: 111 }, // variables
    ),
  ).toMatchInlineSnapshot(`"{\\"documentId\\":\\"1234567890\\",\\"variables\\":{\\"aaa\\":111}}"`);
});

function serializeFormData(formData: FormData) {
  const object = {};
  for (const [key, value] of formData.entries()) {
    object[key] = value;
  }
  return object;
}

it('returns request body with uploadables', () => {
  const formData = getRequestBody(
    {
      text: '{__typename}',
    },
    { bbb: 222 }, // variables
    {
      foo: new File(['foo'], 'foo.txt'), // eslint-disable-line no-undef
      bar: new File(['bar'], 'bar.txt'), // eslint-disable-line no-undef
    },
  );

  expect(formData).toBeInstanceOf(FormData);

  // $FlowExpectedError: Flow knows it could be a string as well but we know it's a FormData type
  expect(serializeFormData(formData)).toMatchInlineSnapshot(`
Object {
  "bar": File {},
  "foo": File {},
  "query": "{__typename}",
  "variables": "{\\"bbb\\":222}",
}
`);
});

it('returns request body with uploadables - persistent queries', () => {
  const formData = getRequestBody(
    {
      id: '1234567890',
    },
    {}, // variables
    {
      foo: new File(['foo'], 'foo.txt'), // eslint-disable-line no-undef
      bar: new File(['bar'], 'bar.txt'), // eslint-disable-line no-undef
    },
  );

  expect(formData).toBeInstanceOf(FormData);

  // $FlowExpectedError: Flow knows it could be a string as well but we know it's a FormData type
  expect(serializeFormData(formData)).toMatchInlineSnapshot(`
Object {
  "bar": File {},
  "documentId": "1234567890",
  "foo": File {},
  "variables": "{}",
}
`);
});
