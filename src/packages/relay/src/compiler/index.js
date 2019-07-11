// @flow

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  CodegenRunner,
  ConsoleReporter,
  DotGraphQLParser,
  FileWriter as RelayFileWriter,
  IRTransforms as RelayIRTransforms,
  JSModuleParser as RelayJSModuleParser,
} from 'relay-compiler';
import { buildASTSchema, buildClientSchema, parse, printSchema } from 'graphql';
import { globSync } from '@kiwicom/monorepo-utils';
import isCI from 'is-ci';

import buildLanguagePlugin from './buildLanguagePlugin';
import persistOperation from './persistOperation';

type ExternalOptions = {|
  +src: string,
  +schema: string,
|};

export default function compiler(externalOptions: ExternalOptions) {
  const options = {
    noFutureProofEnums: false,
    validate: false,
    include: ['**'],
    exclude: [
      '**/node_modules/**',
      '**/__mocks__/**',
      '**/__generated__/**',
      '**/__flowtests__/**',
    ],
    artifactDirectory: null,
    ...externalOptions,
  };

  const reporter = new ConsoleReporter({
    verbose: true,
  });

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
      watchmanExpression: null,
      filepaths: getFilepathsFromGlob(srcDir, sourceSearchOptions),
    },
    graphql: {
      baseDir: srcDir,
      getParser: DotGraphQLParser.getParser,
      getSchema: () => schema,
      watchmanExpression: null,
      filepaths: getFilepathsFromGlob(srcDir, graphqlSearchOptions),
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

  const result = codegenRunner.compileAll();

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
  try {
    let source = fs.readFileSync(schemaPath, 'utf8');
    if (path.extname(schemaPath) === '.json') {
      source = printSchema(buildClientSchema(JSON.parse(source).data));
    }
    source = `
  directive @include(if: Boolean) on FRAGMENT_SPREAD | FIELD | INLINE_FRAGMENT
  directive @skip(if: Boolean) on FRAGMENT_SPREAD | FIELD | INLINE_FRAGMENT

  ${source}
  `;
    return buildASTSchema(parse(source), { assumeValid: true });
  } catch (error) {
    throw new Error(
      `
Error loading schema. Expected the schema to be a .graphql or a .json
file, describing your GraphQL server's API. Error detail:

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
    return RelayFileWriter.writeAll({
      config: {
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
        persistQuery: text => {
          const hasher = crypto.createHash('md5');
          hasher.update(text);
          const id = hasher.digest('hex');
          if (isCI === true) {
            persistOperation(id, text);
          }
          return Promise.resolve(id);
        },
        repersist: isCI,
      },
      onlyValidate,
      schema,
      baseDocuments,
      documents,
      reporter,
      sourceControl,
    });
  };
}
