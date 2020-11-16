// @flow strict

import normalizeIndent from './normalizeIndent';

it('normalizes indent correctly', () => {
  expect(normalizeIndent`
    import sx from '@adeira/sx';
    const styles = sx.create({
      aaa: {
        color: blue,
      }
    });
  `).toMatchSnapshot();
});
