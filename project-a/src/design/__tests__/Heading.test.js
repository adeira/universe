// @flow

/* global document */

import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import prettier from 'prettier';

import Heading from '../Heading';
import Section from '../Section';

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

it('renders top level by default', () => {
  render(<Heading>level one</Heading>, container);
  expect(container?.innerHTML).toMatchInlineSnapshot(`"<h1>level one</h1>"`);
});

// <>
//   <Heading>level one</Heading>   -> h1
//   <Heading>level one</Heading>   -> h2
// </>
it.todo('renders H1 only once');

it('renders maximum 6 levels', () => {
  render(
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
    container,
  );
  expect(prettier.format(container?.innerHTML, { filepath: 'test.html' })).toMatchSnapshot();
});
