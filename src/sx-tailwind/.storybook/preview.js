import * as React from 'react';
import * as sx from '@adeira/sx';

export const decorators = [
  (Story: any): React.Node => (
    <>
      <Story />
      {sx.renderPageWithSX(() => null).styles[0]}
    </>
  ),
];
