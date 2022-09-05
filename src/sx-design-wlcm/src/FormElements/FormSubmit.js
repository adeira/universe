// @flow

import sx from '@adeira/sx';
import { FormSubmit as AdeiraFormSubmit } from '@adeira/forms';

import type { Node } from 'react';

export default function FormSubmit(props): Node {
  return <AdeiraFormSubmit {...props} />;
}
