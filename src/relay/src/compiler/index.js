// @flow

import path from 'path';
import {
  CodegenRunner,
  ConsoleReporter,
  DotGraphQLParser,
  FileWriter as RelayFileWriter,
  IRTransforms as RelayIRTransforms,
  JSModuleParser as RelayJSModuleParser,
} from 'relay-compiler';
import { globSync } from '@adeira/monorepo-utils';

import buildLanguagePlugin from './buildLanguagePlugin';
import buildWatchExpression from './buildWatchExpression';
import createPrintRequireDefaultModuleDependency from './createPrintRequireDefaultModuleDependency';
import getSchemaSource from './getSchemaSource';

type ExternalOptions = {
  +src: string,
  +schema: string,
  +validate: boolean,
  +watch: boolean,
};

const {
  commonTransforms,
  codegenTransforms,
  fragmentTransforms,
  printTransforms,
  queryTransforms,
  schemaExtensions,
} = RelayIRTransforms;

export default async function compiler(externalOptions: ExternalOptions) {
  const options = {
    // defaults
    noFutureProofEnums: false,
    artifactDirectory: null,
    exclude: [
      // allowed in __tests__
      '**/__flowtests__/**',
      '**/__generated__/**',
      '**/__mocks__/**',
      '**/node_modules/**',
    ],
    include: ['**'],
    ...externalOptions,
  };

  const reporter = new ConsoleReporter({ verbose: false, quiet: false });
  const languagePlugin = buildLanguagePlugin();
  const srcDir = path.resolve(process.cwd(), options.src);
  const schemaPath = path.resolve(process.cwd(), options.schema);
  const schema = getSchemaSource(schemaPath);
  const sourceParserName = languagePlugin.inputExtensions.join('/');
  const sourceSearchOptions = {
    extensions: languagePlugin.inputExtensions,
    include: options.include,
    exclude: ['**/*.graphql.*', ...options.exclude], // Do not include artifacts
  };
  const graphqlSearchOptions = {
    extensions: ['graphql'],
    include: options.include,
    exclude: [path.relative(srcDir, schemaPath)].concat(options.exclude),
  };

  const parserConfigs = {
    [sourceParserName]: {
      baseDir: srcDir,
      getFileFilter: RelayJSModuleParser.getFileFilter,
      getParser: RelayJSModuleParser.getParser,
      getSchemaSource: () => schema,
      schemaExtensions,
      watchmanExpression: options.watch ? buildWatchExpression(sourceSearchOptions) : null,
      filepaths: options.watch ? null : getFilepathsFromGlob(srcDir, sourceSearchOptions),
    },
    graphql: {
      // local schema
      baseDir: srcDir,
      getParser: DotGraphQLParser.getParser,
      getSchemaSource: () => schema,
      schemaExtensions,
      watchmanExpression: options.watch ? buildWatchExpression(graphqlSearchOptions) : null,
      filepaths: options.watch ? null : getFilepathsFromGlob(srcDir, graphqlSearchOptions),
    },
  };

  const writerConfigs = {
    [sourceParserName]: {
      writeFiles: getRelayFileWriter(srcDir, languagePlugin, options.noFutureProofEnums),
      isGeneratedFile: (filePath: string) =>
        filePath.endsWith('.graphql.js') && filePath.includes('__generated__'),
      parser: sourceParserName,
      baseParsers: ['graphql'],
    },
  };

  const codegenRunner = new CodegenRunner({
    reporter,
    // $FlowFixMe[incompatible-call]: errors after upgrading to relay 9.1.0
    parserConfigs,
    writerConfigs,
    onlyValidate: options.validate,
    sourceControl: null,
  });

  const result: 'HAS_CHANGES' | 'NO_CHANGES' | 'ERROR' = options.watch
    ? /* $FlowFixMe[incompatible-type] This comment suppresses an error when
       * upgrading Flow. To see the error delete this comment and run Flow. */
      await codegenRunner.watchAll()
    : await codegenRunner.compileAll();

  if (result === 'ERROR') {
    process.exit(100);
  }

  if (options.validate && result !== 'NO_CHANGES') {
    process.exit(101);
  }
}

function getFilepathsFromGlob(
  baseDir,
  options: {
    extensions: $ReadOnlyArray<string>,
    include: $ReadOnlyArray<string>,
    exclude: $ReadOnlyArray<string>,
    ...
  },
): $ReadOnlyArray<string> {
  const { extensions, include, exclude } = options;
  const patterns = include.map((inc) => `${inc}/*.+(${extensions.join('|')})`);
  let filenames = [];
  patterns.forEach(
    (pattern) =>
      (filenames = filenames.concat(
        globSync(pattern, {
          cwd: baseDir,
          ignore: exclude,
        }),
      )),
  );
  return filenames;
}

function getRelayFileWriter(baseDir: string, languagePlugin, noFutureProofEnums: boolean) {
  return ({ onlyValidate, schema, documents, baseDocuments, sourceControl, reporter }) => {
    const writerConfig: { [string]: mixed, ... } = {
      baseDir,
      compilerTransforms: {
        commonTransforms,
        codegenTransforms,
        fragmentTransforms,
        printTransforms,
        queryTransforms,
      },
      customScalars: {},
      formatModule: languagePlugin.formatModule,
      optionalInputFieldsForFlow: [],
      schemaExtensions,
      useHaste: false,
      noFutureProofEnums,
      extension: languagePlugin.outputExtension,
      typeGenerator: languagePlugin.typeGenerator,
      printModuleDependency: createPrintRequireDefaultModuleDependency(),
    };

    return RelayFileWriter.writeAll({
      // $FlowFixMe[incompatible-call]: errors after upgrading to relay 9.1.0
      config: writerConfig,
      onlyValidate,
      schema,
      baseDocuments,
      documents,
      reporter,
      sourceControl,
    });
  };
}
