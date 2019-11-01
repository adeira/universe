This packages originated from https://github.com/facebook/fbjs (cleaned up and tweaked for our use-case). It verifies automatically generated files and effectively prevents from manual pollution. Usage (simplified GraphQL schema snapshoting example):

```js
import SignedSource from '@adeira/signed-source';

// we can now save this signed file
const newSnapshot = SignedSource.signFile(`# ${SignedSource.getSigningToken()}\n\n${schema}`);

// or verify its content
const oldSnapshot = fs.readFileSync(' ... ');
if (!SignedSource.verifySignature(oldSnapshot)) {
  throw new Error('Manual changes detected!');
}
```

It is also possible to re-sign file which is already signed (means update the signature when it already exists).
