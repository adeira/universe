// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fbt from 'fbt';

export default function HomepageNavigation(): React.Node {
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
        <Link {...getLinkProps('/rules')}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles('link')}>
            <li className={styles('li')}>
              <fbt desc="navigation link to rules">Our rules</fbt>
            </li>
          </a>
        </Link>

        <Link {...getLinkProps('/cats')}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles('link')}>
            <li className={styles('li')}>
              <fbt desc="navigation link to our cats">Our cats</fbt>
            </li>
          </a>
        </Link>

        {/* TODO: social networks */}
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
    'padding': 15,
    'fontSize': 30,
    'borderBottom': '1px solid transparent',
    ':hover': {
      borderBottom: '1px solid white',
    },
  },
  link: {
    textDecoration: 'none',
  },
});
