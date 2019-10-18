---
id: shenanigans
title: Type Systems Shenanigans
sidebar_label: Shenanigans
---

Please note: not every example here is a bug. Sometimes it's just unexpected behavior resulting from the type-system design or from type system theory in general.

- https://gist.github.com/kangax/aa59598cf28d02f38579d8a95b5cbf92

## Generic

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

## Flow

### `boolean` is incompatible with `true | false`

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

### `mixed` type cannot be exhausted

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

### Incorrect array destructing

```js
const [w, a, t] = { p: '' }; // no error
```

[flow.org/try](https://flow.org/try/#0MYewdgzgLgBA2gdwDQwIYqgXRgXhgbwAcAuGAcjIF8BuIA)

On the other hand, TS is OK with this code (while Flow throws an error correctly):

```js
const foo: {} = '';
```

https://www.typescriptlang.org/play/index.html#code/MYewdgzgLgBAZiEAuGBvAvjAvDA5LgbiA

## Typescript shenanigans

### Exact types only on declaration

Typescript types are exact by default but only on declaration. This means it [won't catch](https://typescript-play.js.org/#code/C4TwDgpgBAqgzhATlAvFA3gKClArgxAOwEMBbCALijmEQEtCBzAGmyglOLoBsqb6mmAL6ZMAYwD2hGngIBGKvCSoMbAHQb0spCXJUA5AA99UIcyjrN7TjwMgTZy2q2HXdh6xwhv78zgD0-lAAPKFQUtwgUMAAFnRwUABmXNxwwqKS0sDaiABMigQqWDgazjm6lFBGHhYlVhwp7qaeUKUublX2zelAA) cases like this:

```ts
type User = {
  username: string;
  email: string;
};

const user1: User = {
  ...{ username: 'x' },
  ...{ email: 'y' },
  ...{ xxx: 'y' },
  yyy: 'y', // <<< only this fails
};

const user2: User = {
  ...{ username: 'x' },
  ...{ email: 'y' },
  ...{ xxx: 'y' },
};
```

Flow doesn't have exact types by default (yet) but it can [handle these cases better](https://flow.org/try/#0C4TwDgpgBAqgzhATlAvFA3gHwFBSgVwUQDsBDAWwgC4o5hEBLYgcwBpcoJzSGAbGuoxbZMAX2zYAxgHtidAkQCMNeElQYOAOm3oFSMpRoByAB5Goo1lC07O3PsZDnLNzbpMfHz9nhB+vVngA9EFQADwRULK8IFDAABYMcFAAZjy8cNjiUrLyhEgATCpE6uiuuvkkFNRQpt7WeNpuduleFj5QTe6etU7tWdhAA):

```js
type User = {|
  username: string,
  email: string,
|};

const user1: User = {
  ...{ username: 'x' },
  ...{ email: 'y' },
  ...{ xxx: 'y' }, // <<< this fails
  yyy: 'y', // <<< this fails
};

const user2: User = {
  ...{ username: 'x' },
  ...{ email: 'y' },
  ...{ xxx: 'y' }, // <<< this fails
};
```

```text
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/test.js:8:21

Cannot assign object literal to user1 because:
 • property xxx is missing in User [1] but exists in object literal [2].
 • property yyy is missing in User [1] but exists in object literal [2].

         5│   email: string,
         6│ |};
         7│
 [1][2]  8│ const user1: User = {
         9│   ...{ username: 'x' },
        10│   ...{ email: 'y' },
        11│   ...{ xxx: 'y' },
        12│   yyy: 'y', // <<< only this fails
        13│ };
        14│
        15│ const user2: User = {
        16│   ...{ username: 'x' },


Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/test.js:15:21

Cannot assign object literal to user2 because property xxx is missing in User [1] but exists in object literal [2].

        12│   yyy: 'y', // <<< only this fails
        13│ };
        14│
 [1][2] 15│ const user2: User = {
        16│   ...{ username: 'x' },
        17│   ...{ email: 'y' },
        18│   ...{ xxx: 'y' },
        19│ };
        20│



Found 3 errors
```

### Incorrect constructor instance

JS operator `new` doesn't guarantee the instance type so obviously. This probably results from structural TS typechecking:

```js
class Logger {
  constructor() {
    return new Error('test');
  }
}

const logger = new Logger();
console.warn(logger instanceof Logger); // false
console.warn(logger instanceof Error); // true
```

Logger is in this case instance of `Error`. Therefore, you can access `logger.message`. But TS doesn't understand this very well and [incorrectly assumes](http://www.typescriptlang.org/play/index.html#code/MYGwhgzhAEAyD2BzRBTATtA3gKGtY8AdhAC5oCuwJ8aAFAJRa57RoonlqHSEoDu0AKJo0NWgHISKUuPoBuZgF9sy7AWIloIJKgwBeHvzg70DBeojwQKAHR8wXWtuTpoASw1hCwFPABmxi5o8tAA9KHQfmAgEChqRJbWdg6ETiYYHqRePv5CIjQh4dBk5HEWVrb2js66NgC20hBgqPTYQA) that `new Logger` is instance of `Logger`. But, you don't have guarantee that `new Logger` will return `Logger` instance without spinning will blown typechecking. This is why Flow requires the explicit annotation in types-first architecture like so:

```js
export default new Logger();
// after 'flow autofix exports':
export default (new Logger(): Logger);
```
