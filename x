#!/bin/bash

# Adeira Universe eXecutor
# ------------------------
#
# Purpose of this script is to execute various tools and scripts across our monorepo quickly and
# easily. The idea is that it's independent of tools like NPM so it can naturally be used for
# other languages as well. Moreover, it's configured via code (not in `package.json`) so you can
# do whatever you want.
#
# TODO: mention other project specifics like for example SX property generated Flow types
#
# At this moment it doesn't do much more than `yarn run`, however, it the future, it could execute
# FBT in all the projects (like Relay Compiler does) or find all `SignedSource` occurrences and
# verify the signatures - all of this while leveraging all available threads.
#
# ## Prerequisites
#
# The script currently requires Rust to be installed on the machine. In the future this could be
# done automatically either by providing the compiled binaries directly or installing Rust
# automatically via `rustup`. For now, it's required to do it manually:
#
# Install Rust: https://www.rust-lang.org/tools/install
#
# Additionally, it's necessary to make this file executable:
#
# ```
# chmod +x ./x
# ```
#
# ## Usage
#
# Simply run the executor to see what can it do:
#
# ```
# ./x --help
# ./x relay --help
# ./x relay -- --help
# ```
#
# It is also possible to infer the subcommand names (write shorter versions) so all the following
# examples are equivalent:
#
# ```
# ./x relay -- --help
# ./x re -- --help
# ./x r -- --help
# ```

if ! command -v rustc &> /dev/null
  (cd src/x && cargo run --release -- "$@")
  exit
then
  echo "rustc could not be found, install Rust via https://www.rust-lang.org/tools/install"
  exit
fi
