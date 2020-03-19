// @flow strict

const a: ?boolean = true;
// $FlowExpectedError: sketchy-null-bool
if (a) {
  // sketchy because "a" could be either null or false
}

const b: ?number = 5;
// $FlowExpectedError: sketchy-null-number
if (b) {
  // sketchy because "b" could be either null or 0
}

const c: ?string = 'ok';
// $FlowExpectedError: sketchy-null-string
if (c) {
  // sketchy because "c" could be either null or ""
}

const d: ?mixed = new Date();
// $FlowExpectedError: sketchy-null-mixed
if (d) {
  // sketchy because "d" could be either null or falsey
}
