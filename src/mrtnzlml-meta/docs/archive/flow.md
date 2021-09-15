---
id: typescript
title: TypeScript Archive
sidebar_label: TypeScript Archive
---

:::danger deprecated
I am no longer using TypeScript, so I am unable to keep with the latest TS changes and keep this section updated.
:::

## Typescript Shenanigans

### Errors 😢👎

By far the worst error message experience in any tool I use on daily basis:

![typescript error example](/img/typescript-error.png)

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

Logger is in this case instance of `Error`. Therefore, you can access `logger.message`. But TS doesn't understand this very well and [incorrectly assumes](http://www.typescriptlang.org/play/index.html#code/MYGwhgzhAEAyD2BzRBTATtA3gKGtY8AdhAC5oCuwJ8aAFAJRa57RoonlqHSEoDu0AKJo0NWgHISKUuPoBuZgF9sy7AWIloIJKgwBeHvzg70DBeojwQKAHR8wXWtuTpoASw1hCwFPABmxi5o8tAA9KHQfmAgEChqRJbWdg6ETiYYHqRePv5CIjQh4dBk5HEWVrb2js66NgC20hBgqPTYQA) that `new Logger` is always instance of `Logger`. But, you don't have guarantee that `new Logger` will return `Logger` instance without spinning full-blown typechecking. This is why Flow requires the explicit annotation in types-first architecture like so:

```js
export default new Logger();
// after 'flow autofix exports':
export default (new Logger(): Logger);
```

### Incorrect `JSON.stringify` output type

```ts
const x = JSON.stringify(undefined);
x.toLowerCase();
```

TS [incorrectly assumes](http://www.typescriptlang.org/play/index.html?ssl=1&ssc=1&pln=3&pc=1#code/MYewdgzgLgBAHjAvDAUgZQPIDkB00BOAlmAOaEBmAngBQCuYAJgKbnFMMCUAUHDlCABkQAdyb4AwgEMITahwDcXIA) this code is safe. It would, however, result in `TypeError`:

```text
> const x = JSON.stringify(undefined);
undefined
> x.toLowerCase();
Thrown:
TypeError: Cannot read property 'toLowerCase' of undefined
```

It's because `JSON.stringify` returns `undefiend` in this case.

### TS doesn't make a difference between arrays and objects

Patterns like this one are fine from TS perspective (probably because of structural TS typechecking):

```ts
interface Foo {
  [id: number]: string;
}
const a: Foo = ['aaa', 'bbb', 'ccc'];
```

However, it doesn't have to be what developers expect (even though it's correct from the JS perspective). Other type systems follow the difference between these types which gives you more confidence since you cannot return array where you'd expect an object and work with it later (which will most likely break since the types are quite different).

So, how do you annotate _"object with numerical indexer, not an array"_? :thinking:

### Accidental global access

It's very easy to access and use global variables like `length` or `name` (simple refactoring mistake) and there is not way how to prevent this, see: https://github.com/microsoft/TypeScript/issues/14306

This is a common mistake even in large companies:

> We have also been bitten by the 'name' thing at Google, and have also been considering patching it out of our lib.d.ts. I think the fix that behaves how TypeScript does is to split the standard library up further so that a project can opt in or out from the global declarations.

### Too basic refinement

