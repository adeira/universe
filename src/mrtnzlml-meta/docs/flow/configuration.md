---
id: configuration
title: Configuration
sidebar_label: Configuration
---

Flow is a complex tool and it can be complicated to setup your project correctly. This page should help with more advanced things you cannot find in docs since they are mostly about experiences and know-how.

## `[ignore]`

By default, Flow does check every folder in your project looking for JS/JSON files. Therefore, you should explicitly ignore Git directory:

```ini
; https://flow.org/en/docs/config/ignore/
[ignore]
<PROJECT_ROOT>/.git/.*
```

You could expect that there are not JS files in this directory. But what happens what you name your branch `package.json` for example? Git represents branch names via files and therefore you get similar error:

```text
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ .git/logs/refs/heads/package.json:1:1

Expected an object literal

     1│ 0000000000000000000000000000000000000000 19b4f8985ebb633cdf37afd18705625d53a3883e Martin Zlámal <mrtnzlml@gmail.com> 1569868294 -0500	branch: Created from HEAD
     2│


Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ .git/refs/heads/package.json:1:1

Unexpected token ILLEGAL

     1│ 19b4f8985ebb633cdf37afd18705625d53a3883e
     2│



Found 2 errors
```

Source: https://github.com/facebook/flow/issues/5148

## `[rollouts]` config

The optional rollout section has 0 or more lines. Each line defines a single rollout. For example:

```ini
[rollouts]

testA=40% on, 60% off
testB=50% blue, 20% yellow, 30% pink
```

The first line defines a rollout named "testA" with two groups. The second line defines a rollout named "testB" with three groups. Each rollout's groups must sum to 100. Some config examples (usages):

```ini
[rollouts]
verify_sig=0% on, 100% off

[options]
(verify_sig=on) experimental.well_formed_exports=true
```

See: https://github.com/facebook/flow/pull/8018/files

## Common configuration issues

1. Accidentally disabled flow for ALL JavaScript files

```ini
module.file_ext=.json
# do not forget to define '.js' here as well otherwise you basically disabled Flow
```

See: https://flow.org/en/docs/config/options/#toc-module-file-ext-string

2. Inncorrectly used `resolve_dirname` instead of `name_mapper`

See: https://github.com/facebook/flow/pull/5850
