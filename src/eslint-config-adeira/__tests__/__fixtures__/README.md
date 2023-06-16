These fixtures are testing whether our rules are configured correctly. Directory `invalid-eslint-examples` should contain invalid code examples which suppressed errors/warnings like so:

```js
// eslint-disable-next-line curly
if (foo) foo++;
```

This way we can verify that the rule actually works since we are detecting unused `eslint-disable` comments.
