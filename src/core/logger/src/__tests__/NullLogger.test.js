// @flow

import Logger from '../Logger';
import NullLogger from '../NullLogger';

it('does nothing', () => {
  const logger = new Logger(new NullLogger());
  logger.log('a', 'b', 'c');
  logger.warn('a', 'b', 'c');
  logger.error('a', 'b', 'c');
});
