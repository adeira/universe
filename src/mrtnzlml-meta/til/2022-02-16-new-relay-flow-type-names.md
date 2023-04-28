---
title: New Flow types for Relay
tags: ['relay', 'flow']
---

Relay version 13 shipped with a new Rust Compiler and requires migration to the new Flow type names. @kassens described the migration path well in this comment: https://github.com/facebook/relay/issues/3792#issuecomment-1033933397

- `SomeFragment$data` (instead of `SomeFragment` (no suffix))
- `SomeFragment$fragmentType` (instead of `SomeFragment$ref`)
- `SomeQuery$variables` (instead of `SomeQueryVariables`)
- `SomeQuery$data` (instead of `SomeQueryResponse`, as it works like the `$data` for fragments and isn't the full response)
- `$fragmentSpreads` (as a key in generated files instead of `$refs`)

I also asked about the new Flow types here: https://github.com/facebook/relay/issues/3717
