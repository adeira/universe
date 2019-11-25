// @flow

import { FlowGenerator } from 'relay-compiler';
import { find } from 'relay-compiler/lib/language/javascript/FindGraphQLTags'; // TODO: better (?)

import formatGeneratedModule from './formatGeneratedModule';

export default function buildLanguagePlugin(language: 'javascript' | 'typescript') {
  if (language === 'typescript') {
    const TypescriptPluginFactory = require('relay-compiler-language-typescript').default;
    return TypescriptPluginFactory();
  } else if (language === 'javascript') {
    return {
      inputExtensions: ['js', 'jsx'],
      outputExtension: 'js',
      typeGenerator: FlowGenerator,
      formatModule: formatGeneratedModule,
      findGraphQLTags: find,
    };
  }

  throw new Error(`Language '${(language: empty)}' is not supported.`);
}
