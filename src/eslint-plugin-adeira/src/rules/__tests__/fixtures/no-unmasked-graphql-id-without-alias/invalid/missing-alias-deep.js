/**
 * @eslintExpectedError Fetching ID field with (opaque:false) without aliasing it could have unexpected side-effects. Please, use a GraphQL alias for this field or make it opaque.
 * @flow
 */

const graphql = (_: Array<string>) => {};

graphql`
  fragment MyFragment on SomeType {
    id
    ... on SomeOtherType {
      id(opaque: false)
    }
  }
`;
