// @flow

import type { Node } from 'react';

import sx, { type AllCSSProperties } from '../index';

// fileA.js

type Props = {
  +xstyle: AllCSSProperties,
  +ystyle: AllCSSProperties,
};

const internalStyles = sx.create({ default: { fontSize: 16 } });
export function MyBaseComponent(props: Props): Node {
  return <div className={sx(internalStyles.default, props.xstyle, props.ystyle)} />;
}

// fileB.js

const externalStyles = sx.create({ spacing: { marginTop: 4 } });
export function MyCustomComponent(): Node {
  return <MyBaseComponent xstyle={externalStyles.spacing} ystyle={externalStyles.spacing} />;
}
