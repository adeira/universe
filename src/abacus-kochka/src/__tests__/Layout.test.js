/**
 * @flow
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import Layout from '../Layout';

// https://github.com/babel/babel/issues/13462
// eslint-disable-next-line jest/no-disabled-tests
it.skip('disallows hidden title when the title is specified', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() =>
    render(
      <Layout withHiddenTitle={true} title={'title'}>
        test
      </Layout>,
    ),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot use \`title\` together with \`withHiddenTitle\` property."`,
  );

  consoleSpy.mockRestore();
});

// https://github.com/babel/babel/issues/13462
// eslint-disable-next-line jest/no-disabled-tests
it.skip('disallows hidden title when the subtitle is specified', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() =>
    render(
      <Layout withHiddenTitle={true} subtitle={'subtitle'}>
        test
      </Layout>,
    ),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot use \`subtitle\` together with \`withHiddenTitle\` property."`,
  );

  consoleSpy.mockRestore();
});
