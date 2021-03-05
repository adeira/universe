---
id: flow
title: Flow Archive
sidebar_label: Flow Archive
---

:::danger deprecated
This is a collection of outdated sections that are no longer valid or somehow inaccurate. Current docs can be found here: [meta](../flow)
:::

## Types-first architecture

:::note
Support for Classic mode has been dropped and Types-First mode is now always enabled (Types-First has been the default mode since v0.134). The `types_first` and `well_formed_exports` flowconfig options are no longer recognized. See https://medium.com/flow-type/types-first-a-scalable-new-architecture-for-flow-3d8c7ba1d4eb/ for more about Types-First mode.
:::

See: https://medium.com/flow-type/types-first-a-scalable-new-architecture-for-flow-3d8c7ba1d4eb

Types-first is a new architecture which significantly improves the overall performance. It requires a bunch more type annotations (which is why it wasn't recommended widely yet) but it's production-ready and everything is way faster if you add the needed type annotations. You can enable it like so:

```ini
[options]
experimental.well_formed_exports=true
experimental.types_first=true
```

It requires that every exported type be annotated and I'd certainly recommend it to anyone starting a new project in Flow.

> The reason we needed to get the enforcement right for input positions in 0.85 was to enable things like flow autofix to actually be able to infer types. With the input annotations we can infer the output ones and insert them via a codemod!

You can codeshift the codebase like so (see: https://flow.org/en/docs/cli/annotate-exports/; manual changes recommended):

```text
flow codemod annotate-exports \
  --write \
  --repeat \
  --log-level info \
  /path/to/folder \
  2> out.log
```

It is better to migrate the codebase gradually step by step like so:

```ini
experimental.types_first=false
experimental.well_formed_exports=true
experimental.well_formed_exports.includes=<PROJECT_ROOT>/src/packages/js
experimental.well_formed_exports.includes=<PROJECT_ROOT>/src/packages/relay
; ...
```

_Q_: How your FB colleagues accepted the types-first migration? It sometimes feels quite controversial :grimacing: Maybe some article would be nice - are you planning it?<br/>
_A_: some people were a little bit grumpy about the additional annotation burden at first, but everyone seems to be used to it now and there wasn't any real pushback, it was mostly just some grumbling here and there

Thanks to Flow team for a great insights on this topic!
