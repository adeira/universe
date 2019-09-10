// @flow

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  Rollout,
  CodegenRunner,
  ConsoleReporter,
  DotGraphQLParser,
  FileWriter as RelayFileWriter,
  IRTransforms as RelayIRTransforms,
  JSModuleParser as RelayJSModuleParser,
} from 'relay-compiler';
import { buildASTSchema, parse } from 'graphql';
import { globSync } from '@kiwicom/monorepo-utils';
import SignedSource from '@kiwicom/signed-source';
import isCI from 'is-ci';

import buildLanguagePlugin from './buildLanguagePlugin';
import buildWatchExpression from './buildWatchExpression';
import persistOperation from './persistOperation';
import createFindDeprecatedUsagesRule from './validations/createFindDeprecatedUsagesRule';

type ExternalOptions = {|
  +src: string,
  +schema: string,
  +validate: boolean,
  +watch: boolean,
|};

export default async function compiler(externalOptions: ExternalOptions) {
  const options = {
    noFutureProofEnums: false,
    include: ['**'],
    exclude: [
      '**/node_modules/**',
      '**/__mocks__/**',
      '**/__generated__/**',
      // allowed in __tests__
    ],
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

function getSchema(schemaPath: string) {
  let source = fs.readFileSync(schemaPath, 'utf8');
  if (!SignedSource.verifySignature(source)) {
    throw new Error(`Schema '${schemaPath}' has invalid signature!`);
  }
  source = `
  directive @include(if: Boolean) on FRAGMENT_SPREAD | FIELD | INLINE_FRAGMENT
  directive @skip(if: Boolean) on FRAGMENT_SPREAD | FIELD | INLINE_FRAGMENT

  ${source}
  `;

  try {
    return buildASTSchema(parse(source), { assumeValid: true });
  } catch (error) {
    throw new Error(
      `
Error loading schema. Expected the schema to be a .graphql file, describing your GraphQL server's API. Error detail:

${error.stack}
    `.trim(),
    );
  }
}

function getRelayFileWriter(
  baseDir: string,
  languagePlugin,
  noFutureProofEnums: boolean,
  outputDir?: ?string,
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
      validationRules: {
        // What is the difference between GLOBAL_RULES and LOCAL_RULES?
        GLOBAL_RULES: [
          createFindDeprecatedUsagesRule(false), // TODO: make this configurable (--strict?)
        ],
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
      repersist: isCI,
    };

    if (Rollout.check('stored-operations', 'persist-query')) {
      writerConfig.persistQuery = text => {
        const hasher = crypto.createHash('md5');
        hasher.update(text);
        const id = hasher.digest('hex');
        if (isCI === true) {
          persistOperation(id, text);
        }
        return Promise.resolve(id);
      };
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
