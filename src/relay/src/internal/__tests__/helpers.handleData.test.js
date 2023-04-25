// @flow strict-local

import { handleData } from '../helpers';

/* $FlowFixMe[underconstrained-implicit-instantiation] This comment suppresses
 * an error when upgrading Flow to version 0.204.1. To see the error delete
 * this comment and run Flow. */
const jsonMock = jest.fn();
/* $FlowFixMe[underconstrained-implicit-instantiation] This comment suppresses
 * an error when upgrading Flow to version 0.204.1. To see the error delete
 * this comment and run Flow. */
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
  /* $FlowFixMe[underconstrained-implicit-instantiation] This comment
   * suppresses an error when upgrading Flow to version 0.204.1. To see the
   * error delete this comment and run Flow. */
  const headersGetMock = jest.fn();
  const response = createResponse(headersGetMock);

  // $FlowExpectedError[incompatible-call]: incomplete Response object for testing purposes only
  /* $FlowFixMe[unused-promise] This comment suppresses an error when upgrading
   * Flow to version 0.201.0. To see the error delete this comment and run
   * Flow. */
  handleData(response);

  expect(headersGetMock).toHaveBeenCalledWith('content-type');
  expect(jsonMock).not.toHaveBeenCalled();
  expect(textMock).toHaveBeenCalledTimes(1);
});

it('calls "json" method when header "content-type" with value "application/json" has been returned', () => {
  const headersGetMock = jest.fn<empty, string>().mockImplementation(() => 'application/json');
  const response = createResponse(headersGetMock);

  // $FlowExpectedError[incompatible-call]: incomplete Response object for testing purposes only
  /* $FlowFixMe[unused-promise] This comment suppresses an error when upgrading
   * Flow to version 0.201.0. To see the error delete this comment and run
   * Flow. */
  handleData(response);

  expect(headersGetMock).toHaveBeenCalledWith('content-type');
  expect(jsonMock).toHaveBeenCalledTimes(1);
  expect(textMock).not.toHaveBeenCalled();
});
