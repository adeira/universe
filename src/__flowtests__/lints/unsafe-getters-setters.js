// @flow strict

/* eslint-disable accessor-pairs */

export const ooo = {
  // $FlowExpectedError[unsafe-getters-setters]
  get a(): number {
    return 4;
  },

  // $FlowExpectedError[unsafe-getters-setters]
  set b(x: number): void {
    ooo.c = x;
  },

  c: 10,
};
