// @flow strict

import modify from '../modifyPackageJSON';

function mrequire(packageJSONPath: string) {
  // $FlowAllowDynamicImport
  return modify(require(packageJSONPath));
}

it('returns package.json "as is" when missing main script', () => {
  expect(mrequire(`${__dirname}/fixtures/missingMainAndModule.json`)).toEqual({
    name: 'missingMainAndModule',
    version: '0.0.0',
    dependencies: {
      '//': 'none',
    },
  });
});

it('adds module field', () => {
  expect(mrequire(`${__dirname}/fixtures/withMain.json`)).toEqual({
    name: 'withMain',
    version: '0.0.0',
    main: 'src/index.js',
    module: 'src/index.mjs',
    dependencies: {
      '//': 'none',
    },
  });
});

it('does not overwrite main or module fields if exist', () => {
  expect(mrequire(`${__dirname}/fixtures/withMainAndModule.json`)).toEqual({
    name: 'withMainAndModule',
    version: '0.0.0',
    main: 'src/do-not-overwrite-this.ABC',
    module: 'src/do-not-overwrite-this.XYZ',
    dependencies: {
      '//': 'none',
    },
  });
});

it('removed module if disabled', () => {
  expect(
    mrequire(`${__dirname}/fixtures/withMainAndDisabledModule.json`),
  ).toEqual({
    name: 'withMainAndModule',
    version: '0.0.0',
    main: 'src/do-not-overwrite-this.ABC',
    dependencies: {
      '//': 'none',
    },
  });
});

it('does not overwrite module field if it exists', () => {
  expect(mrequire(`${__dirname}/fixtures/withModule.json`)).toEqual({
    name: 'withModule',
    version: '0.0.0',
    main: 'src/do-not-overwrite-this.js',
    module: 'src/do-not-overwrite-this.mjs',
    dependencies: {
      '//': 'none',
    },
  });
});
