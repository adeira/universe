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
import { globSync } from '@kiwicom/monorepo-utils';

import buildLanguagePlugin from './buildLanguagePlugin';
import buildWatchExpression from './buildWatchExpression';
import getSchema from './getSchema';

type ExternalOptions = {|
  +src: string,
  +schema: string,
  +persistMode: 'fs', // TODO consider more generic: +persistFunction?: ?(query: string) => Promise<string>,
  +include: $ReadOnlyArray<string>,
  +exclude: $ReadOnlyArray<string>,
  +validate: boolean,
  +watch: boolean,
|};

export default async function compiler(externalOptions: ExternalOptions) {
  const options = {
    noFutureProofEnums: false,
    artifactDirectory: null,
    ...externalOptions,
  };

  const reporter = new ConsoleReporter({ verbose: true });
  const languagePlugin = buildLanguagePlugin();
  const srcDir = path.resolve(process.cwd(), options.src);
  const schemaPath = path.resolve(process.cwd(), options.schema);
  const schema = getSchema(schemaPath);
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
      getSchema: () => schema,
      watchmanExpression: options.watch ? buildWatchExpression(sourceSearchOptions) : null,
      filepaths: options.watch ? null : getFilepathsFromGlob(srcDir, sourceSearchOptions),
    },
    graphql: {
      // local schema
      baseDir: srcDir,
      getParser: DotGraphQLParser.getParser,
      getSchema: () => schema,
      watchmanExpression: options.watch ? buildWatchExpression(graphqlSearchOptions) : null,
      filepaths: options.watch ? null : getFilepathsFromGlob(srcDir, graphqlSearchOptions),
    },
  };

  const writerConfigs = {
    [sourceParserName]: {
      writeFiles: getRelayFileWriter(
        srcDir,
        languagePlugin,
        options.noFutureProofEnums,
        options.artifactDirectory,
        options.persistMode,
      ),
      isGeneratedFile: (filePath: string) =>
        filePath.endsWith('.graphql.js') && filePath.includes('__generated__'),
      parser: sourceParserName,
      baseParsers: ['graphql'],
    },
  };

  const codegenRunner = new CodegenRunner({
    reporter,
    parserConfigs,
    writerConfigs,
    onlyValidate: options.validate,
    sourceControl: null,
  });

  const result: 'HAS_CHANGES' | 'NO_CHANGES' | 'ERROR' = options.watch
    ? await codegenRunner.watchAll()
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
  const patterns = include.map(inc => `${inc}/*.+(${extensions.join('|')})`);
  let filenames = [];
  patterns.forEach(
    pattern =>
      (filenames = filenames.concat(
        globSync(pattern, {
          cwd: baseDir,
          ignore: exclude,
        }),
      )),
  );
  return filenames;
}

function getRelayFileWriter(
  baseDir: string,
  languagePlugin,
  noFutureProofEnums: boolean,
  outputDir?: ?string,
  persistMode,
) {
  return ({ onlyValidate, schema, documents, baseDocuments, sourceControl, reporter }) => {
    const {
      commonTransforms,
      codegenTransforms,
      fragmentTransforms,
      printTransforms,
      queryTransforms,
      schemaExtensions,
    } = RelayIRTransforms;

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
      outputDir,
      // repersist: isCI, // TODO
    };

    if (persistMode && persistMode === 'fs') {
      const persistFunction = require('./persistFunctions/filesystemPersistFunction').default;
      writerConfig.persistQuery = query => {
        const queryMapPath = path.resolve(process.cwd(), 'persisted-queries.json');
        return persistFunction(query, queryMapPath);
      };
    } else {
      (persistMode: empty);
    }

    return RelayFileWriter.writeAll({
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
