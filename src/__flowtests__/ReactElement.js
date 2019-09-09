// @flow

/* eslint-disable */

import * as React from 'react';

import { type RestrictedElement } from './RestrictedElement';

class Button extends React.Component<{| +disabled?: boolean |}> {
  render() {
    return null;
  }
}

class DisabledButton extends React.Component<{||}> {
  // The return type is not necessary - it's here only to demonstrate what is going on.
  render(): React.Element<typeof Button> {
    return <Button disabled={true} />;
  }
}

class WrapperStupid extends React.Component<{|
  children: React.ChildrenArray<
    // You have to specify every single supported component here.
    React.Element<typeof Button> | React.Element<typeof DisabledButton>,
  >,
|}> {}

class WrapperSmart extends React.Component<{|
  // Type `RestrictedElement` understands what is being rendered so it accepts even `DisabledButton` (because it returns `Button`).
  children: React.ChildrenArray<RestrictedElement<typeof Button>>,
|}> {}

const testStupid = (
  <WrapperStupid>
    <Button />
    <Button />
    <DisabledButton />
  </WrapperStupid>
);

const testSmart = (
  <WrapperSmart>
    <Button />
    <Button />
    <DisabledButton />
  </WrapperSmart>
);
