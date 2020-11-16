// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import CodeBlock from '../components/CodeBlock';

export default function Documentation(): Node {
  return (
    <Layout title="Documentation">
      <H2>Install</H2>
      <CodeBlock language="bash">
        {`yarn add @adeira/sx-tailwind
yarn add --dev @adeira/babel-plugin-transform-sx-tailwind`}
      </CodeBlock>

      <H2>Babel config</H2>
      <CodeBlock>
        {`{
  'plugins': ['@adeira/babel-plugin-transform-sx-tailwind']
}`}
      </CodeBlock>

      <H2>Usage</H2>
      <CodeBlock>
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
      </CodeBlock>
    </Layout>
  );
}
