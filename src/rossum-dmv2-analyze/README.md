Run:

```bash
(cd src/rossum-dmv2-analyze && cargo run -- --config-file=./dmv2_config.json --dm-hook-id=252259 --queue-id=852015 --api-token=XXXXX)
```

Build Apple M1:

```bash
rustup target add aarch64-apple-darwin
(cd src/rossum-dmv2-analyze && cargo build --release --target=aarch64-apple-darwin)
```

Build Apple Intel:

```bash
rustup target add x86_64-apple-darwin
(cd src/rossum-dmv2-analyze && cargo build --release --target=x86_64-apple-darwin)
```
