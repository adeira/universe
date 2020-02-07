// @flow strict

/* eslint-disable no-console */

const a = null;
const b = 1;

// $FlowExpectedError: unsafe-addition
console.log(b / a);
