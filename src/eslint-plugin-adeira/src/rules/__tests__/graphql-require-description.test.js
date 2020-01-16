// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../graphql-require-description');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('graphql-require-description', rule, {
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
  ],
});
