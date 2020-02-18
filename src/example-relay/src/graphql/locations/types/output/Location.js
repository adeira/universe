// @flow strict-local

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import GlobalID from '@adeira/graphql-global-id';

import GraphQLLocationArea, { type LocationArea } from './LocationArea';

type Location = {|
  +id: string,
  +code: string,
  +name: string,
  +slug: string,
  +timezone: string,
  +type: string,
  +country: {| +id: string, +name: string, +slug: string, +code: string |},
  +stations: number,
  +airports: number,
  +rank: number,
|};

export default new GraphQLObjectType({
  name: 'Location',
  description: 'Location type',
  fields: {
    id: GlobalID(({ id }: Location): string => id),

    locationId: {
      type: GraphQLString,
      description: '3-letter IATA code of airport or internal city code.',
      resolve: ({ id }: Location): string => id,
    },

    name: {
      type: GraphQLString,
      resolve: ({ name }: Location): string => name,
    },

    slug: {
      type: GraphQLString,
      resolve: ({ slug }: Location): string => slug,
    },

    timezone: {
      type: GraphQLString,
      resolve: ({ timezone }: Location): string => timezone,
    },

    type: {
      type: GraphQLString,
      description: 'Airport, city or country.',
      resolve: ({ type }: Location): string => type,
    },

    country: {
      type: GraphQLLocationArea,
      resolve: ({ country }: Location): ?LocationArea => {
        if (country == null) {
          return null;
        }
        const { id, ...rest } = country;
        return {
          locationId: id,
          ...rest,
        };
      },
    },

    countryFlagURL: {
      type: GraphQLString,
      resolve: ({ country, type, id }: Location): string => {
        if (country || type === 'country') {
          const countryCode = country ? country.id : id;
          return `https://images.kiwi.com/flags/32x32/${countryCode.toLowerCase()}.png`;
        }
        return 'https://images.kiwi.com/flags/32x32/anywhere.png';
      },
    },

    stationsCount: {
      type: GraphQLInt,
      resolve: ({ stations }: Location): number => stations,
    },

    airportsCount: {
      type: GraphQLInt,
      resolve: ({ airports }: Location): number => airports,
    },

    rank: {
      type: GraphQLInt,
      resolve: ({ rank }: Location): number => rank,
    },

    code: {
      type: GraphQLString,
      resolve: ({ code }: Location): string => code,
    },
  },
});
