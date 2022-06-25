// @flow

import React from 'react';
import { RecoilRoot } from 'recoil';
import { render } from '@testing-library/react'; // eslint-disable-line import/no-extraneous-dependencies
import { SxDesignProvider } from '@adeira/sx-design';

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

export function customRenderWithoutErrorBoundary(ui: $FlowFixMe, options: $FlowFixMe): $FlowFixMe {
  return render(ui, {
    wrapper: ({ children }) => {
      return (
        <RecoilRoot>
          <SxDesignProvider disableErrorBoundary={true}>{children}</SxDesignProvider>
        </RecoilRoot>
      );
    },
    ...options,
  });
}
