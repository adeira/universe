// @flow

import Icon from '@adeira/icons';
import fbt from 'fbt';
import React, { type ElementConfig, type Node } from 'react';

import LayoutInline from '../Layout/LayoutInline';
import LinkButton from './LinkButton';
import { initFbt } from '../test-utils';

export default {
  component: LinkButton,
  title: 'Components/LinkButton',
  tags: ['autodocs'],
};

const BasicTemplate = (args: ElementConfig<typeof LinkButton>) => (
  <LayoutInline>
    <LinkButton {...args} />
    <LinkButton {...args} isDisabled={true} />
  </LayoutInline>
);

const ShowcaseTemplate = (args: ElementConfig<typeof LinkButton>) => (
  <LayoutInline>
    <LinkButton {...args} tint="default" />
    <LinkButton {...args} tint="secondary" />
    <LinkButton {...args} tint="error" />
    <LinkButton {...args} tint="success" />
    <LinkButton {...args} tint="warning" />
  </LayoutInline>
);

initFbt();

export const Default = {
  render: (): Node => (
    <BasicTemplate href="https://github.com/adeira/universe/stargazers">
      <fbt desc="link button title" doNotExtract={true}>
        Click me, I am a link but I look like a button!
      </fbt>
    </BasicTemplate>
  ),
};

export const WithPrefixAndSuffix = {
  render: (): Node => (
    <BasicTemplate
      href="https://github.com/adeira/universe/stargazers"
      prefix={<Icon name="exit_right" />}
      suffix={<Icon name="exit_left" />}
    >
      <fbt desc="link button title" doNotExtract={true}>
        Click me, I am a link but I look like a button!
      </fbt>
    </BasicTemplate>
  ),
};

export const WithVariousSized = {
  render: (): Node => (
    <LayoutInline>
      <LinkButton href="https://github.com/adeira/universe/stargazers" size="small">
        <fbt desc="link button title" doNotExtract={true}>
          small link button
        </fbt>
      </LinkButton>
      <LinkButton href="https://github.com/adeira/universe/stargazers" size="medium">
        <fbt desc="link button title" doNotExtract={true}>
          medium link button
        </fbt>
      </LinkButton>
      <LinkButton href="https://github.com/adeira/universe/stargazers" size="large">
        <fbt desc="link button title" doNotExtract={true}>
          large link button
        </fbt>
      </LinkButton>
    </LayoutInline>
  ),
};

export const Showcase = {
  render: (): Node => (
    <ShowcaseTemplate href="https://github.com/adeira/universe/stargazers">
      <fbt desc="link button title" doNotExtract={true}>
        Click me, I am a link but I look like a button!
      </fbt>
    </ShowcaseTemplate>
  ),
};
