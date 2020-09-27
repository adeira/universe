// @flow strict

type Input = {|
  +className: string,
  +styleName: string,
  +styleValue: string,
  +pseudo?: string,
  +bumpSpecificity?: boolean,
|};

export default function renderAtomicClass({
  className,
  styleName,
  styleValue,
  pseudo,
  bumpSpecificity,
}: Input): string {
  const classSelector = `.${className}`.repeat(bumpSpecificity === true ? 2 : 1);
  return `${classSelector}${pseudo ?? ''}{${styleName}:${styleValue}}`;
}
