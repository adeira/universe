// @flow strict

import normalizeIndent from './normalizeIndent';

it('normalizes indent correctly', () => {
  expect(normalizeIndent`
    import * as sx from '@adeira/sx';
    const styles = sx.create({
      aaa: {
        color: blue,
      }
    });
  `).toMatchSnapshot();
});
