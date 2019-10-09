// @flow strict

// $FlowExpectedError: sketchy-null-bool
const a: ?boolean = true;
if (a) {
  // sketchy because "a" could be either null or false
}

// $FlowExpectedError: sketchy-null-number
const b: ?number = 5;
if (b) {
  // sketchy because "b" could be either null or 0
}

// $FlowExpectedError: sketchy-null-string
const c: ?string = 'ok';
if (c) {
  // sketchy because "c" could be either null or ""
}

// $FlowExpectedError: sketchy-null-mixed
const d: ?mixed = new Date();
if (d) {
  // sketchy because "d" could be either null or falsey
}
