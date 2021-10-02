// @flow

import React, { type Element } from 'react';

import Icon from '../index';

export function CorrectIconName(): Element<typeof Icon> {
  return <Icon name="fingerprint" />;
}

export function CorrectIconNameTestId(): Element<typeof Icon> {
  return <Icon name="film" data-testid="film_icon_test_id" />;
}

export function IncorrectIconName(): Element<typeof Icon> {
  // $FlowExpectedError[incompatible-type]
  return <Icon name="this_name_is_not_valid" />;
}
