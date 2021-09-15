---
id: shenanigans
title: Flow Shenanigans
sidebar_label: Shenanigans
---

:::note
Not every example here is a bug. Sometimes it's just unexpected behavior resulting from the type-system design or from type system theory in general.
:::

- https://gist.github.com/kangax/aa59598cf28d02f38579d8a95b5cbf92

## Dangerous array access

None of the typing systems can handle this correctly, all show no error during static analysis (but could be runtime error).

Flow ([pr](https://github.com/facebook/flow/pull/6823)):

```js
let a = [1, 2, 3];
let b: number = a[10]; // undefined
let c = b * 2;
```

Typescript ([issue](https://github.com/Microsoft/TypeScript/issues/13778)):

```js
let a = [1, 2, 3];
let b: number = a[10]; // undefined
let c = b * 2;
```

ReasonML:

```re
let a: array(int) = [|1, 2, 3|];
let b: int = a[10]  // undefined
let c = b * 2
```

## `boolean` is incompatible with `true | false`

```js
declare function foo(true | false): void;
declare function bar(): boolean;

foo(bar());
```

```
4: foo(bar())
       ^ Cannot call `foo` with `bar()` bound to the first parameter because: Either boolean [1] is incompatible with boolean literal `true` [2]. Or boolean [1] is incompatible with boolean literal `false` [3].
References:
2: declare function bar(): boolean                           ^ [1]
1: declare function foo(true | false): void
                        ^ [2]
1: declare function foo(true | false): void
                               ^ [3]
```

https://github.com/facebook/flow/issues/4196

## `mixed` type cannot be exhausted

```js
declare var flowDebugPrint: $Flow$DebugPrint;

function test(x: mixed) {
  if (typeof x === 'string') {
    return true;
  }
  flowDebugPrint(x); // still 'mixed', see the output 🤔
}
```

[flow.org/try](https://flow.org/try/#0CYUwxgNghgTiAEA3W8BmED2B3AIiARgK4DmACjAJYB2ALgFzwAkAYplo3kWZbQNwBQ-VISpgaFDFXg0QAZxoAKAB4MAthSUhgASngBvfvHgVU8BTQCeABxAZTS+AF5n8AOTyexV7oNGjcGkIYKRoYQhABIwBfQzQ2ThJyakUlbV54AHoM+HkKCAg3dU1gVwAaHJAEGgALBAxCGisG+EA+DcAUXf4YoA)

Debug output:

```json
{
  "reason": {
    "pos": {
      "source": "-",
      "type": "SourceFile",
      "start": { "line": 7, "column": 18 },
      "end": { "line": 7, "column": 18 }
    },
    "desc": "mixed"
  },
  "kind": "MixedT"
}
```

One solution is to manually define your custom mixed type which [can be exhausted](https://flow.org/try/#0PTAEAEDMBsHsHcBQiAuBPADgU1AWTbgJYAeWAJqALyiKigA+oAbrIRbQ6AHYCu00NOo14BbAEZYAToM4BnFJMJcA5jMZjYsaFgCGXNaADeAOlMBfAwEFJknWgA8+IqTIA+AwApTxnZOWyALjwCEnIAbQBdAEoqdydQsg46GgBjWC55UBxqDx0g+UUVABpmIPiXGMp3QzNkLA8AcgaSgEYoxHqmktz8hSVlErEg0QlJSuqzKKA).

## Incorrect array destructing

```js
const [w, a, t] = { p: '' }; // no error
```

[flow.org/try](https://flow.org/try/#0MYewdgzgLgBA2gdwDQwIYqgXRgXhgbwAcAuGAcjIF8BuIA)

On the other hand, TS is OK with this code (while Flow throws an error correctly):

```js
const foo: {} = '';
```

https://www.typescriptlang.org/play/index.html#code/MYewdgzgLgBAZiEAuGBvAvjAvDA5LgbiA

## Defaults for non-existent properties are allowed

```js
const React = require('react');

function Component({ defaultProp = 'string' }) {
  return null;
}

<Component />;
```

This is allowed even though some people would expect something like "Error, defaultProp is missing in props", it's a feature: https://github.com/facebook/flow/commit/6dec7d5dbbd12a6f210f7c3ae21841a932eb71a8 (from 0.109.0)

## Spreads don't preserve read-only-ness

```js
type A = {| +readOnlyKey: string |};
type B = {| ...A, +otherKey: string |};

function test(x: B) {
  x.readOnlyKey = 'overwrite'; // no error ?
  x.otherKey = 'overwrite'; // no error ??
}
```

This applies to value spreads as well since they are creating a new object. It's less understandable for these type spreads where value spread is not involved.
