// @flow

import logger from '@adeira/logger';

export default function log(taskIdentifier: string, message: string) {
  logger.log(`${taskIdentifier} ~ ${message}`);
}
