// @flow

/* eslint-disable */

const React = require('react');

type FunctionComponentRender<+TRender> = (props: any) => TRender;

type ClassComponentRender<+TRender> = Class<
  React$Component<any, any> & interface { render(): TRender },
>;

export type RestrictedElement<+TElementType: React$ElementType> = {|
  +type:
    | TElementType
    | ClassComponentRender<RestrictedElement<TElementType>>
    | FunctionComponentRender<RestrictedElement<TElementType>>,
  +props: any, // The props type is already captured in the type field,
  // and using ElementProps recursively can get very expensive. Instead
  // of paying for that computation, I decided to use any

  +key: React$Key | null,
  +ref: any,
|};

// You can enforce compositional patterns with RestrictedElement:
class MenuItem extends React.Component<{||}> {}
class MenuSeparator extends React.Component<{||}> {}
class Menu extends React.Component<{|
  children: React.ChildrenArray<
    RestrictedElement<typeof MenuItem> | RestrictedElement<typeof MenuSeparator>,
  >,
|}> {}
class NotAMenuComponent extends React.Component<{||}> {}

// All the children types allowed.
const test1 = (
  <Menu>
    <MenuItem />
    <MenuSeparator />
  </Menu>
);

// NotAMenuComponent is not an allowed child.
const test2 = (
  <Menu>
    <MenuItem />
    <MenuSeparator />
    {/* $FlowExpectedError: NotAMenuComponent is not allowed in the restricted children elements
     * in Menu component. Only MenuItem and MenuSeparator are allowed. ✅ */}
    <NotAMenuComponent />
  </Menu>
);

class RendersAMenuItem extends React.Component<{||}> {
  render(): React.Element<typeof MenuItem> {
    return <MenuItem />;
  }
}

const test3 = (
  <Menu>
    <MenuItem />
    <MenuSeparator />
    <RendersAMenuItem />
  </Menu>
);

class RendersSomethingThatRendersAMenuItem extends React.Component<{||}> {
  // You really should just use RestrictedElement here, but I want
  // to demonstrate the flexibility.
  render(): React.Element<typeof RendersAMenuItem> {
    return <RendersAMenuItem />;
  }
}

// More than 1 level deep
const test4 = (
  <Menu>
    <MenuItem />
    <MenuSeparator />
    <RendersSomethingThatRendersAMenuItem />
  </Menu>
);

// Biggest drawback (imo) is that AbstractComponent isn't compatible with
// this pattern. I want to change that! (via https://github.com/jbrown215)
