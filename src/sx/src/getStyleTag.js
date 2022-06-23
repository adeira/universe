// @flow

import type { Element } from 'react';

import StyleCollector from './StyleCollector';

/**
 * Returns `<style />` tag expected by SX. It can be used for SSR of the styles but it can also be
 * omitted completely if you don't care about SSR.
 */
export default function getStyleTag(): Element<'style'> {
  const createStylesMarkup = () => {
    return {
      __html: StyleCollector.print(),
    };
  };

  return (
    <style
      data-adeira-sx={true}
      // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
      dangerouslySetInnerHTML={createStylesMarkup()}
    />
  );
}
