// @flow

export default function isMetaField(datapointID: string): boolean {
  return datapointID.startsWith('annotation.') || datapointID.startsWith('document.');
}
