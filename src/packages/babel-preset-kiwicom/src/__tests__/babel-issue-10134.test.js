// @flow strict

// Babel currently emits broken code (behavior), see:
// https://github.com/babel/babel/issues/10134

it('should retrun capturing groups as expected', () => {
  // THIS TEST IS CURRENTLY NOT CORRECT - check the issue ^^

  const string = 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev';
  const regex = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9.]+)\b/g;
  const matches = [];
  // $FlowPullRequest: https://github.com/facebook/flow/pull/7812
  for (const match of string.matchAll(regex)) {
    matches.push(`${match[0]} at ${match.index} with '${match.input}'`);
    expect(`→ owner: ${match.groups.owner}`).toBe('→ owner: undefined'); // this is currently broken
    expect(`→ repo: ${match.groups.repo}`).toBe('→ repo: undefined'); // this is currently broken
  }
  expect(matches).toMatchInlineSnapshot(`
    Array [
      "tc39/ecma262 at 23 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'",
      "v8/v8.dev at 36 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'",
    ]
  `);
});
