// @flow strict

type GenericStyleBuffer = {|
  +className: string,
  +styleName: string,
  +styleValue: string,
  +pseudo?: string,
|};

type Hash = string;

// Here we are collecting all the styles while doing SSR.
export const styleBuffer = (new Map(): Map<Hash, GenericStyleBuffer>);

// Here we are collecting all the styles while doing SSR for media queries.
export const mediaStyleBuffer = (new Map(): Map<
  string, // normalized media query
  Map<Hash, GenericStyleBuffer>,
>);
