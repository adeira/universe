// @flow strict

/* eslint-disable */

const React = require('react');

const BoldTodoRenderer = React.lazy(() =>
  import(
    // $FlowExpectedError: cannot resolve module
    './BoldTodoRenderer'
  ),
);

module.exports = function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BoldTodoRenderer />
    </React.Suspense>
  );
};
