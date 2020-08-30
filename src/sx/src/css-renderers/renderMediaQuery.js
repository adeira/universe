// @flow strict

import renderAtomicClasses from './renderAtomicClasses';

type Input = {|
  +className: string,
  +styleName: string,
  +styleValue: string,
  +pseudo?: string,
|};

export default function renderMediaQuery(
  mediaQuery: string,
  inputArray: $ReadOnlyArray<Input>,
): string {
  return `${mediaQuery}{${renderAtomicClasses(inputArray)}`;
}
