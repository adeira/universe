// @flow

import path from 'path';
import { generateTestsFromFixtures } from '@adeira/test-utils';

import parseEnv from '../parseEnv';

generateTestsFromFixtures(path.join(__dirname, '__fixtures__'), input => parseEnv(input));
