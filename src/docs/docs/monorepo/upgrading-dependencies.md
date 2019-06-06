---
id: upgrading-dependencies
title: Upgrading dependencies
sidebar_label: Upgrading dependencies
---

> These instructions are for monorepo maintainers.

All our dependencies (minor and patch) are upgraded automatically via Automator so you don't have to care about it. However, it's quite important to have good tests to make sure everything works correctly even after the upgrade. Major upgrades are being done manually because of their nature break things.

## Upgrading Flow for the whole monorepo

We follow the same upgrade strategy as used internally at Facebook. You can try to upgrade Flow just like any other dependency and try to fix the problems if any but it can get difficult with many workspaces. Faster strategy is to do it like this:

1. clone Flow repository somewhere (`git@github.com:facebook/flow.git`)
2. jump into dev tools (`flow/packages/flow-dev-tools`) and install necessary deps using Yarn
3. you can now run `./tool` from the Flow repo root which enables you very useful utilities for the upgrades

There are basically 2 useful commands for the upgrades: `add-comments` and `remove-comments`. To add suppress comments run this comment (don't forget to adjust it):

```text
/path/to/tool add-comments --all --bin /path/to/flow --comment "\$FlowFixMe(>=0.1xx.0)" .
```

Our Flow config is configured so it understand the version in `$FlowFixMe` correctly (it suppresses the error only from the specified version up). Try to run this command without the `--all` flag to be able to fix the errors individually.

Similarly for removing unused suppress comments:

```text
/path/to/tool remove-comments --bin /path/to/flow .
```

This command removes all unused suppress comments while keeping unused comments in flowtests (files ending with `*-flowtest.js` or files in `__flowtests__` directory).

Read this article for more details and justification of this approach: https://medium.com/flow-type/upgrading-flow-codebases-40ef8dd3ccd8

Tip: great way how to migrate some large scale changes is to use `npx flow-upgrade`.
