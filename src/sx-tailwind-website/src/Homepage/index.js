// @flow

import type { Node } from 'react';

import Layout from '../components/Layout';
import H2 from '../components/H2';
import P from '../components/P';
import Link from '../components/Link';
import Code from '../components/Code';

export default function Homepage(): Node {
  return (
    <Layout title="Intro">
      <P>
        <strong>SX Tailwind</strong> is a CSS-in-JS library for React, copying the approach of the{' '}
        <Link href="https://tailwindcss.com/">CSS framework Tailwind</Link>. The CSS-in-JS itself is
        provided by the <Link href="https://github.com/adeira/sx">SX library</Link>. Atomic
        stylesheets in SX and utility-first in Tailwind CSS are essentially the same approaches, and
        this allows the benefits of both to be combined.
      </P>

      <H2>Simpler setup</H2>
      <P>
        Thanks to a pure JS implementation, it is{' '}
        <Link href="/tailwind-css">much easier to start</Link> using SX Tailwind thanks to skipping
        PostCSS. And there is no need to configure{' '}
        <Link href="https://purgecss.com/">PurgeCSS</Link> either, the resulting CSS will always be
        optimal.
      </P>

      <H2>Type safety</H2>
      <P>Less typos and debugging thanks to generated types for all CSS classes.</P>

      <H2>Easy onboarding</H2>
      <P>
        There&apos;s no need to learn anything new if you already know Tailwind CSS and React. Where
        in HTML you wrote <Code>{`class="text-gray-900"`}</Code> you&apos;ll write{' '}
        <Code>{`sxt="text-gray-900"`}</Code> in React.
      </P>
      <P>
        See for yourself in the{' '}
        <Link href="https://github.com/adeira/sx-tailwind-website">
          source code of this website
        </Link>
        .
      </P>
    </Layout>
  );
}
