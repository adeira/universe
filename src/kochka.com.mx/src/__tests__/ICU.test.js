// @flow strict

// Purpose of this test is to verify whether our CI supports ICU features necessary for this project.
// See: https://nodejs.org/api/intl.html#intl_detecting_internationalization_support

it('supports ICU', () => {
  expect(typeof Intl === 'object').toBe(true);
  expect(typeof process.versions.icu === 'string').toBe(true);
});

it('supports full ICU', () => {
  const hasFullICU = (() => {
    try {
      const january = new Date(9e8);
      const spanish = new Intl.DateTimeFormat('es', { month: 'long' });
      return spanish.format(january) === 'enero';
    } catch (err) {
      return false;
    }
  })();

  expect(hasFullICU).toBe(true);
});
