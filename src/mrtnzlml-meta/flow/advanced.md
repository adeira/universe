```js
type A = { a: number };
type B = { b: boolean };
type C = { c: string };

// Intersection types are the opposite of union types!
const a: A & B & C = {
  a: 1,
  b: true,
  c: 'ok'
}

const b: $Exact<A> | $Exact<B> | $Exact<C> = {
  a: 1,
//  b: true,
//  c: 'ok'
}

const c: {
  ...{ a: number, b: string },
  a: string
} = {
  a: '1', // only string, no number
  b: '2'
}

const d: {|
  ...{| a: number, b: string |},
  a: string
|} = {
  a: '1', // works the same with exact types
  b: '2'
}

// Impossible type:
// const e: {| a: number |} & {| a: string |} = {
//   a: ???,
// }
```

No errors!
