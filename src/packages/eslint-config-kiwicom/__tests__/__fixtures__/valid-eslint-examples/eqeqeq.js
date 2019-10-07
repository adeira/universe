/* eslint-disable flowtype/require-valid-file-annotation, no-self-compare */

const x = Math.random();
const y = Math.random();

// See: https://eslint.org/docs/rules/eqeqeq#smart
module.exports = {
  ok_1: x == null,
  ok_2: typeof x == 'undefined',
  ok_3: 'hello' != 'world',
  ok_4: 0 == 0,
  ok_5: true == true,
  ok_6: x == null,

  err_1: x == undefined, // eslint-disable-line eqeqeq
  err_2: x == true, // eslint-disable-line eqeqeq
  err_3: x == '', // eslint-disable-line eqeqeq
  err_4: x == y, // eslint-disable-line eqeqeq
};
