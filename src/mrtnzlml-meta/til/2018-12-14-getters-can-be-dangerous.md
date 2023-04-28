---
title: Getters can be dangerous
tags: ['javascript']
---

```js
// @flow

type x = {
  +address: ?{|
    +fullAddress: ?string,
  |},
};

class WTF {
  _address = {
    fullAddress: 'yay',
  };

  get address() {
    const addr = this._address;
    this._address = null;
    return addr;
  }
}

const y = new WTF();

// this is going to explode:
console.warn(y.address?.fullAddress && y.address.fullAddress);

// here is why:
// console.warn(
//   y.address,
//   y.address,
// );
```

source: https://github.com/facebook/flow/issues/5479#issuecomment-349749477

Unfortunatelly, Flow cannot uncover this version (which can also explode):

```js
{
  y.address && y.address.fullAddress && <Text>{y.address.fullAddress}</Text>;
}
```
