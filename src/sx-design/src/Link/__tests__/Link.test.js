/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import '@adeira/sx-jest-snapshot-serializer';
import fbt from 'fbt';

import Link from '../Link';
import { initFbt, render, fireEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders the link as expected - internal link', () => {
  const { container } = render(
    <Link href="assets/yadada">
      <fbt desc="internal link title" doNotExtract={true}>
        internal link
      </fbt>
    </Link>,
  );

  expect(container).toMatchInlineSnapshot(`
.f6wvk {
  color: rgba(var(--sx-link-text-color));
}
.T4SJ0 {
  cursor: pointer;
}
.v2kHO {
  text-decoration: none;
}
.gy8aG:hover {
  opacity: 1;
}
.crve5:hover {
  text-decoration: underline;
}
._3zbYuf {
  opacity: 0.85;
}

<div>
  <a class="f6wvk T4SJ0 v2kHO gy8aG crve5 _3zbYuf" href="assets/yadada">
    internal link
  </a>
</div>
`);
});

it('renders the link as expected - internal link with target _blank', () => {
  const { container } = render(
    <Link href="assets/yadada" target="_blank">
      <fbt desc="internal link with target title" doNotExtract={true}>
        internal link with target _blank
      </fbt>
    </Link>,
  );

  // $FlowFixMe[prop-missing]: `attributes` is missing in the types but it works
  expect(container.firstChild?.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "class": "f6wvk T4SJ0 v2kHO gy8aG crve5 _3zbYuf",
  "href": "assets/yadada",
  "rel": "noreferrer noopener",
  "target": "_blank",
}
`);
});

it('renders the link as expected - external link', () => {
  const { container } = render(
    <Link href="https://localhost">
      <fbt desc="external link title" doNotExtract={true}>
        external link
      </fbt>
    </Link>,
  );

  expect(container).toMatchInlineSnapshot(`
.f6wvk {
  color: rgba(var(--sx-link-text-color));
}
.T4SJ0 {
  cursor: pointer;
}
.v2kHO {
  text-decoration: none;
}
.gy8aG:hover {
  opacity: 1;
}
.crve5:hover {
  text-decoration: underline;
}
._3zbYuf {
  opacity: 0.85;
}

<div>
  <a
    class="f6wvk T4SJ0 v2kHO gy8aG crve5 _3zbYuf"
    href="https://localhost"
    rel="noreferrer noopener"
  >
    external link
  </a>
</div>
`);
});

it('forwards React refs as expected', () => {
  const ref = React.createRef();
  const { container } = render(
    <Link ref={ref} href="https://localhost">
      <fbt desc="link title" doNotExtract={true}>
        link
      </fbt>
    </Link>,
  );

  expect(ref.current).toBe(container.firstChild);
  expect(ref.current?.nodeName).toBe('A');
});

it('calls onClick event', () => {
  const onClickFn = jest.fn();

  const { getByText } = render(
    <Link href="https://localhost" onClick={onClickFn}>
      <fbt desc="link title" doNotExtract={true}>
        link with onClick callback
      </fbt>
    </Link>,
  );

  expect(getByText('link with onClick callback')).toBeDefined();
  expect(onClickFn).not.toHaveBeenCalled();

  fireEvent.click(getByText('link with onClick callback'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});
