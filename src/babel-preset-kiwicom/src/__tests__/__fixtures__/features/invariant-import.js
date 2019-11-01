/* eslint-disable */

import { invariant } from '@adeira/js';
import { something } from 'else';

invariant(Math.random(), 'You shall not pass!');
invariant(Math.random(), 'You shall not pass %s!', 'Jerry');
