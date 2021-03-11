// @flow

import { FlowGenerator } from 'relay-compiler';
import { find } from 'relay-compiler/lib/language/javascript/FindGraphQLTags'; // TODO: better (?)

import formatGeneratedModule from './formatGeneratedModule';

type LanguagePlugin = {
  +inputExtensions: $ReadOnlyArray<string>,
  +outputExtension: string,
  +typeGenerator: $FlowFixMe,
  +formatModule: $FlowFixMe,
  +findGraphQLTags: $FlowFixMe,
};

export default function buildLanguagePlugin(): LanguagePlugin {
  return {
    inputExtensions: ['js', 'jsx'],
    outputExtension: 'js',
    typeGenerator: FlowGenerator,
    formatModule: formatGeneratedModule,
    findGraphQLTags: find,
  };
}
