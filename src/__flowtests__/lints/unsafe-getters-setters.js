// @flow strict

/* eslint-disable */

export const o = {
  // $FlowExpectedError: unsafe-getters-setters
  get a() {
    return 4;
  },

  // $FlowExpectedError: unsafe-getters-setters
  set b(x: number) {
    this.c = x;
  },

  c: 10,
};
