// @flow

import { handleData } from '../helpers';

const jsonMock = jest.fn();
const textMock = jest.fn();

const createResponse = getMockFunction => ({
  // $FlowExpectedError: incomplete and mocked Headers object for testing purposes only
  headers: {
    get: getMockFunction,
  },
  json: jsonMock,
  text: textMock,
});

beforeEach(() => {
  jest.resetAllMocks();
});

it('calls "text" method by default', () => {
  const headersGetMock = jest.fn();
  const response = createResponse(headersGetMock);

  handleData(response);

  expect(headersGetMock).toHaveBeenCalled();
  expect(jsonMock).not.toHaveBeenCalled();
  expect(textMock).toHaveBeenCalled();
});

it('calls "json" method when header "content-type" with value "application/json" has been returned', () => {
  const headersGetMock = jest.fn().mockImplementation(() => 'application/json');
  const response = createResponse(headersGetMock);

  handleData(response);

  expect(headersGetMock).toHaveBeenCalled();
  expect(jsonMock).toHaveBeenCalled();
  expect(textMock).not.toHaveBeenCalled();
});
