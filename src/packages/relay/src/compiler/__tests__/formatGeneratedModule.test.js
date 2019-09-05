// @flow

import formatGeneratedModule from '../formatGeneratedModule';

it('renders minimal input correctly', () => {
  expect(
    formatGeneratedModule({
      documentType: 'DOCUMENT_TYPE',
      concreteText: 'CONCRETE_TEXT',
      typeText: 'TYPE_TEXT',
      sourceHash: 'SOURCE_HASH',
      devOnlyAssignments: '',
    }),
  ).toMatchSnapshot();
});

it('renders full input correctly', () => {
  expect(
    formatGeneratedModule({
      documentType: 'DOCUMENT_TYPE',
      concreteText: 'CONCRETE_TEXT',
      typeText: 'TYPE_TEXT',
      sourceHash: 'SOURCE_HASH',
      docText: 'DOC_TEXT',
      hash: 'HASH',
      devOnlyAssignments: 'DEV_ONLY_ASSIGNMENTS',
    }),
  ).toMatchSnapshot();
});
