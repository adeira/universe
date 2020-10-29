// @flow

import * as React from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import SyntaxHighlighter from '../components/SyntaxHighlighter';

export default function Homepage(): React.Node {
  return (
    <Layout title="Documentation">
      <H2>Install</H2>
      <SyntaxHighlighter language="bash">
        {`yarn add @adeira/sx-tailwind
yarn add --dev @adeira/babel-plugin-transform-sx-tailwind`}
      </SyntaxHighlighter>

      <H2>Babel config</H2>
      <SyntaxHighlighter language="jsx">
        {`{
  'plugins': ['@adeira/babel-plugin-transform-sx-tailwind']
}`}
      </SyntaxHighlighter>

      <H2>Usage</H2>
      <SyntaxHighlighter language="jsx">
        {`import { tailwind } from '@adeira/sx-tailwind';

export default function Button() {
  return (
    <button
      className={tailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')}
    >
      Button
    </button>
  );
}`}
      </SyntaxHighlighter>
    </Layout>
  );
}
