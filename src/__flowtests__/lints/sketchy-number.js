// @flow strict

const React = { createElement: () => {} };

const showBr: number = 42;

export function Component(): $FlowFixMe {
  // $FlowExpectedError[sketchy-number-and]
  return <div>{showBr && <br />}</div>; // eslint-disable-line react/jsx-no-leaked-render
}
