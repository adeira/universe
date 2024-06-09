// @flow

import React, { type Node } from 'react';

import './_global.css'; // This must exist even if empty for StyleX to work!

export const metadata = {
  title: 'mrtnzlml.com',
  description: 'Martin Zlámal',
};

type Props = {
  +children: Node,
};

export default function RootLayout({ children }: Props): Node {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
