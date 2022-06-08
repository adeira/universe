// @flow

/* $FlowFixMe[untyped-type-import] This comment suppresses an error when
 * upgrading Recoil to version 0.7.3. To see the error delete this comment and
 * run Flow. */
import { atom, atomFamily, type RecoilState } from 'recoil';

export const formStateAtomFamily = (atomFamily({
  key: 'formStateAtomFamily',
  default: undefined,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * Recoil to version 0.7.3. To see the error delete this comment and run Flow.
   */
}): (fieldName: string) => RecoilState<void | string | number | $ReadOnlyArray<string>>);

export const formStateAtomFamilyIds = (atom({
  key: 'formStateAtomFamilyIds',
  default: [],
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * Recoil to version 0.7.3. To see the error delete this comment and run Flow.
   */
}): RecoilState<$ReadOnlyArray<string>>);

export const formStateAtomFamilyErrors = (atomFamily({
  key: 'formStateAtomFamilyErrors',
  default: {
    validationError: null,
    validationErrorHidden: true,
  },
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * Recoil to version 0.7.3. To see the error delete this comment and run Flow.
   */
}): (fieldName: string) => RecoilState<{
  +validationError: FbtWithoutString | null,
  +validationErrorHidden: boolean,
}>);

export const formStateUploadables = (atom({
  key: 'formStateUploadables',
  dangerouslyAllowMutability: true, // uploadables are not primitive (TODO: maybe we should not use Recoil for Relay uploadables?)
  default: undefined,
  /* $FlowFixMe[value-as-type] This comment suppresses an error when upgrading
   * Recoil to version 0.7.3. To see the error delete this comment and run Flow.
   */
}): RecoilState<?FileList>);
