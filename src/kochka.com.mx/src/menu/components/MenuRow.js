// @flow

import React, { type Node } from 'react';
import { Heading, Money, Section } from '@adeira/sx-design';
import sx from '@adeira/sx';

type Props = {
  +title: Fbt,
  +description: FbtWithoutString,
  +price: RestrictedElement<typeof Money>,
  +volume?: number,
};

export default function MenuRow(props: Props): Node {
  return (
    <Section xstyle={styles.menuRow}>
      <div className={styles('titlePriceRow')}>
        <Heading>
          {props.title}
          {props.volume != null ? (
            <>
              {' '}
              <span className={styles('titleVolume')}>{props.volume} ml</span>
            </>
          ) : null}
        </Heading>
        <div>{props.price}</div>
      </div>
      <div className={styles('descriptionRow')}>{props.description}</div>
    </Section>
  );
}

const styles = sx.create({
  menuRow: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },
  titlePriceRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleVolume: {
    fontSize: 12,
    color: 'rgba(var(--sx-accent-6))',
  },
  descriptionRow: {
    fontSize: 12,
    color: 'rgba(var(--sx-accent-6))',
  },
});
