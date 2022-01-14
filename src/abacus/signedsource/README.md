This packages originated from [https://github.com/facebook/relay](https://github.com/facebook/relay/tree/b89e5ccfa737a1222e4acee7682e964456017220/compiler/crates/signedsource). It verifies automatically generated files and effectively prevents from manual pollution. Usage (simplified GraphQL schema snapshoting example):

```rust
// we can save a signed file
let new_snapshot = signedsource::sign_file(&format!("# {}\n\n{}", signedsource::SIGNING_TOKEN, schema))

// or verify its content
signedsource::is_signed(&old_snapshot)
signedsource::is_valid_signature(&old_snapshot)
```

It is also possible to re-sign file which is already signed (means update the signature when it already exists).
