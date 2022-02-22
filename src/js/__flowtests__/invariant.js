// @flow

import { invariant } from '../src/index';

/* eslint-disable no-unused-vars,ft-flow/no-unused-expressions,no-constant-condition */

export function foo1(c: boolean): string {
  const y = c ? 5 : invariant();
  return 'default string';
}

export function foo2(c: boolean): string {
  c ? 5 : invariant(false);
  return 'default string';
}

export function foo3(c: boolean): string {
  const y = c ? invariant() : invariant(false);
  // $FlowExpectedError[unreachable-code]
  return 'default string';
}

export function foo4(c: boolean): string {
  const y = false ? 5 : invariant(false);
  return 'default string';
}

export function foo5(c: boolean): string {
  invariant();
  // $FlowExpectedError[unreachable-code]
  return 'default string';
}

export function foo6(c: boolean): string {
  invariant(false);
  // $FlowExpectedError[unreachable-code]
  return 'default string';
}

export function foo7(c: boolean): string {
  invariant(c);
  return 'default string';
}

export function foo8(c: boolean): string {
  return c ? 'a' : invariant();
}

export function foo9(c: boolean): string {
  // $FlowExpectedError[incompatible-return]: number is incompatible with string
  return c ? 1 : invariant();
}

export function foo10(c: boolean): string {
  return c ? invariant() : invariant();
}

export function foo11(): string {
  return invariant() ? 1 : 2;
}

// `||`
export function foo12(c: boolean): string {
  c || invariant();
  return 'default string';
}

export function foo13(c: boolean): string {
  c || invariant(false);
  return 'default string';
}

export function foo14(c: boolean): string {
  invariant() || c;
  // $FlowExpectedError[unreachable-code]
  return 'default string';
}

export function foo15(c: boolean): string {
  // $FlowExpectedError[incompatible-return]: return incompatible with string
  return c || invariant();
}

export function foo16(c: boolean): string {
  return invariant() || invariant();
}

// `&&`
export function foo17(c: boolean): string {
  c && invariant();
  return 'default string';
}

export function foo18(c: boolean): string {
  c && invariant(false);
  return 'default string';
}

export function foo19(c: boolean): string {
  invariant() && c;
  // $FlowExpectedError[unreachable-code]
  return 'default string';
}

export function foo20(c: boolean): string {
  // $FlowExpectedError[incompatible-return]: return incompatible with string
  return c && invariant();
}

export function foo21(c: boolean): string {
  return invariant() && invariant();
}

// `??`
export function foo22(c: boolean): string {
  c ?? invariant();
  return 'default string';
}

export function foo23(c: boolean): string {
  c ?? invariant(false);
  return 'default string';
}

export function foo24(c: boolean): string {
  invariant() ?? c;
  // $FlowExpectedError[unreachable-code]
  return 'default string';
}

export function foo25(c: ?boolean): string {
  // $FlowExpectedError[incompatible-return]: return incompatible with string
  return c ?? invariant();
}

export function foo26(c: ?string): string {
  return c ?? invariant(); // OK - either `c` is `string` or we throw
}

export function foo27(c: boolean): string {
  return invariant() && invariant();
}
