// @flow strict

const React = { createElement: () => {} };

const showBr: number = 42;

export function Component(): $FlowFixMe {
  // $FlowExpectedError[extra-arg]
  // $FlowExpectedError[sketchy-number-and]
  return <div>{showBr && <br />}</div>;
}
