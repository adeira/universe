// @flow strict

/* eslint-disable react/no-multi-comp,import/no-extraneous-dependencies */

import { Component, type ChildrenArray, type Element, type Node } from 'react';

class Button extends Component<{ +disabled?: boolean }> {
  render(): Node {
    return null;
  }
}

class DisabledButton extends Component<{}> {
  render(): Element<typeof Button> {
    return <Button disabled={true} />;
  }
}

class WrapperLimited extends Component<{
  +children: ChildrenArray<
    // You have to specify every single supported component here.
    Element<typeof Button> | Element<typeof DisabledButton>,
  >,
}> {}

class WrapperSmart extends Component<{
  // Type `RestrictedElement` understands what is being rendered so it accepts even `DisabledButton`(because it returns `Button`).
  +children: ChildrenArray<RestrictedElement<typeof Button>>,
}> {}

module.exports.testWrapperLimited = ((
  // $FlowExpectedError[incompatible-type]
  <WrapperLimited>
    <Button />
    <Button />
    <DisabledButton />
    <button type="button" />
  </WrapperLimited>
): Node);

module.exports.testWrapperSmart = ((
  // $FlowExpectedError[incompatible-type]
  <WrapperSmart>
    <Button />
    <Button />
    <DisabledButton />
    <button type="button" />
  </WrapperSmart>
): Node);
