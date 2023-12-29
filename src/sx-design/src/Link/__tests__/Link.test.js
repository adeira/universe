/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import '@adeira/sx-jest-snapshot-serializer';
import fbt from 'fbt';

import Link from '../Link';
import { initFbt, renderWithoutProviders } from '../../test-utils';

function isElementNode(node /*: any */) /*: node is Element */ {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node
  // https://developer.mozilla.org/en-US/docs/Web/API/Element
  return node.nodeType === Node.ELEMENT_NODE;
}

function getChild(container: HTMLElement): Element {
  if (isElementNode(container.firstChild)) {
    return container.firstChild;
  }
  throw new Error('Unexpected node type');
}

beforeEach(() => {
  initFbt();
});

it('renders the link as expected - internal link', () => {
  const { container } = renderWithoutProviders(
    <Link href="/assets/yadada">
      <fbt desc="internal link title" doNotExtract={true}>
        internal link
      </fbt>
    </Link>,
  );

  const child = getChild(container);
  expect(child).toHaveAttribute('href', '/assets/yadada');
  expect(child).not.toHaveAttribute('rel');
  expect(child).not.toHaveAttribute('target');
});

it('renders the link as expected - internal link with target _blank', () => {
  const { container } = renderWithoutProviders(
    <Link href="/assets/yadada" target="_blank">
      <fbt desc="internal link with target title" doNotExtract={true}>
        internal link with target _blank
      </fbt>
    </Link>,
  );

  const child = getChild(container);
  expect(child).toHaveAttribute('href', '/assets/yadada');
  expect(child).toHaveAttribute('rel', 'noreferrer noopener');
  expect(child).toHaveAttribute('target', '_blank');
});

it('renders the link as expected - external link', () => {
  const { container } = renderWithoutProviders(
    <Link href="https://localhost">
      <fbt desc="external link title" doNotExtract={true}>
        external link
      </fbt>
    </Link>,
  );

  const child = getChild(container);
  expect(child).toHaveAttribute('href', 'https://localhost');
  expect(child).toHaveAttribute('rel', 'noreferrer noopener');
  expect(child).not.toHaveAttribute('target');
});
