// @flow strict

// https://github.com/facebook/flow/issues/6904
export function isListSection(sectionName: string | null): boolean {
  return (
    sectionName === 'declarations' ||
    sectionName === 'ignore' ||
    sectionName === 'include' ||
    sectionName === 'libs' ||
    sectionName === 'strict' ||
    sectionName === 'untyped'
  );
}

export const KNOWN_LIST_OPTIONS = [
  'module.file_ext',
  'module.name_mapper',
  'module.name_mapper.extension',
  'module.system.node.main_field',
  'module.system.node.resolve_dirname',
  'sharedmemory.dirs',
  'suppress_comment',
  'suppress_type',
  'well_formed_exports.includes',
];
