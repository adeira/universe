// @flow

import * as React from 'react';
import { render } from '@testing-library/react';
import prettier from 'prettier';

import Heading from '../Heading';
import Section from '../../Section/Section';

it('renders top level by default', () => {
  const { container } = render(<Heading>level one</Heading>);
  expect(container.innerHTML).toMatchInlineSnapshot(`"<h1 class=\\"_1cJrQ0\\">level one</h1>"`);
});

it('renders H1 tags in parallel', () => {
  const { container } = render(
    <>
      <Heading>level one</Heading>
      <Heading>level one</Heading>
    </>,
  );
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<h1 class=\\"_1cJrQ0\\">level one</h1><h1 class=\\"_1cJrQ0\\">level one</h1>"`,
  );
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

  expect(
    prettier.format(container.innerHTML, {
      filepath: 'test.html',
    }),
  ).toMatchSnapshot();
});
