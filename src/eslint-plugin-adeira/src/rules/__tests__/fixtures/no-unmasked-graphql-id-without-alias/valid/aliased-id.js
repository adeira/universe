// @flow strict

const graphql = (_: TaggedTemplateLiteralArray) => {};

graphql`
  fragment MyFragment on SomeType {
    yadada: id(opaque: false)
  }
`;
