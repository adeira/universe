/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import '@adeira/sx-jest-snapshot-serializer';

import Heading from '../Heading';
import Section from '../../Section/Section';

it('renders top level by default', () => {
  const { container } = render(<Heading>level one</Heading>);
  expect(container.firstChild).toMatchInlineSnapshot(`
    ._1cJrQ0 {
      color: rgba(var(--sx-foreground));
    }

    <h1 class="_1cJrQ0">level one</h1>
  `);
});

it('renders H1 tags in parallel', () => {
  const { container } = render(
    <>
      <Heading>level one</Heading>
      <Heading>level one</Heading>
    </>,
  );
  expect(container).toMatchInlineSnapshot(`
    ._1cJrQ0 {
      color: rgba(var(--sx-foreground));
    }

    <div>
      <h1 class="_1cJrQ0">level one</h1>
      <h1 class="_1cJrQ0">level one</h1>
    </div>
  `);
});

// <Heading>
//   <Heading>level one</Heading>
// </Heading>
it.todo("doesn't allow nested headers");

it('renders maximum 6 levels', () => {
  const { container } = render(
    <>
      <Heading>level one</Heading>
      <Section>
        <Heading>level two</Heading>
        <Section>
          <Heading>level three</Heading>
          <Section>
            <Heading>level four</Heading>
            <Section>
              <Heading>level five</Heading>
              <Section>
                <Heading>level six</Heading>
                <Section>
                  <Heading>level six again</Heading>
                  <Heading>level six again</Heading>
                </Section>
                <Heading>level six</Heading>
              </Section>
              <Heading>level five</Heading>
            </Section>
            <Heading>level four</Heading>
          </Section>
          <Heading>level three</Heading>
        </Section>
        <Heading>level two</Heading>
      </Section>
    </>,
  );

  expect(container).toMatchInlineSnapshot(`
    ._1cJrQ0 {
      color: rgba(var(--sx-foreground));
    }

    <div>
      <h1 class="_1cJrQ0">level one</h1>
      <section class="_1cJrQ0">
        <h2 class="_1cJrQ0">level two</h2>
        <section class="_1cJrQ0">
          <h3 class="_1cJrQ0">level three</h3>
          <section class="_1cJrQ0">
            <h4 class="_1cJrQ0">level four</h4>
            <section class="_1cJrQ0">
              <h5 class="_1cJrQ0">level five</h5>
              <section class="_1cJrQ0">
                <h6 class="_1cJrQ0">level six</h6>
                <section class="_1cJrQ0">
                  <h6 class="_1cJrQ0">level six again</h6>
                  <h6 class="_1cJrQ0">level six again</h6>
                </section>
                <h6 class="_1cJrQ0">level six</h6>
              </section>
              <h5 class="_1cJrQ0">level five</h5>
            </section>
            <h4 class="_1cJrQ0">level four</h4>
          </section>
          <h3 class="_1cJrQ0">level three</h3>
        </section>
        <h2 class="_1cJrQ0">level two</h2>
      </section>
    </div>
  `);
});
