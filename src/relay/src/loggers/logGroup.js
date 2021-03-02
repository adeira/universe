// @flow strict

/* eslint-disable no-console */

export default function logGroup(
  groupMessage: string,
  groupBody?: () => void,
  groupNote?: string,
  groupMessageStyle: string = '',
): void {
  if (groupBody == null) {
    console.log('%c%s', 'font-weight:bold', groupMessage);
  } else {
    if (groupNote != null) {
      console.groupCollapsed(
        `%c%s%c%s`,
        `font-weight:bold;${groupMessageStyle}`,
        groupMessage,
        'font-weight:normal',
        ` - ${groupNote}`,
      );
    } else {
      console.groupCollapsed(`%c%s`, `font-weight:bold;${groupMessageStyle}`, groupMessage);
    }
    groupBody();
    console.groupEnd();
  }
}
