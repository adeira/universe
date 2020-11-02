// @flow

/* eslint-disable */

import type { Element, ChildrenArray } from 'react';

import { Component } from 'react';

import { type RestrictedElement } from './RestrictedElement';

class Button extends Component<{| +disabled?: boolean |}> {
  render() {
    return null;
  }
}

class DisabledButton extends Component<{||}> {
  // The return type is not necessary - it's here only to demonstrate what is going on.
  render(): Element<typeof Button> {
    return <Button disabled={true} />;
  }
}

class WrapperStupid extends Component<{|
  children: ChildrenArray<
    // You have to specify every single supported component here.
    Element<typeof Button> | Element<typeof DisabledButton>,
  >,
|}> {}

class WrapperSmart extends Component<{|
  // Type `RestrictedElement` understands what is being rendered so it accepts even `DisabledButton` (because it returns `Button`).
  children: ChildrenArray<RestrictedElement<typeof Button>>,
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
