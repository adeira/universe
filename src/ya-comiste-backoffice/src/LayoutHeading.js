// @flow

import React, { type Node } from 'react';
import sx, { type AllCSSProperties } from '@adeira/sx';

import Link from './Link';
import LinkButton from './LinkButton';
import StatusBar from './StatusBar';

type Props = {|
  +heading?: Node,
  +links?: $ReadOnlyArray<
    | {|
        // creates <a href="…" />
        +href: string,
        +title: FbtWithoutString,
      |}
    | {|
        // creates <button onClick="…" />
        +onClick: () => void,
        +confirmMessage: FbtWithoutString,
        +title: FbtWithoutString,
        +titleStyle?: AllCSSProperties,
      |},
  >,
|};

export default function LayoutHeading(props: Props): Node {
  const handleLinkButtonClick = (confirmMessage, callback) => {
    if (
      window.confirm(confirmMessage) // eslint-disable-line no-alert,no-undef
    ) {
      callback();
    }
  };

  return (
    <>
      <StatusBar />

      {props.heading ?? null}

      <div className={styles('links')}>
        {props.links
          ? props.links.map((link, index) => {
              return link.href != null ? (
                <Link key={index} href={link.href} xstyle={styles.link}>
                  {link.title}
                </Link>
              ) : (
                <LinkButton
                  key={index}
                  // $FlowIssue[prop-missing]: https://github.com/facebook/flow/issues/4772
                  onClick={() => handleLinkButtonClick(link.confirmMessage, link.onClick)}
                  xstyle={styles.link}
                >
                  {/* $FlowIssue[prop-missing]: https://github.com/facebook/flow/issues/4772 */}
                  <span className={sx(link.titleStyle)}>{link.title}</span>
                </LinkButton>
              );
            })
          : null}
      </div>
    </>
  );
}

const styles = sx.create({
  links: {
    marginBottom: '2rem',
  },
  link: {
    'cursor': 'pointer',
    'padding': '.5rem 1rem',
    'borderRadius': 4,
    'border': '1px solid #e9eff3',
    'backgroundColor': '#e9eff3',
    'marginRight': '.5rem',
    ':hover': {
      color: '#3b85ff',
    },
  },
});
