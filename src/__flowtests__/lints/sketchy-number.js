// @flow strict

const React = { createElement: () => {} };

const showBr: number = 42;

export function Component() {
  // $FlowExpectedError: sketchy-number-and
  return <div>{showBr && <br />}</div>;
}
