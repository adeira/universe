// @flow

import React, { useState, type Node } from 'react';
import fbt from 'fbt';
import Icon from '@adeira/icons';
import sx from '@adeira/sx';
import { Button, MediaQueryDevice, Modal } from '@adeira/sx-design';

import NavigationLinks from './NavigationLinks';

/**
 * This component is responsible for the main navigation in our header. Additionally, it takes care
 * of small displays (mobile for example) and displays navigation button instead. This button
 * opens a navigation modal where users can click on the desired link.
 */
export default function Navigation(): Node {
  const [displayMobileNavigation, setDisplayMobileNavigation] = useState(false);

  return (
    <>
      {/* The following content is displayed only on desktop (large screens): */}
      <div className={styles('responsiveWrapperDesktop')}>
        <NavigationLinks useMobileVersion={false} />
      </div>

      {/* The following content is displayed only on mobile (small screens): */}
      <div className={styles('responsiveWrapperMobile')}>
        <Button
          prefix={<Icon name="menu_hamburger" />}
          tint="transparent"
          onClick={() => setDisplayMobileNavigation(true)}
        >
          <fbt desc="menu button displayed on smaller screens">Navigation</fbt>
        </Button>

        <Modal
          isOpen={displayMobileNavigation === true}
          title={<fbt desc="main navigation modal title">Navigation</fbt>}
          onClose={() => setDisplayMobileNavigation(false)}
        >
          <NavigationLinks useMobileVersion={true} />
        </Modal>
      </div>
    </>
  );
}

const styles = sx.create({
  responsiveWrapperMobile: {
    [MediaQueryDevice.MOBILE]: {
      display: 'flex', // display the mobile version
    },
    [MediaQueryDevice.DESKTOP]: {
      display: 'none', // hide the desktop version desktop
    },
  },
  responsiveWrapperDesktop: {
    [MediaQueryDevice.MOBILE]: {
      display: 'none', // hide the mobile version
    },
    [MediaQueryDevice.DESKTOP]: {
      display: 'flex', // display the desktop version
    },
  },
});
