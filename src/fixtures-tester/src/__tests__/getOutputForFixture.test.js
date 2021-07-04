// @flow

import getOutputForFixture from '../getOutputForFixture';

it('returns the operation result as expected', async () => {
  await expect(
    getOutputForFixture('OK', (input) => input.toLowerCase(), 'fixture.txt'),
  ).resolves.toBe('ok');

  await expect(
    getOutputForFixture('OK', (input) => Promise.resolve(input.toLowerCase()), 'fixture.txt'),
  ).resolves.toBe('ok');
});

it('fails on unexpected errors', async () => {
  await expect(
    getOutputForFixture(
      'OK',
      () => {
        throw new Error('ups');
      },
      'fixture.txt',
    ),
  ).rejects.toMatchInlineSnapshot(`[Error: ups]`);

  await expect(
    getOutputForFixture('OK', () => Promise.reject(new Error('ups')), 'fixture.txt'),
  ).rejects.toMatchInlineSnapshot(`[Error: ups]`);
});

it('throws when error is expected but none was thrown', async () => {
  await expect(
    getOutputForFixture('OK', (input) => input.toLowerCase(), 'fixture.error.txt'),
  ).rejects.toMatchSnapshot();

  await expect(
    getOutputForFixture('OK', (input) => Promise.resolve(input.toLowerCase()), 'fixture.error.txt'),
  ).rejects.toMatchSnapshot();
});

it('returns THROWN EXCEPTION when the operation is expected to fail and it fails', async () => {
  await expect(
    getOutputForFixture(
      'OK',
      () => {
        throw new Error('ups');
      },
      'fixture.error.txt',
    ),
  ).resolves.toMatchSnapshot();

  await expect(
    getOutputForFixture('OK', () => Promise.reject(new Error('ups')), 'fixture.error.txt'),
  ).resolves.toMatchSnapshot();
});
