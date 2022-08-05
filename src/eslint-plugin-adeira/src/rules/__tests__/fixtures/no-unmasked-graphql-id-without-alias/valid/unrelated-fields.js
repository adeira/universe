// @flow strict

const graphql = (_: Array<string>) => {};

graphql`
  fragment MyFragment on SomeType {
    aaa
    bbb
  }
`;
