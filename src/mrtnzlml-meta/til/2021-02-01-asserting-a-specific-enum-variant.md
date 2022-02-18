---
title: 'Asserting a specific enum variant'
tags: ['rust']
---

Specifically, asserting that result is a specific variant of an enum of structs when we don't care about the fields (something like "is instance of"):

```rust
assert!(matches!(return_with_fields(), MyEnum::WithFields { .. }));
```

Source: https://stackoverflow.com/a/51123901/3135248
