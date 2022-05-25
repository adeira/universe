// @flow

// $FlowFixMe[cannot-resolve-module]
import { link } from '@markdoc/next.js/tags'; // eslint-disable-line import/no-unresolved

import { AppLink } from '../../components/AppLink';

export default {
  ...link,
  render: AppLink,
};
