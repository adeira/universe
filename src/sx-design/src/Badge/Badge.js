// @flow

import * as React from 'react';
import * as sx from '@stylexjs/stylex';

import { colors } from '../tokens.stylex';

type Props = {
  +children: Fbt,
  +tint?: 'default' | 'error' | 'success' | 'warning',
};

export default function Badge(props: Props): React.Node {
  const { tint } = props;

  return (
    <span
      {...sx.props(
        styles.badgeBase,
        (tint == null || tint === 'default') && styles.badgeTintDefault,
        tint === 'error' && styles.badgeTintError,
        tint === 'success' && styles.badgeTintSuccess,
        tint === 'warning' && styles.badgeTintWarning,
      )}
    >
      {props.children}
    </span>
  );
}

const styles = sx.create({
  badgeBase: {
    padding: '2px 7px',
    borderRadius: 'var(--sx-radius)',
    lineHeight: 1,
    fontSize: 'smaller',
  },
  badgeTintDefault: {
    backgroundColor: colors.background,
    // backgroundColor: 'red', // TODO: remove
    color: colors.foreground,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.accent3,
  },
  badgeTintError: {
    backgroundColor: colors.errorLighter,
    color: colors.errorDark,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.errorLight,
  },
  badgeTintSuccess: {
    backgroundColor: colors.successLighter,
    color: colors.successDark,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.successLight,
  },
  badgeTintWarning: {
    backgroundColor: colors.warningLighter,
    color: colors.warningDark,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.warningLight,
  },
});
