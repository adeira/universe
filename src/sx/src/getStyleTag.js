// @flow

import { compile, serialize, stringify, prefixer, middleware } from 'stylis';
import type { Element } from 'react';

import StyleCollector from './StyleCollector';

/**
 * Returns `<style />` tag expected by SX. It can be used for SSR of the styles but it can also be
 * omitted completely if you don't care about SSR.
 */
export default function getStyleTag(): Element<'style'> {
  const createStylesMarkup = () => {
    const cssStyles = serialize(compile(StyleCollector.print()), middleware([prefixer, stringify]));
    return { __html: cssStyles };
  };

  return (
    <style
      data-adeira-sx={true}
      // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
      dangerouslySetInnerHTML={createStylesMarkup()}
    />
  );
}
