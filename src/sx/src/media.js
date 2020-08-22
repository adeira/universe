// @flow strict

type MediaStyles = $FlowFixMe;

export default function media(mediaQuery: string, styles: $FlowFixMe): MediaStyles {
  return {
    __mediaQuery: {
      mediaQuery: mediaQuery.replace(/\s/g, ''),
      styles,
    },
  };
}
