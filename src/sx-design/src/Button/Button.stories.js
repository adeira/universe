// @flow

import Icon from '@adeira/icons';
import fbt from 'fbt';
import React, { type ElementConfig, type Node } from 'react';

import Button from './Button';
import LayoutInline from '../Layout/LayoutInline';
import { initFbt } from '../test-utils';

export default {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
};

const BasicTemplate = (args: Partial<ElementConfig<typeof Button>>) => (
  <LayoutInline>
    <Button onClick={() => {}} {...args}>
      <fbt desc="button title" doNotExtract={true}>
        Default button
      </fbt>
    </Button>
    <Button onClick={() => {}} {...args} isDisabled={true}>
      <fbt desc="button title" doNotExtract={true}>
        Disabled button
      </fbt>
    </Button>
    <Button
      onClick={() => {}}
      {...args}
      aria-label={
        <fbt desc="cart button ARIA label" doNotExtract={true}>
          Cart button
        </fbt>
      }
    >
      <Icon name="cart" />
    </Button>
  </LayoutInline>
);

const ShowcaseTemplate = (args: Partial<ElementConfig<typeof Button>>) => (
  <LayoutInline>
    <Button onClick={() => {}} {...args} tint="default">
      <fbt desc="default button title" doNotExtract={true}>
        Default
      </fbt>
    </Button>
    <Button onClick={() => {}} {...args} tint="secondary">
      <fbt desc="secondary button title" doNotExtract={true}>
        Secondary
      </fbt>
    </Button>
    <Button onClick={() => {}} {...args} tint="error">
      <fbt desc="error button title" doNotExtract={true}>
        Error
      </fbt>
    </Button>
    <Button onClick={() => {}} {...args} tint="success">
      <fbt desc="success button title" doNotExtract={true}>
        Success
      </fbt>
    </Button>
    <Button onClick={() => {}} {...args} tint="warning">
      <fbt desc="warning button title" doNotExtract={true}>
        Warning
      </fbt>
    </Button>
  </LayoutInline>
);

const SizesTemplate = (args: Partial<ElementConfig<typeof Button>>) => (
  <LayoutInline>
    <Button onClick={() => {}} {...args} size="small">
      <fbt desc="small button title" doNotExtract={true}>
        small button
      </fbt>
    </Button>
    <Button onClick={() => {}} {...args} size="medium">
      <fbt desc="medium button title" doNotExtract={true}>
        medium button
      </fbt>
    </Button>
    <Button onClick={() => {}} {...args} size="large">
      <fbt desc="large button title" doNotExtract={true}>
        large button
      </fbt>
    </Button>
  </LayoutInline>
);

initFbt();

export const Default = {
  render: (): Node => <BasicTemplate />,
};

export const WithPrefixAndSuffix = {
  render: (): Node => (
    <BasicTemplate prefix={<Icon name="exit_right" />} suffix={<Icon name="exit_left" />}>
      <fbt desc="button title" doNotExtract={true}>
        Button
      </fbt>
    </BasicTemplate>
  ),
};

export const WithVariousSizes = {
  // TODO: doesn't work correctly?
  render: (): Node => <SizesTemplate />,
};

export const Showcase = {
  render: (): Node => <ShowcaseTemplate />,
};
