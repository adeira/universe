// @flow strict

function graphqlTagMock(strings: Array<string>) {
  // noop mock
  return strings;
}

graphqlTagMock`
  fragment MyFragment on MyType {
    id
  }
`;

graphqlTagMock`
  fragment MyFragmentInline on MyType @inline {
    id
  }
`;
