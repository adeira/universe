// @flow

/* global document */

import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Money from '../Money';
import LanguageTag from '../../LanguageTag';
import ViewerContextProvider from '../../ViewerContextProvider';

// https://reactjs.org/docs/testing-recipes.html

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body?.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container?.remove();
  container = null;
});

test.each`
  languageTag | amount | expected
  ${'en-US'}  | ${30}  | ${'MX$30.00'}
  ${'es-MX'}  | ${30}  | ${'$30.00'}
`(
  'renders amount "$amount" with language tag "$languageTag" correctly ("$expected")',
  ({ languageTag, amount, expected }) => {
    render(
      <ViewerContextProvider languageTag={LanguageTag.detectLanguageTag(languageTag)}>
        <Money amount={amount} />
      </ViewerContextProvider>,
      container,
    );
    expect(container?.innerHTML).toBe(expected);
  },
);
