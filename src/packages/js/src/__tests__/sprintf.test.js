// @flow

import sprintf from '../sprintf';

describe('sprintf', () => {
  it('works with %s', () => {
    expect(sprintf('aaa %s bbb %s ccc', 111, '222')).toBe(
      'aaa 111 bbb 222 ccc',
    );
  });
});
