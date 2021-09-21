// @flow

import Icon from '@adeira/icons';
import React, { useState, type Node } from 'react';
import sx from '@adeira/sx';

import LayoutBlock from '../Layout/LayoutBlock';
import LayoutInline from '../Layout/LayoutInline';
import Text from '../Text/Text';

type ChipValueType = string;

type Props = {
  +title: Fbt,
  +value: ChipValueType,
  +onChipClick?: (ChipValueType) => void,
  +prefix?: RestrictedElement<typeof Icon>,
  +description?: Fbt,
};

/**
 * Note: this component should not be exported and used directly. It's a low-level implementation
 * of the "chip" used in more high-level components like `FilterChip` for example.
 */
export default function Chip(props: Props): Node {
  const [isSelected, setIsSelected] = useState(false);

  const handleOnClick = () => {
    const onChipClickFn = props.onChipClick ?? ((_) => {});
    setIsSelected((prevState) => {
      onChipClickFn(props.value);
      return !prevState;
    });
  };

  const { description } = props;

  return (
    // eslint-disable-next-line react/forbid-elements
    <button
      type="button"
      onClick={handleOnClick}
      className={styles({
        chipBase: true,
        chipSelected: isSelected === true,
      })}
    >
      <LayoutInline spacing="none">
        <span className={styles('prefixIcon')}>{isSelected === true ? props.prefix : null}</span>
        {description != null ? (
          <LayoutBlock spacing="none">
            <span className={styles('chipChildrenWithDescription')}>{props.title}</span>
            <span className={styles('chipChildrenDescription')}>
              <Text as="small" size={12}>
                {description}
              </Text>
            </span>
          </LayoutBlock>
        ) : (
          <span className={styles('chipChildrenWithoutDescription')}>{props.title}</span>
        )}
      </LayoutInline>
    </button>
  );
}

const styles = sx.create({
  chipBase: {
    borderRadius: 'var(--sx-radius-large)',
    backgroundColor: 'rgba(var(--sx-background))',
    color: 'rgba(var(--sx-foreground))',
    border: '1px solid rgba(var(--sx-accent-2))',
    fontFamily: 'inherit',
    fontSize: '100%',
    cursor: 'pointer',
    lineHeight: 1.15,
  },
  chipSelected: {
    backgroundColor: 'rgba(var(--sx-accent-1))',
    border: '1px solid rgba(var(--sx-accent-2))',
  },
  prefixIcon: {
    verticalAlign: 'middle',
    fontSize: '1.5rem',
  },
  chipChildrenWithoutDescription: {
    padding: '.5rem',
  },
  chipChildrenWithDescription: {
    paddingBlockStart: '.5rem',
    paddingInline: '.5rem',
  },
  chipChildrenDescription: {
    paddingBlockEnd: '.5rem',
    color: 'rgba(var(--sx-accent-6))',
  },
});
