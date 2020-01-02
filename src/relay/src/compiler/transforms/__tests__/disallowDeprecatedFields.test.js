// @flow

import { generateTestsFromFixtures } from '@adeira/test-utils';
import { CompilerContext, Printer } from 'relay-compiler';
import { parseGraphQLText } from 'relay-test-utils-internal';

import disallowDeprecatedFields from '../disallowDeprecatedFields';
import TestSchema from './__fixtures__/TestSchema';

generateTestsFromFixtures(`${__dirname}/__fixtures__/disallowDeprecatedFields`, text => {
  const {definitions} = parseGraphQLText(TestSchema, text);
  return new CompilerContext(TestSchema)
    .addAll(definitions)
    .applyTransforms([disallowDeprecatedFields.transform])
    .documents()
    .map(doc => Printer.print(TestSchema, doc))
    .join('\n');
});
