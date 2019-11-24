// @flow

import { FlowGenerator } from 'relay-compiler';
import { find } from 'relay-compiler/lib/language/javascript/FindGraphQLTags'; // TODO: better (?)
import TypescriptPluginFactory from 'relay-compiler-language-typescript';

import formatGeneratedModule from './formatGeneratedModule';

export default function buildLanguagePlugin(language: 'javascript' | 'typescript') {
  if (language === 'typescript') {
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
