// @flow strict

// Here we are collecting all the styles while doing SSR.
export default (new Map(): Map<
  string,
  {|
    +styleName: string,
    +styleValue: string,
    +pseudo?: string,
  |},
>);
