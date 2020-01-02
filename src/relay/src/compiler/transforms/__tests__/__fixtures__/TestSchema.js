// @flow

import fs from 'fs';
import { Source, type SchemaDefinitionNode } from 'graphql';
import { Schema } from 'relay-compiler';

const testSchemaPath = `${__dirname}/TestSchema.graphql`;
const TestSchema: SchemaDefinitionNode = Schema.create(new Source(fs.readFileSync(testSchemaPath, 'utf8')));

export default TestSchema;
