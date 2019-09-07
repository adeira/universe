// @flow strict

// See: https://github.com/babel/babel/issues/10134

const string = 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev';
const regex = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9.]+)\b/g;

it('should return capturing groups as expected', () => {
  const matches = [];
  // $FlowPullRequest: https://github.com/facebook/flow/pull/7812
  for (const match of string.matchAll(regex)) {
    matches.push(`${match[0]} at ${match.index} with '${match.input}'`);
    matches.push(`→ owner: ${match.groups.owner}`);
    matches.push(`→ repo: ${match.groups.repo}`);
  }
  expect(matches).toMatchInlineSnapshot(`
    Array [
      "tc39/ecma262 at 23 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'",
      "→ owner: tc39",
      "→ repo: ecma262",
      "v8/v8.dev at 36 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'",
      "→ owner: v8",
      "→ repo: v8.dev",
    ]
  `);
});

it('should work with manual iterator progressing', () => {
  // $FlowPullRequest: https://github.com/facebook/flow/pull/7812
  const matchesIterator = string.matchAll(regex);
  expect(matchesIterator.next().value.groups).toEqual({
    owner: 'tc39',
    repo: 'ecma262',
  });
  expect(matchesIterator.next().value.groups).toEqual({
    owner: 'v8',
    repo: 'v8.dev',
  });
});
