// @flow strict

let mockInstalled = false;
const mockExpectedWarnings: Array<string> = [];
let mockContextualExpectedWarning: string | null = null;

/**
 * Mocks the `warning` module to turn warnings into errors. Any expected
 * warnings need to be explicitly expected with `expectWarningWillFire(message)`.
 *
 * NOTE: This should be called on top of a test file. The test should NOT
 *       use `jest.resetModules()` or manually mock `warning`.
 */
export function disallowWarnings(): void {
  if (mockInstalled) {
    throw new Error('`disallowWarnings` should be called at most once');
  }
  mockInstalled = true;
  const consoleWarnSpy = jest
    .spyOn(global.console, 'warn')
    .mockImplementation((format, ...args) => {
      let argIndex = 0;
      const message = format.replace(/%s/g, () => String(args[argIndex++]));
      const index = mockExpectedWarnings.indexOf(message);

      if (mockContextualExpectedWarning != null && mockContextualExpectedWarning === message) {
        mockContextualExpectedWarning = null;
      } else if (index >= 0) {
        mockExpectedWarnings.splice(index, 1);
      } else {
        // log to console in case the error gets swallowed somewhere
        // eslint-disable-next-line no-console
        console.error(`Unexpected Warning: ${message}`);
        throw new Error(`Warning: ${message}`);
      }
    });

  afterEach(() => {
    if (mockExpectedWarnings.length > 0) {
      const error = new Error(
        `Some expected warnings were not triggered:

${Array.from(mockExpectedWarnings, (message) => ` * ${message}`).join('\n')}
`,
      );
      mockExpectedWarnings.length = 0;
      throw error;
    }
  });

  afterAll(() => {
    consoleWarnSpy.mockRestore();
  });
}

/**
 * Expect a warning with the given message. If the message isn't fired in the
 * current test, the test will fail.
 */
export function expectWarningWillFire(message: string): void {
  if (!mockInstalled) {
    throw new Error('`disallowWarnings` needs to be called before `expectWarningWillFire`');
  }
  mockExpectedWarnings.push(message);
}

/**
 * Expect the callback `fn` to trigger the warning message and otherwise fail.
 */
export function expectToWarn<T>(message: string, fn: () => T): T {
  if (mockContextualExpectedWarning != null) {
    throw new Error('Cannot nest `expectToWarn()` calls.');
  }
  mockContextualExpectedWarning = message;
  const result = fn();
  if (mockContextualExpectedWarning != null) {
    mockContextualExpectedWarning = null;
    throw new Error(`Expected callback to warn: ${message}`);
  }
  return result;
}
