// @flow strict-local

import path from 'path';
import { generateTestsFromFixtures } from '@adeira/test-utils';

import parsePatchHeader from '../parsePatchHeader';

generateTestsFromFixtures(path.join(__dirname, 'fixtures', 'headers'), parsePatchHeader);
