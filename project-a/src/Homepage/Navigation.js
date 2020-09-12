// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fbt from 'fbt';

export default function Navigation(): React.Node {
  const router = useRouter();

  function getLinkProps(path: string) {
    const lang = router.query.lang; // TODO: wrap it and properly validate it!
    const linkProps = {
      href: lang == null ? path : `/[lang]${path}`,
      as: undefined,
    };
    if (lang != null) {
      linkProps.as = `/${lang}${path}`;
    }
    return linkProps;
  }

  return (
    <nav className={styles('nav')}>
      <ul className={styles('ul')}>
        <li className={styles('li')}>
          <Link {...getLinkProps('/menu')}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styles('link')}>
              <fbt desc="navigation link to our menu">Menu</fbt>
            </a>
          </Link>
        </li>

        <li className={styles('li')}>
          <Link {...getLinkProps('/rules')}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styles('link')}>
              <fbt desc="navigation link to rules" preserveWhitespace={true}>
                Our&nbsp;rules
              </fbt>
            </a>
          </Link>
        </li>

        {/* TODO (eventually): eshop, adoption */}
      </ul>
    </nav>
  );
}

const styles = sx.create({
  nav: {
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 100,
  },
  ul: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    padding: 0,
    margin: 0,
    fontSize: 30,
    borderBottom: '1px solid transparent',
  },
  link: {
    'textDecoration': 'none',
    'padding': 15,
    'paddingLeft': 20,
    'paddingRight': 20,
    ':hover': {
      borderBottom: '1px solid white',
    },
  },
});
