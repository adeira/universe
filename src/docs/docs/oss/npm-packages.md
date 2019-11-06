---
id: npm-packages
title: Public NPM Packages
sidebar_label: Public NPM Packages
---

Please read the prerequisites before using our packages in your projects.

## Prerequisites

You may get some Flow errors. We are trying to keep it on minimum but you may have incompatible Flow suppress comments. We currently don't know how to solve this issue well. One way how to tackle it is to have compatible `.flowconfig` options:

```ini
suppress_comment=\\(.\\|\n\\)*\\$FlowAllowDynamicImport
suppress_comment=\\(.\\|\n\\)*\\$FlowExpectedError: .+
suppress_comment=\\(.\\|\n\\)*\\$FlowIssue: https://github.com/facebook/flow/issues/[0-9]+
suppress_comment=\\(.\\|\n\\)*\\$FlowPullRequest: https://github.com/facebook/flow/pull/[0-9]+

suppress_type=$FlowFixMe
```

Other Flow issues should be reported back. Check [our current version of `.flowconfig`](https://gitlab.skypicker.com/incubator/universe/blob/master/.flowconfig) to get more details.

## Published NPM packages

This monorepo hosts source code of the following NPM packages (only public packages are listed):

<!-- AUTOMATOR:UPDATE_DOCS -->

TODO

<!-- /AUTOMATOR:UPDATE_DOCS -->

Do you want to publish another package which is private or which doesn't exist yet? Let us know.
