// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { LayoutBlock, Text } from '@adeira/sx-design';

import { LoginButton } from './AuthButtons';

export default function LoginPage(): Node {
  return (
    <div className={styles('loginRoot')}>
      <div className={styles('loginWindow')}>
        <LayoutBlock spacing="large">
          <Text as="h1">
            <Text weight={100} as="span">
              <fbt desc="login to Abacus title">Login to</fbt>
            </Text>
            <br />
            <Text weight={950} as="span">
              Abacus
            </Text>
          </Text>
          <LoginButton />
        </LayoutBlock>
      </div>
    </div>
  );
}

const styles = sx.create({
  loginRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    background:
      'linear-gradient(45deg, rgba(var(--sx-success), 0.8), rgba(var(--sx-error), 0.8), rgba(var(--sx-warning), 0.8))',
  },
  loginWindow: {
    backgroundColor: 'rgba(var(--sx-background))',
    padding: 'var(--sx-spacing-large)',
    borderRadius: 'var(--sx-radius)',
    width: 400,
    boxShadow: 'var(--sx-shadow-medium)',
  },
});
