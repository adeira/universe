// @flow

import { render } from '@testing-library/react';
import React from 'react';
import '@adeira/sx-jest-snapshot-serializer';

import Link from '../Link';

it('renders the link as expected - internal link', () => {
  const { container } = render(<Link href="assets/yadada">internal link</Link>);
  expect(container).toMatchInlineSnapshot(`
    ._10tbCe {
      color: rgba(var(--sx-text-link-color));
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
      <a class="_10tbCe T4SJ0 v2kHO gy8aG crve5 _3zbYuf" href="assets/yadada">
        internal link
      </a>
    </div>
  `);
});

it('renders the link as expected - internal link with target _blank', () => {
  const { container } = render(
    <Link href="assets/yadada" target="_blank">
      internal link with target _blank
    </Link>,
  );
  // $FlowFixMe[prop-missing]: `attributes` is missing in the types but it works
  expect(container.firstChild?.attributes).toMatchInlineSnapshot(`
    NamedNodeMap {
      "class": "_10tbCe T4SJ0 v2kHO gy8aG crve5 _3zbYuf",
      "href": "assets/yadada",
      "rel": "noreferrer noopener",
      "target": "_blank",
    }
  `);
});

it('renders the link as expected - external link', () => {
  const { container } = render(<Link href="https://localhost">external link</Link>);
  expect(container).toMatchInlineSnapshot(`
    ._10tbCe {
      color: rgba(var(--sx-text-link-color));
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
        class="_10tbCe T4SJ0 v2kHO gy8aG crve5 _3zbYuf"
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
      link
    </Link>,
  );
  expect(ref.current).toBe(container.firstChild);
  expect(ref.current?.nodeName).toBe('A');
});
