Purpose of this package is to run additional checks of our monorepo outside of our test suite. Some of the tests are special (checking `package.json` or `CHANGELOG.md` structure for example) and tests runner cannot easily determine when to run these checks because they are outside of our defined workspaces. However, the situation is different in this _Monorepo Scanner_: we pass down changed files and every check can decide whether it's necessary to run the tests or not accurately.

This tool should help us to keep the monorepo in a good shape and moreover it should help our developers to write their applications properly (helps how to setup stuff, gives useful tips what to change and how).

We currently check these things:

- Is Babel configured correctly for Next.js applications?
- Are all applications defined in `src/apps` private for NPM?
- Do `CHANGELOG.md` files follow the expected format and latest changes?

# Usage

```text
yarn jest --config src/packages/monorepo-scanner/src/.jest.config.js
```

# Writing scans

We use Jest to run our scans so the actual scans are technically Jest tests. However, there are small differences. All the scans end with `*.scan.js` extension and we have special matcher (`.toGiveHelp`) to give useful helps to our devs. Example:

```js
const babelRC = {}; // get .babelrc somewhere
test('Babel configuration', () => {
  expect(babelRC.presets.includes('next/babel')).toGiveHelp(
    `Your Next.js application should contain '.babelrc' file with 'next/babel' preset.`,
  );
});
```
