---
id: money
title: Dealing with Money in JavaScript
sidebar_label: Money "how to"
---

The type for `amount` in `Money` entity is _string_ and this is because it's not recommended to work with floats in your application when working with money (try the infamous `0.1 + 0.2 === 0.3` in your JavaScript console). If you need to perform any operation with the amount returned by the GraphQL proxy, you will need to parse it.

```text
💃 universe [master] node -e "console.log(0.1 + 0.2)"
0.30000000000000004
💃 universe [master] node -e "console.log(0.1 + 0.2 === 0.3)"
false
```

One way to circumvent this problem could be to use [decimal.js](https://github.com/MikeMcl/decimal.js/) which provides many methods to deal with decimal numbers in JavaScript.

Another way, more specific to dealing with money, is to perform computations in _cents_ instead of _euros_ to go back into the realm of integers. For example, it is better to represent _€ 50.00_ as _€c 5000_. That means this is highly dependent on the minor currency units, if they exist.

[Dinero.js](https://sarahdayan.github.io/dinero.js/) is a library that aims to solve this problem by providing a `Money` object to JavaScript, just like there is a `Date` object.

Excerpt from the README of Dinero.js:

> Dinero.js makes it easy to create, calculate and format monetary values in JavaScript. You can perform arithmetic operations, extensively parse and format them, check for a number of things to make your own development process easier and safer.
