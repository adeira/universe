// @flow

import React from 'react';
import { useFragment, graphql } from '@adeira/relay/hooks';
import Flag from '@kiwicom/orbit-components/lib/CountryFlag';

import type { CountryFlag_location$key } from './__generated__/CountryFlag_location.graphql';

type Props = {|
  +location: ?CountryFlag_location$key,
|};

function AnywhereFlag() {
  return <Flag dataTest="flag-anywhere" code="anywhere" />;
}

export default function CountryFlag(props: Props) {
  const location = useFragment(
    graphql`
      fragment CountryFlag_location on Location {
        country {
          code
          name
        }
        code
        name
        type
      }
    `,
    props.location,
  );

  if (!location) {
    return <AnywhereFlag />;
  }

  const { country, code, type, name } = location;
  const countryCode = country ? country.code : code;
  if (type === 'special' || countryCode == null) {
    return <AnywhereFlag />;
  }

  const countryName = country?.name ?? name ?? 'Anywhere';
  return <Flag dataTest="flag-success" code={countryCode} name={countryName} />;
}
