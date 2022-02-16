---
title: Understanding Rust Modules
---

Coming from JavaScript world, understanding Rust modules was a bit challenging. This document aims to describe the Rust modules system via common examples.

There are 3 important keywords ([source](https://dev.to/hertz4/rust-module-essentials-12oi)):

- `mod` declares a module
- `pub` exposes an item by a single level
- `use` pulls things in from an absolute path to the current scope

I recommend creating `experiments` package if you want to try these examples and run them via:

```text
cargo run --bin experiments
```

Sources:

- https://doc.rust-lang.org/reference/items/modules.html
- https://doc.rust-lang.org/reference/items/use-declarations.html
- https://doc.rust-lang.org/reference/visibility-and-privacy.html
- https://dev.to/hertz4/rust-module-essentials-12oi
- https://stackoverflow.com/q/28010796/3135248

## In-place (in-file) modules

```text
├── Cargo.toml
└── src
    └── main.rs
```

This way you can define the file inside one file:

```rust title="example/main.rs"
mod my_module {
    pub fn test() {
        println!("OK 👌");
    }
}

fn main() {
    my_module::test();
}
```

## Module in a separate file

The module `my_module` can be moved into separate file like so:

```text
├── Cargo.toml
└── src
    ├── main.rs
    └── my_module.rs
```

In this case `main` declares the module without the body:

```rust title="example/main.rs"
mod my_module;

fn main() {
    my_module::test();
}

```

Our module lives in a separate file without the `mod` declaration:

```rust title="example/my_module.rs"
pub fn test() {
    println!("OK 👌");
}
```

What happens if we move the module into separate file including the module declaration like in the following example?

```rust title="example/whatever.rs"
pub mod my_module {
    pub fn test() {
        println!("OK 👌");
    }
}
```

First, we have to declare the module public (see the `pub` keyword). Secondly, the module would have to be used like so:

```rust {1} title="example/main.rs"
mod whatever;

fn main() {
    whatever::my_module::test();
}
```

## Module in a separate directory

```text
├── Cargo.toml
└── src
    ├── main.rs
    └── my_module
        └── mod.rs
```

It's possible to decompose the [first example](#in-place-in-file-modules) a bit differently by introducing a new directory with special `mod.rs` file:

```rust title="example/main.rs"
mod my_module;

fn main() {
    my_module::test();
}
```

And the actual module:

```rust title="example/my_module/mod.rs"
pub fn test() {
    println!("OK 👌");
}
```

## Re-exporting submodule

So far, we used keywords `mod` to declare the module and `pub` to make it visible. Let's try to play around with `use` keywords. Imagine the following structure:

```text
├── Cargo.toml
└── src
    ├── main.rs
    └── my_module
        ├── mod.rs
        └── my_submodule.rs
```

File `main.rs` would use the submodule like so:

```rust title="example/main.rs"
mod my_module;

fn main() {
    my_module::my_submodule::test();
}
```

File `my_module/mod.rs` simply re-exports the submodule:

```rust title="example/my_module/mod.rs"
pub mod my_submodule;
```

And finally the submodule:

```rust title="example/my_module/submodule.rs"
pub fn test() {
    println!("OK 👌");
}
```

We could modify it in several ways. For example `main.rs` could import the `test` method directly like so:

```rust title="example/main.rs"
mod my_module;

use my_module::my_submodule::test;

fn main() {
    test();
}
```

What if we would like to hide the fact that there is a submodule and use `my_module::test` directly like in the following example?

```rust title="example/main.rs"
mod my_module;

fn main() {
    my_module::test();
}
```

This is easily achievable by re-exporting the submodule via `pub use` keywords:

```rust title="example/my_module/submodule.rs"
mod my_submodule;

pub use my_submodule::test;
```

### Reexporting with `self`

```rust
pub use self::implementation::api;

mod implementation {
    pub mod api {
        pub fn f() {}
    }
}
```

Any external crate referencing `implementation::api::f` would receive a privacy violation, while the path `api::f` would be allowed.

> When re-exporting a private item, it can be thought of as allowing the "privacy chain" being short-circuited through the reexport instead of passing through the namespace hierarchy as it normally would.

Source: https://doc.rust-lang.org/reference/visibility-and-privacy.html
