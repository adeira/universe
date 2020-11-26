// @flow

import path from 'path';
import { generateTestsFromFixtures } from '@adeira/test-utils';

import parse from '../parse';

generateTestsFromFixtures(path.join(__dirname, 'fixtures'), parse);
