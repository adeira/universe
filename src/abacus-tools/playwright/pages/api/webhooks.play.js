// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('that the API webhooks endpoint works', async ({ request }) => {
  const response = await request.post('/api/webhooks', {
    data: {
      test: 'OK',
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual({
    test: 'OK',
  });
});
