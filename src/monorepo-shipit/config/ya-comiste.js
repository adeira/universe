// @flow strict

import type { ConfigType } from '../ConfigType.flow';

// ⚠️ Beware: this is a special monorepo to monorepo setup.
module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/ya-comiste.git',
    };
  },
  getPathMappings() {
    return new Map([
      ['src/ya-comiste-meta/', 'meta/'],
      ['src/ya-comiste-react-native/', 'react-native/'],
      ['src/ya-comiste-rust/', 'rust/'],
    ]);
  },
}: ConfigType);
