// @flow

import hashStyle from '../hashStyle';

test.each([
  ['{"zIndex":1}', 'LVBJZ'],
  ['{"color":"white"}', '_1srGyL'], // numbers should always be prefixed with underscore
  ['accepts any string', '_4fTCm'],
])('hashes the input %p while prefixing numbers', (styleToHash, expectedResult) => {
  expect(hashStyle(styleToHash)).toBe(expectedResult);
});
