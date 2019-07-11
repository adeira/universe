// @flow

import os from 'os';

const breakingChangeMarkerStart = '<BREAKING-CHANGES-LOG>';
const breakingChangeMarkerEnd = '</BREAKING-CHANGES-LOG>';

type BreakingChange = {
  +type: string,
  +description: string,
  ...
};

const getBreakingChangesLog = (
  oldSnapshot: string,
  newBreakingChanges: ?$ReadOnlyArray<BreakingChange>,
) => {
  const breakingChangeBlockRegExp = new RegExp(
    `# ${breakingChangeMarkerStart}([\\s\\S]+)# ${breakingChangeMarkerEnd}`,
  );

  const match = oldSnapshot.match(breakingChangeBlockRegExp);
  let breakingChangesLog = match === null ? os.EOL : match[1];

  if (newBreakingChanges) {
    breakingChangesLog += newBreakingChanges.reduce(
      (acc, curVal) => `${acc}#  ${curVal.type}: ${curVal.description}${os.EOL}`,
      '',
    );
  }

  return breakingChangesLog;
};

export const buildBreakingChangesBlock = (
  oldSnapshot: string,
  newBreakingChanges: ?$ReadOnlyArray<BreakingChange>,
) => {
  const breakingChangesLog = getBreakingChangesLog(oldSnapshot, newBreakingChanges);

  return `# ${breakingChangeMarkerStart}${breakingChangesLog}# ${breakingChangeMarkerEnd}`;
};
