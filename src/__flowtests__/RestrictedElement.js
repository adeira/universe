// @flow strict

/* eslint-disable react/no-multi-comp,import/no-extraneous-dependencies */

import * as React from 'react';

// You can enforce compositional patterns with RestrictedElement:
class MenuItem extends React.Component<{}> {}
class MenuSeparator extends React.Component<{}> {}
class Menu extends React.Component<{
  +children: React.ChildrenArray<
    RestrictedElement<typeof MenuItem> | RestrictedElement<typeof MenuSeparator>,
  >,
}> {}
class NotAMenuComponent extends React.Component<{}> {}

// All the children types allowed.
module.exports.test1 = ((
  <Menu>
    <MenuItem />
    <MenuSeparator />
  </Menu>
): React.Node);

// NotAMenuComponent is not an allowed child.
module.exports.test2 = ((
  /* $FlowExpectedError[incompatible-type]: NotAMenuComponent is not allowed in the restricted
   * children elements in Menu component. Only MenuItem and MenuSeparator are allowed. ✅ */
  <Menu>
    <MenuItem />
    <MenuSeparator />
    <NotAMenuComponent />
  </Menu>
): React.Node);

class RendersAMenuItem extends React.Component<{}> {
  render(): React.Element<typeof MenuItem> {
    return <MenuItem />;
  }
}

module.exports.test3 = ((
  <Menu>
    <MenuItem />
    <MenuSeparator />
    <RendersAMenuItem />
  </Menu>
): React.Node);

class RendersSomethingThatRendersAMenuItem extends React.Component<{}> {
  // You really should just use RestrictedElement here, but I want
  // to demonstrate the flexibility.
  render(): React.Element<typeof RendersAMenuItem> {
    return <RendersAMenuItem />;
  }
}

// More than 1 level deep
module.exports.test4 = ((
  // $FlowExpectedError[incompatible-type]
  <Menu>
    <MenuItem />
    <MenuSeparator />
    <RendersSomethingThatRendersAMenuItem />
    <button type="button" />
  </Menu>
): React.Node);
