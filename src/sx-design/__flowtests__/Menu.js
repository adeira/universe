// @flow

import fbt from 'fbt';
import React, { type Element, type Node } from 'react';

import { Menu } from '../index';

export function ValidFullExampleString(): Element<typeof Menu> {
  return (
    <Menu>
      <Menu.Item onClick={() => {}}>One</Menu.Item>
      <Menu.Item onClick={() => {}}>Two</Menu.Item>
      <Menu.Item tint="default" onClick={() => {}}>
        Three
      </Menu.Item>
      <Menu.ItemDivider />
      <Menu.Item tint="error" onClick={() => {}}>
        Delete
      </Menu.Item>
    </Menu>
  );
}

export function ValidFullExampleFBT(): Element<typeof Menu> {
  return (
    <Menu>
      <Menu.Item onClick={() => {}}>
        <fbt desc="one" doNotExtract={true}>
          One
        </fbt>
      </Menu.Item>
      <Menu.Item onClick={() => {}}>
        <fbt desc="two" doNotExtract={true}>
          Two
        </fbt>
      </Menu.Item>
      <Menu.Item tint="default" onClick={() => {}}>
        <fbt desc="three" doNotExtract={true}>
          Three
        </fbt>
      </Menu.Item>
      <Menu.ItemDivider />
      <Menu.Item tint="error" onClick={() => {}}>
        <fbt desc="delete" doNotExtract={true}>
          Delete
        </fbt>
      </Menu.Item>
    </Menu>
  );
}

export function ValidSingleChildrenMenuItem(): Element<typeof Menu> {
  return (
    <Menu>
      <Menu.Item onClick={() => {}}>I am the only child here</Menu.Item>
    </Menu>
  );
}

export function InvalidMenuItemProps(): Node {
  return (
    <>
      {/* $FlowExpectedError[incompatible-type]: invalid tint property value */}
      <Menu.Item tint="custom_invalid" onClick={() => {}}>
        …
      </Menu.Item>

      {/* $FlowExpectedError[prop-missing]: missing children */}
      <Menu.Item onClick={() => {}} />

      {/* $FlowExpectedError[prop-missing]: missing onClick callback */}
      <Menu.Item>
        <fbt desc="…" doNotExtract={true}>
          …
        </fbt>
      </Menu.Item>
    </>
  );
}
