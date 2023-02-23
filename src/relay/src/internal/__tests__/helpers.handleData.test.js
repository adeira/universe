// @flow strict-local

import { handleData } from '../helpers';

const jsonMock = jest.fn();
const textMock = jest.fn();

const createResponse = (getMockFunction: JestMockFn<$FlowFixMe, $FlowFixMe>) => ({
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

  // $FlowExpectedError[incompatible-call]: incomplete Response object for testing purposes only
  /* $FlowFixMe[unused-promise-in-sync-scope] This comment suppresses an error
   * when upgrading Flow to version 0.200.0. To see the error delete this
   * comment and run Flow. */
  handleData(response);

  expect(headersGetMock).toHaveBeenCalledWith('content-type');
  expect(jsonMock).not.toHaveBeenCalled();
  expect(textMock).toHaveBeenCalledTimes(1);
});

it('calls "json" method when header "content-type" with value "application/json" has been returned', () => {
  const headersGetMock = jest.fn<empty, string>().mockImplementation(() => 'application/json');
  const response = createResponse(headersGetMock);

  // $FlowExpectedError[incompatible-call]: incomplete Response object for testing purposes only
  /* $FlowFixMe[unused-promise-in-sync-scope] This comment suppresses an error
   * when upgrading Flow to version 0.200.0. To see the error delete this
   * comment and run Flow. */
  handleData(response);

  expect(headersGetMock).toHaveBeenCalledWith('content-type');
  expect(jsonMock).toHaveBeenCalledTimes(1);
  expect(textMock).not.toHaveBeenCalled();
});
