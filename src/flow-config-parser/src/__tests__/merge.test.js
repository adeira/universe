// @flow strict

import merge from '../merge';

it('merges [ignore] correctly', () => {
  const configA = `
    [ignore]
    <PROJECT_ROOT>/\\.git/.*
  `;

  const configB = `
    [ignore]
    <PROJECT_ROOT>/\\.hg/.*
  `;

  expect(merge(configA, configB)).toMatchInlineSnapshot(`
    "[declarations]


    [ignore]
    <PROJECT_ROOT>/\\.git/.*
    <PROJECT_ROOT>/\\.hg/.*

    [include]


    [libs]


    [lints]

    [options]

    [rollouts]

    [strict]


    [untyped]


    [version]
    "
  `);
});

it('merges [options] correctly', () => {
  const configA = `
    [options]
    emoji=true
    module.file_ext=.foo
    module.file_ext=.bar
  `;

  // 1) `emoji` should be overwritten
  // 2) `module.file_ext` should be merged into the list
  // 3) `munge_underscores` should be added
  const configB = `
    [options]
    emoji=false
    module.file_ext=.baz
    munge_underscores=false
  `;

  expect(merge(configA, configB)).toMatchInlineSnapshot(`
    "[declarations]


    [ignore]


    [include]


    [libs]


    [lints]

    [options]
    emoji=false
    module.file_ext=.foo
    module.file_ext=.bar
    module.file_ext=.baz
    munge_underscores=false

    [rollouts]

    [strict]


    [untyped]


    [version]
    "
  `);
});

it('merges [version] correctly', () => {
  const configA = `
    [version]
    0.138.0
  `;

  const configB = `
    [version]
    >=0.138.0 <0.140.0
  `;

  expect(merge(configA, configB)).toMatchInlineSnapshot(`
    "[declarations]


    [ignore]


    [include]


    [libs]


    [lints]

    [options]

    [rollouts]

    [strict]


    [untyped]


    [version]
    >=0.138.0 <0.140.0
    "
  `);
});
