---
title: Difference between Object.preventExtensions/seal/freeze
tags: ['javascript']
---

All tested with `node --use_strict` (to prevent silent errors).

```js
const obj = { a: 1 };
Object.preventExtensions(obj);
obj.b = 2; // TypeError: Cannot add property b, object is not extensible ❌
obj.a = -1; // ✅
delete obj.a; // ✅

Object.getOwnPropertyDescriptors(obj); // { a: { value: 1, writable: true, enumerable: true, configurable: true } }
```

```js
const obj = { a: 1 };
Object.seal(obj);
obj.b = 2; // TypeError: Cannot add property b, object is not extensible ❌
obj.a = -1; // ✅
delete obj.a; // TypeError: Cannot delete property 'a' of #<Object> ❌

Object.getOwnPropertyDescriptors(obj); // { a: { value: 1, writable: true, enumerable: true, configurable: false } }
```

```js
const obj = { a: 1 };
Object.freeze(obj);
obj.b = 2; // TypeError: Cannot add property b, object is not extensible ❌
obj.a = -1; // TypeError: Cannot assign to read only property 'a' of object '#<Object>' ❌
delete obj.a; // TypeError: Cannot delete property 'a' of #<Object> ❌

Object.getOwnPropertyDescriptors(obj); // { a: { value: 1, writable: false, enumerable: true, configurable: false } }

// You can basically only read:
console.log(obj.a);
```

Note: Flow tracks these flags on objects: `frozen`, `sealed` and `exact`.
