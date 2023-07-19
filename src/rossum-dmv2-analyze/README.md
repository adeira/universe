A tool to analyze impact of DMv2 config changes on Rossum queues. It tries to answer the following question: if I change the DMv2 config in certain way, is it going to have positive or negative impact on the DMv2 results?

## Install

```bash
brew install adeira/universe/rossum-dmv2-analyze
```

## Run

```bash
rossum-dmv2-analyze --dm-config-file=./dmv2_config.json --dm-hook-id=252259 --queue-id=852015 --api-token=XXXXX
```

Try running `rossum-dmv2-analyze --help` for more information.

## Build

Check `/src/homebrew-universe` repo for more info about publishing into Homebrew.

### Build for Apple M1

```bash
rustup target add aarch64-apple-darwin

(cd src/rossum-dmv2-analyze && cargo build --release --target=aarch64-apple-darwin)

openssl sha256 src/rossum-dmv2-analyze/target/aarch64-apple-darwin/release/rossum-dmv2-analyze
```

### Build for Apple Intel

```bash
rustup target add x86_64-apple-darwin

(cd src/rossum-dmv2-analyze && cargo build --release --target=x86_64-apple-darwin)

openssl sha256 src/rossum-dmv2-analyze/target/x86_64-apple-darwin/release/rossum-dmv2-analyze
```

## TODO

- [ ] validate both DMv2 configs using [Valico](https://lib.rs/crates/valico) (at least required subset)
- [ ] make sure the API token is valid before spawning API calls
- [ ] make sure the config file exists and is valid before using it
- [ ] default to analyze all queues assigned to the DM hook if no queue ID is specified
- [ ] ...