This one is really frustrating. TS forces developers to write incorrect code because of the basic refinement. For [example](https://www.typescriptlang.org/play/?ssl=31&ssc=85&pln=31&pc=66#code/C4TwDgpgBANhCGATAIhY8CWMDOB5SAdhIgPrABO8AxgNYYEDmJcSAJIvOlALxQDeAKCjCo5BIgD2BGCCiRy2KQC4oACkEjNo8VJlQSZcBALwAthBUAiAAoQFUywG4hW4WKS7ZJ8yuwV6DFAAPlAEAK4wMM6aAL7B-C6u7pLSsgaghGYWUJYAMuK29gROiVrJnqFZvv6M8eGR0SJxIRquUAD0AFQAKgAWGNhQAO5YMKEQAG52UABG0ADkAKQSwL128wA0s2HAw9BExFCK5qWaE-AwYdD0UFTw2PtS0BIAZlCr0FRSVGLA0OeXCCDUycKi9AB0nXapxE5VS+kMmR8OWWH3IJViAEo6hEogIYs4BC8wgQqMAMFIoL17oVFAQAHJZEgARlU8jpKhYKDQmBw+GMxDIlFoAWY4nYnHgAG15uypPMALrYwQASAwbzZdjpAH5wekjN5oNxjVB5rT5cEQnKCLr9UijSb5vkkOaCPNlQIVSrfmFyAQ5FqpODDVAAIS8epRDrtKC4ADSWxmO1uElMYBgGDuf0QwwwqygIIIsgyQM9MU9Pr9UBeFweznLRJJZIp-up2FdjPMJAATJqipzxKh0Fg8IRBRRqHRGGK2Bx0DLrYqPWqNdbdW3cEMCNZyBJ5KBVPNDe7l960L7-dbg1kwxHcY5o1Ad3u7KBTceoJIgaEVlAIAAPAZdkpEtTT4bQPHhO1jCqFEVjWdEHxieYoEAPg3AApdssK3PKsaxwCB6wERtSXJSk2w7JkAGY+w5WBBx5Ed+SIUgJxFacuQledZUDN0lQSFc1GtKAADJhPfLIUJua1T0rS8eOvcxb1Ce9H3jRNkzzeZBgIX8hmpXYAElhngAhszUXpgGAMBsCUdp2j8ScJCmcgXhgCQhnBL5THaABHK4-BbbB2mZSiADZKO7ABOaL2nVABaGgIBAOL6DiiQZgAKwgMk0vIFKXnSrKcrbdyCDAXd9xARKQExLCz2AC9q1rAj8SI4kSJbKkaR4zsIBIAAWGjlDopAh15UcBRY4UpyYDi52lbiiiXfj1UEnjdRDcNlMiZVH2fSrxPMFCv2038AKAqAQKMMCIJSPRoMNKxUQQpwoGQtDMK9WSAyKBToC2yMHzsp8KtfWQjwkz8JG-HTdnOvxLv9UD5nAuF7sRGDkUsZ67Fe96MLq768LrVqgA):

```ts
type leadDetailsOpened_tracking_lead$data = {
  readonly person:
    | (
        | {
            readonly __typename: 'Person';
            readonly name: string | null;
          }
        | {
            readonly __typename: 'LeadPerson';
            readonly name: string | null;
          }
        | {
            /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
            readonly __typename: '%other';
          }
      )
    | null;
};

function hasPersonName_1(person: leadDetailsOpened_tracking_lead$data['person']) {
  if (person?.__typename === 'Person' || person?.__typename === 'LeadPerson') {
    return person.name != null; // OK, but complicated with many types
  }
  return false;
}

function hasPersonName_2(person: leadDetailsOpened_tracking_lead$data['person']) {
  if (person?.hasOwnProperty('name')) {
    return person.name != null; // Property 'name' does not exist on type '{ readonly __typename: "%other"; }' 🤨
  }
  return false;
}

function hasPersonName_3(person: leadDetailsOpened_tracking_lead$data['person']) {
  if (person && 'name' in person) {
    return person.name != null; // OK, but it's not what I wanted (https://stackoverflow.com/questions/13632999/if-key-in-object-or-ifobject-hasownpropertykey)
  }
  return false;
}

function hasPersonName_4(person: leadDetailsOpened_tracking_lead$data['person']) {
  if (person?.name != null) {
    // Property 'name' does not exist on type '{ readonly __typename: "%other"; }' 🤨
    return person.name != null; // Property 'name' does not exist on type '{ readonly __typename: "%other"; }' 🤨
  }
  return false;
}
```

Explanation (with a possible workaround): https://stackoverflow.com/a/59200046/12646420

### Void is unsound in TS

```typescript
type MyFunc = () => void;

const f1: MyFunc = () => null;
const f2: MyFunc = () => 'string'; // 🤨
const f3: MyFunc = () => 1; // 🤨
const f4: MyFunc = () => true; // 🤨

let myVar: void;

myVar = null; // ❌ Type 'null' is not assignable to type 'void'.
myVar = undefined; // ✅
myVar = 'string'; // ❌ Type '"string"' is not assignable to type 'void'.
myVar = f2(); // ✅ 😱
```

https://www.typescriptlang.org/play/?ssl=1&ssc=1&pln=15&pc=1#code/C4TwDgpgBAsiBiBXAdgYygXigCgJSYD4oA3AewEsATAbgFgAoB1U5AZ2CgDMBGALlgQp0WPISjJEAG0l16zNh04AmfnCRpMOfBiIBydgCdyyAOa7qUAPSWogPg3AFLtMW7LgGZVgjSO1FuF63aOcs6KACwe6sJaYsAGiBD+Ng4MKfSSEBwAtiAAagCGBvxkVLIM2fkGmhLSiVCAMuRQACrg0LrVkrpQ5KzipBx5rKzkJsh5AEbpUMCkUy1QusWUugB0ZbkFmiiUEJzGEDRWNoCg5GsVmvqxxma1Dc2Q8wBEhlcPnd29-YPDoxPQ07P3BYUJarejlDZYZR4WpHKCAXg3AIx7DCAA
