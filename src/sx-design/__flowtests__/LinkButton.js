// @flow

import Icon from '@adeira/icons';
import NextLink from 'next/link';
import { type Element, type Node } from 'react';
import fbt from 'fbt';

import { LinkButton, Money } from '../index';
import { SupportedCurrencies } from '../src/constants';

export const testStringChildren = (): Element<typeof LinkButton> => {
  return (
    <LinkButton nextLinkComponent={NextLink} href="#">
      {/* $FlowExpectedError[incompatible-type]: we do not allow string children */}
      test string
    </LinkButton>
  );
};

export const testFbtChildren = (): Element<typeof LinkButton> => {
  return (
    <LinkButton nextLinkComponent={NextLink} href="#">
      <fbt desc="test" doNotExtract={true}>
        test fbt <fbt:param name="parameter">parameter</fbt:param>
      </fbt>
    </LinkButton>
  );
};

export const testMoney = (): Element<typeof LinkButton> => {
  return (
    <LinkButton nextLinkComponent={NextLink} href="#">
      <Money priceUnitAmount={42} priceUnitAmountCurrency={SupportedCurrencies.USD} />
    </LinkButton>
  );
};

export const testValidProperties = (): Node => {
  return (
    <LinkButton
      nextLinkComponent={NextLink}
      href="#"
      onClick={() => {}}
      isDisabled={true}
      data-testid="test-button-id"
      prefix={<Icon name="duplicate" />}
      suffix={<Icon name="postcard" />}
    >
      <fbt desc="…" doNotExtract={true}>
        …
      </fbt>
    </LinkButton>
  );
};

export const testMissingHref = (): Element<typeof LinkButton> => {
  return (
    // $FlowExpectedError[prop-missing]: property href is missing
    <LinkButton nextLinkComponent={NextLink}>
      <fbt desc="missing href" doNotExtract={true}>
        missing href
      </fbt>
    </LinkButton>
  );
};
