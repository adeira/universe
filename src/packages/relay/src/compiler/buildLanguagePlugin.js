// @flow

import { FlowGenerator } from 'relay-compiler';
import { find } from 'relay-compiler/lib/FindGraphQLTags'; // TODO: better (?)

import formatGeneratedModule from './formatGeneratedModule';

export default function buildLanguagePlugin() {
  return {
    inputExtensions: ['js', 'jsx'],
    outputExtension: 'js',
    typeGenerator: FlowGenerator,
    formatModule: formatGeneratedModule,
    findGraphQLTags: find,
  };
}
