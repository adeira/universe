// @flow

import fbt from 'fbt';
import Icon from '@adeira/icons';
import React, { useState, type Node } from 'react';
import sx from '@adeira/sx';

import Button from '../Button/Button';
import MenuItem from './MenuItem';
import MenuItemDivider from './MenuItemDivider';
import SxDesignPortal from '../SxDesignPortal';

type AllowedChildren =
  | RestrictedElement<typeof MenuItem>
  | RestrictedElement<typeof MenuItemDivider>
  | $ReadOnlyArray<AllowedChildren>;

type Props = {
  +children: AllowedChildren,
};

/**
 * TODO: render in a `Drawer` for small viewports (see `ModalDrawer`)
 * TODO: use positioning algorithm similar to `Tooltip` (reuse)
 * TODO: accessibility (https://www.w3.org/TR/wai-aria-practices-1.1/#menu)
 */
export default function Menu(props: Props): Node {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <Button
        tint="secondary"
        aria-label={<fbt desc="open menu button">open menu</fbt>}
        size="small"
        onClick={handleButtonClick}
      >
        <Icon name="menu_vertical" />
      </Button>

      <SxDesignPortal>
        {isMenuOpen === true ? <div className={styles('menuWrapper')}>{props.children}</div> : null}
      </SxDesignPortal>
    </>
  );
}

Menu.Item = MenuItem;
Menu.ItemDivider = MenuItemDivider;

const styles = sx.create({
  menuWrapper: {
    marginBlockStart: 5,
    border: '1px solid rgba(var(--sx-accent-1))',
    boxShadow: 'var(--sx-shadow-small)',
    borderRadius: 'var(--sx-radius)',
    maxWidth: 200,
  },
});
