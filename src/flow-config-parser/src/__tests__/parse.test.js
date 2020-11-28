// @flow

import path from 'path';
import { generateTestsFromFixtures } from '@adeira/fixtures-tester';

import parse from '../parse';

generateTestsFromFixtures(path.join(__dirname, 'fixtures'), parse);
