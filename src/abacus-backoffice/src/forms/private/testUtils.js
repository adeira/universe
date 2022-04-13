// @flow

import React from 'react';
import { init as FbtInit, IntlVariations as FbtIntlVariations } from 'fbt';
import { RecoilRoot } from 'recoil';
import { render } from '@testing-library/react'; // eslint-disable-line import/no-extraneous-dependencies
import { SxDesignProvider } from '@adeira/sx-design';

export function getAllAttributes(element: HTMLElement): { [string]: string } {
  // $FlowIssue[prop-missing]: `getAttributeNames` is missing
  return element.getAttributeNames().reduce(
    (obj, attrName) => ({
      ...obj,
      [attrName]: element.getAttribute(attrName),
    }),
    {},
  );
}

export function customRender(ui: $FlowFixMe, options: $FlowFixMe): $FlowFixMe {
  return render(ui, {
    wrapper: ({ children }) => {
      return (
        <RecoilRoot>
          <SxDesignProvider>{children}</SxDesignProvider>
        </RecoilRoot>
      );
    },
    ...options,
  });
}

export function initFbt(): void {
  FbtInit({
    translations: { 'en-US': {} },
    hooks: {
      getViewerContext: () => ({
        GENDER: FbtIntlVariations.GENDER_UNKNOWN,
        regionalLocale: 'en-US',
        locale: 'en-US',
      }),
    },
  });
}
