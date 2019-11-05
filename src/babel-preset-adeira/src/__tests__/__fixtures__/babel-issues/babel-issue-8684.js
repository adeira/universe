// @flow strict
// SEE: https://github.com/babel/babel/issues/8684
/* eslint-disable */

const aaa = 1;

// $FlowExpectedError: this line should stay here because `aaa` is incompatible with `bbb`
const bbb: string = aaa;
