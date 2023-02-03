// @flow strict

function graphqlTagMock(strings: TaggedTemplateLiteralArray) {
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
