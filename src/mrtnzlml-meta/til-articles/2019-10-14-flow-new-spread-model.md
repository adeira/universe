---
title: 'Flow: The New Spread Model'
---

Part 1: https://medium.com/flow-type/coming-soon-changes-to-object-spreads-73204aef84e1<br/>
Part 2: https://medium.com/flow-type/spreads-common-errors-fixes-9701012e9d58

Necessary vocabulary:

- **Own property**. An "own property" of an object is a property that belongs to the object itself, as opposed to the property being accessible via the prototype chain.
- **Object spread**. Copies all of the own\* properties from an object expression into a location expecting key/value pairs.

\* Technically, spread only copies over all properties that are both own and enumerable, but enumerability is usually implied by own-ness. In Flow, we do not distinguish between an own enumerable property and own non-enumerable property.

## Before v0.106.0

Previous model was based on the runtime behavior of spreads. This implies the following assumptions:

1. Exact object types specify all own properties.
2. Inexact object types do not specify own-ness, and only specify a subset of accessible properties. _(this was changed in 0.106.0)_

```js
const o1: {| foo: number |} = { foo: 3 }; // OK
const o2: {| foo: number |} = Object.create({ foo: 3 }); // Error!

const o3: { foo: number, ... } = { foo: 3 }; // OK
const o4: { foo: number, ... } = { foo: 3, bar: 3 }; // OK
const o5: { foo: number, ... } = Object.create({ foo: 3 }); // OK
```

This leads to a very understandable behavior when using exact types:

```js
type OtherProps = {|
  buttonText: string,
|};
type Props = {|
  ...OtherProps,
  headerText: string,
|};

// Results in:
type Props = {|
  buttonText: string,
  headerText: string,
|};
```

However, inexact types are less straightforward (because of the second assumption about own-ness):

```js
type ButtonProps = {
  borderShade: number, // this becomes optional because of the own-ness asumption
  ...
};
type Props = {
  ...ButtonProps,
  borderWidth?: number,
  color: number,
  ...
};
```

> Since `ButtonProps` is inexact, we’re not sure if any of the properties will be copied over in the spread. Because of that, we make all of the properties it copies into `Props` **optional** just in case the properties are not own.

Another issue is that inexact objects to not specify all of their properties. Thus Flow makes another conservative approximation when spreading an inexact object types after other properties are already specified:

```js
type ButtonProps = {
  borderShade: number,
  ...
};
type InjectedProps = {
  transparency: number,
  ...
};
type Props = {
  ...ButtonProps,
  borderWidth?: number,
  color: number,
  ...InjectedProps,
  ...
};
```

> `InjectedProps` is inexact, so it may contain all of the properties specified before it in `Props`. Flow will conservatively assume it does to preserve soundness. Since they may be overwritten by properties with unspecified types in `InjectedProps`, all of the properties specified before the `InjectedProps` type is spread can only be inferred to have type **mixed**. And remember, `transparency` will be optional because InjectedProps is inexact.

## After v0.106.0

> In the new model, we change our fundamental assumptions about the various different object types in Flow. Most importantly for spreads, our new model has **inexact object types specify own properties**.

So new assumptions in this model are:

1. Exact object types specify all own properties. _(unchanged)_
2. Inexact object types specify a subset of own properties. Some properties may not be included, and we make no assumptions about the own-ness of unspecified properties.

Let's have a look at the previous examples with inexact types:

```js
type ButtonProps = {
  borderShade: number, // remains required ✅
  ...
};
type Props = {
  ...ButtonProps,
  borderWidth?: number,
  color: number,
  ...
};
```

And now example with the injected props:

```js
type ButtonProps = {
  borderShade: number,
  ...
};
type InjectedProps = {
  transparency: number,
  ...
};
type Props = {
  ...ButtonProps,
  borderWidth?: number,
  color: number,
  ...InjectedProps,
  ...
};
```

It will throw this error (versions before 0.106.0 would be OK with that):

```text
Cannot determine a type for Props [1]. InjectedProps [2] is inexact, so it may contain color with a type that conflicts
with color's definition in Props [1]. Can you make InjectedProps [2] exact?

 [1] 15│ type Props = {
     16│   ...ButtonProps,
     17│   borderWidth?: number,
     18│   color: number,
 [2] 19│   ...InjectedProps,
     20│   ...
     21│ };
     22│
```

[flow.org/try](https://flow.org/try/#0MYewdgzgLgBASgUwIbFgXhgJwQRwK4CW2AFAOTYpSkCUA3AFD1QCeADgjAEJ5RTgAKmEKwgwMAb3owYAIxCYAJgkwBlABZIlALhhg8AWxnKANFJgA6S-QC+DJmw4BJMACsEqBAsHDREs1EwkSFYkbDBgZh09QxMzS3MbOxZ2GG8RMRhJaXjuXgEhEVNpOUVlAHUCBSg1AH4ogyNMIphQABt5epimuMtnNw8vAohm+MTGYFakCFFcvjAYBAAPKAQwBVFESnMAYRB9VnBVqAAeWfyfAD5M63HJ6ZgAMXl9M-mllbWN5FQdvYOwI7HNIQK7iG70UCQWCsIY6YEZcQtEDtTA6UjQTAEMAAc1IMFsMAA9ISYNUCKIIGoQHhWgpdCBYEYYAB5ADS9CAA)

_Q_: I understand that the solution would be to make InjectedProps exact but what if you cannot? What is the strategy in this case? 🤔<br/>
_A_: It would be pretty funky for someone to inject props and _not_ be able to provide an exact object type. But if that’s the case, you can try spreading InjectedProps before the rest of the props. If that doesn’t work, then the HOC is probably doing something that Flow actually has trouble modeling.
