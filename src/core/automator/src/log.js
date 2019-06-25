// @flow

import logger from '@kiwicom/logger';

export default function log(taskIdentifier: string, message: string) {
  logger.log(`${taskIdentifier} ~ ${message}`);
}
