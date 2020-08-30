// @flow strict

type Input = {|
  +className: string,
  +styleName: string,
  +styleValue: string,
  +pseudo?: string,
|};

export default function renderAtomicClass({
  className,
  styleName,
  styleValue,
  pseudo,
}: Input): string {
  return `.${className}${pseudo ?? ''}{${styleName}:${styleValue}}`;
}
