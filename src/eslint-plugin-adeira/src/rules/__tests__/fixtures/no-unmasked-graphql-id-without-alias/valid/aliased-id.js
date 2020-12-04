// @flow strict

const graphql = (_) => {};

graphql`
  fragment MyFragment on SomeType {
    yadada: id(opaque: false)
  }
`;
