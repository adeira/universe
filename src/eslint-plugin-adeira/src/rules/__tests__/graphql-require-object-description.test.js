// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../graphql-require-object-description');

const ruleTester = new RuleTester({
  parser: require.resolve('hermes-eslint'),
});

ruleTester.run('graphql-require-object-description', rule, {
  valid: [
    `new Date`,
    `new Pokus({ foo: { baz: 'bar' }})`,
    `new GraphQLObjectType('Random stuff')`,
    `
    new GraphQLObjectType({
      name: 'TripSegment',
      description: '"TripSegment" represents single atomic connection between two places in itinerary.',
      fields: {
        departure: {
          type: GraphQLRouteStop,
          resolve: ({ departure }: TripData): DepartureArrival => departure,
        },
      },
    });
  `,
    `
    export default new GraphQLInputObjectType({
      name: 'CoordinatesInput',
      description: 'Coordinates in decimal degrees, e.g. 41.390205 as latitude for Barcelona.',
      fields: {
        lat: {
          type: new GraphQLNonNull(GraphQLFloat),
          description: 'Latitude.',
        },
        lng: {
          type: new GraphQLNonNull(GraphQLFloat),
          description: 'Longitude.',
        },
      },
    });
    `,
  ],

  invalid: [
    {
      code: `
        new GraphQLObjectType({
          name: 'TripSegment',
          description: '',
          fields: {
            departure: {
              type: GraphQLRouteStop,
              resolve: ({ departure }: TripData): DepartureArrival => departure,
            },
          },
        });
  `,
      errors: [
        "Graph type 'TripSegment' name has no description. Every instance of 'GraphQLObjectType' has to include it to keep the graph well documented.",
      ],
    },
    {
      code: `
        new GraphQLObjectType({
          name: 'TripSegment',
          fields: {
            departure: {
              type: GraphQLRouteStop,
              resolve: ({ departure }: TripData): DepartureArrival => departure,
            },
          },
        });
  `,
      errors: [
        "Graph type 'TripSegment' name has no description. Every instance of 'GraphQLObjectType' has to include it to keep the graph well documented.",
      ],
    },
    {
      code: `
          export default new GraphQLInputObjectType({
            name: 'BookingQuery',
            fields: {
              bid: {
                type: new GraphQLNonNull(GraphQLInt),
              },
            },
          });
      `,
      errors: [
        "Graph type 'BookingQuery' name has no description. Every instance of 'GraphQLInputObjectType' has to include it to keep the graph well documented.",
      ],
    },
  ],
});
