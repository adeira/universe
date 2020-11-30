Modified [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) algorithm returning base62 of murmur hash. This code was originally taken from [Relay utils](https://github.com/facebook/relay/blob/4f5d549f5276067595838b48ab3f3925fee174f7/packages/relay-compiler/util/murmurHash.js).

Read more about MurmurHash in this Stack Overflow question: [MurmurHash - what is it?](https://stackoverflow.com/q/11899616/12646420)

# Install

```text
yarn add @adeira/murmur-hash
```

Optionally, install TS types (Flow types are included by default):

```text
yarn add --dev @types/adeira__murmur-hash
```

# Basic usage

```js
import murmurHash from '@adeira/murmur-hash';

const data = { arg: { count: 20, start: 0, end: 5 } };
const hash = murmurHash(JSON.stringify(data));
console.log(hash); // 4gykY2
```
