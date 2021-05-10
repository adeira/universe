// @flow

import { atom, atomFamily, type RecoilState } from 'recoil';

export const formStateAtomFamily = (atomFamily({
  key: 'formStateAtomFamily',
  default: undefined,
}): (fieldName: string) => RecoilState<void | string | number | $ReadOnlyArray<string>>);

export const formStateAtomFamilyIds = (atom({
  key: 'formStateAtomFamilyIds',
  default: [],
}): RecoilState<$ReadOnlyArray<string>>);

export const formStateAtomFamilyErrors = (atomFamily({
  key: 'formStateAtomFamilyErrors',
  default: {
    validationError: null,
    validationErrorHidden: true,
  },
}): (fieldName: string) => RecoilState<{
  +validationError: FbtWithoutString | null,
  +validationErrorHidden: boolean,
}>);

export const formStateUploadables = (atom({
  key: 'formStateUploadables',
  dangerouslyAllowMutability: true, // uploadables are not primitive (TODO: maybe we should not use Recoil for Relay uploadables?)
  default: undefined,
}): RecoilState<?FileList>);
