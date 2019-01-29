// @flow

export default function log(taskIdentifier: string, message: string) {
  // eslint-disable-next-line no-console
  console.log(`${taskIdentifier} ~ ${message}`);
}

export function dryLog(message: string) {
  log('DRY RUN', message);
}
