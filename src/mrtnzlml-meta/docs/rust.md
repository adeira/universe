---
id: rust
title: Rust all-in
sidebar_label: Rust all-in
---

> A language empowering everyone to build reliable and efficient software.

https://www.rust-lang.org/

The most important links when working with Rust (alphabetically):

- https://cheats.rs/
- https://godbolt.org/z/fP3Kj6PMx
- https://lib.rs/
- https://veykril.github.io/tlborm/

Other awesome links (alphabetically):

- https://blog.burntsushi.net/rust-error-handling/
- https://caniuse.rs/
- https://crates.io/
- https://doc.rust-lang.org/std/collections/index.html
- https://github.com/awslabs/aws-lambda-rust-runtime
- https://github.com/flosse/rust-web-framework-comparison
- https://github.com/passcod/cargo-watch
- https://gitlab.com/qonfucius/aragog
- https://rust-analyzer.github.io/
- https://rust-lang-nursery.github.io/rust-cookbook/intro.html
- https://rust.extension.sh/
- https://www.arewewebyet.org/

## Interesting Stack Overflow questions

- [How do I concatenate strings?](https://stackoverflow.com/q/30154541/3135248)
- [Check if Rust is running a test build](https://stackoverflow.com/q/56217143/3135248)
- [What exactly does '#\[derive(Debug)\]' mean in Rust?](https://stackoverflow.com/q/46388386/3135248)
- [How to mock external dependencies in tests?](https://stackoverflow.com/q/51919079/3135248)
- [Why is there a large performance impact when looping over an array with 240 or more elements?](https://stackoverflow.com/q/57458460/3135248)

## Difference between `iter`, `iter_mut`, and `into_iter`

- the iterator returned by `into_iter` may yield any of `T`, `&T` or `&mut T`, depending on the context
- the iterator returned by `iter` will yield `&T`, by convention
- the iterator returned by `iter_mut` will yield `&mut T`, by convention

If you just need to "look at" the data, use `iter`, if you need to edit/mutate it, use `iter_mut`, and if you need to give it a new owner, use `into_iter`.

Sources:

- https://stackoverflow.com/a/34745885/3135248
- https://hermanradtke.com/2015/06/22/effectively-using-iterators-in-rust.html

## Difference between `Copy` and `Clone`

Copies happen implicitly, for example as part of an assignment `y = x`. The behavior of `Copy` is not overloadable; it is always a simple bit-wise copy.

Cloning is an explicit action, `x.clone()`. The implementation of `Clone` can provide any type-specific behavior necessary to duplicate values safely. For example, the implementation of `Clone` for `String` needs to copy the pointed-to string buffer in the heap. A simple bitwise copy of `String` values would merely copy the pointer, leading to a double free down the line. For this reason, `String` is `Clone` but not `Copy`.

`Clone` is a supertrait of `Copy`, so everything which is `Copy` must also implement `Clone`. If a type is `Copy` then its `Clone` implementation only needs to return `*self`:

```rust
struct MyStruct;

impl Copy for MyStruct { }

impl Clone for MyStruct {
    fn clone(&self) -> MyStruct {
        *self
    }
}
```

Source: https://github.com/rust-lang/rust/blob/2e6eaceedeeda764056eb0e2134735793533770d/src/libcore/marker.rs#L272

Different wording:

- `Copy` is implicit, inexpensive, and cannot be re-implemented (memcpy)
- `Clone` is explicit, may be expensive, and may be re-implement arbitrarily

Read this interesting question: https://stackoverflow.com/q/31012923/3135248

## Visibility and privacy in Rust

Visibility and privacy o modules in Rust is well explained here: https://doc.rust-lang.org/reference/visibility-and-privacy.html

In short: (almost) everything is private by default and you can make it public via `pub` keyword. There are several additional restrictions of the `pub` keyword:

- `pub(in path)` makes an item visible within the provided `path`. `path` must be an ancestor module of the item whose visibility is being declared.
- `pub(crate)` makes an item visible within the current crate.
- `pub(super)` makes an item visible to the parent module. This is equivalent to `pub(in super)`.
- `pub(self)` makes an item visible to the current module. This is equivalent to `pub(in self)` or not using `pub` at all.

Example:

```rust
pub mod outer_mod {
    pub mod inner_mod {
        // This function is visible within `outer_mod`
        pub(in crate::outer_mod) fn outer_mod_visible_fn() {}

        // This function is visible to the entire crate
        pub(crate) fn crate_visible_fn() {}

        // This function is visible within `outer_mod`
        pub(super) fn super_mod_visible_fn() {
            // This function is visible since we're in the same `mod`
            inner_mod_visible_fn();
        }

        // This function is visible only within `inner_mod`,
        // which is the same as leaving it private.
        pub(self) fn inner_mod_visible_fn() {}
    }
    pub fn foo() {
        inner_mod::outer_mod_visible_fn();
        inner_mod::crate_visible_fn();
        inner_mod::super_mod_visible_fn();

        // This function is no longer visible since we're outside of `inner_mod`
        // Error! `inner_mod_visible_fn` is private
        //inner_mod::inner_mod_visible_fn();
    }
}

fn bar() {
    // This function is still visible since we're in the same crate
    outer_mod::inner_mod::crate_visible_fn();

    // This function is no longer visible since we're outside of `outer_mod`
    // Error! `super_mod_visible_fn` is private
    //outer_mod::inner_mod::super_mod_visible_fn();

    // This function is no longer visible since we're outside of `outer_mod`
    // Error! `outer_mod_visible_fn` is private
    //outer_mod::inner_mod::outer_mod_visible_fn();

    outer_mod::foo();
}

fn main() { bar() }
```

## How to create parameterized tests in Rust?

https://stackoverflow.com/q/34662713/3135248

```rust
macro_rules! fib_tests {
    ($($name:ident: $value:expr,)*) => {
    $(
        #[test]
        fn $name() {
            let (input, expected) = $value;
            assert_eq!(expected, fib(input));
        }
    )*
    }
}

fib_tests! {
    fib_0: (0, 0),
    fib_1: (1, 1),
    fib_2: (2, 1),
    fib_3: (3, 2),
    fib_4: (4, 3),
    fib_5: (5, 5),
    fib_6: (6, 8),
}
```

An interesting alternative approach is to use [proptest](https://github.com/AltSysrq/proptest):

```rust
proptest! {
    #[test]
    fn parses_all_valid_dates(s in "[0-9]{4}-[0-9]{2}-[0-9]{2}") {
        parse_date(&s).unwrap();
    }
}
```

Or with extra config:

```rust
proptest! {
    #![proptest_config(ProptestConfig {
      cases: 1000, .. ProptestConfig::default()
    })]
    #[test]
    fn parse_authorization_header_proptest(token in "[a-zA-Z0-9-._~+/]+") {
        println!("Bearer {}", token); // visible only with `cargo test -- --nocapture`
        let result = parse_authorization_header(format!("Bearer {}", token).as_str()).unwrap();
        prop_assert_eq!(result, token)
    }
}
```

## Asserting a specific enum variant

Specifically, asserting that result is a specific variant of an enum of structs when we don't care about the fields (something like "is instance of"):

```rust
assert!(matches!(return_with_fields(), MyEnum::WithFields { .. }));
```

Source: https://stackoverflow.com/a/51123901/3135248

## Reading and writing files

https://stackoverflow.com/a/31193386/3135248

Read a file to a `String`:

```rust
use std::fs;

fn main() {
    let data = fs::read_to_string("/etc/hosts").expect("Unable to read file");
    println!("{}", data);
}
```

Read a file as a `Vec<u8>`:

```rust
use std::fs;

fn main() {
    let data = fs::read("/etc/hosts").expect("Unable to read file");
    println!("{}", data.len());
}
```

Write a file:

```rust
use std::fs;

fn main() {
    let data = "Some data!";
    fs::write("/tmp/foo", data).expect("Unable to write file");
}
```

## Macro repetitions

Below is a macro which formats each element as a string. It matches zero or more comma-separated expressions and expands to an expression that constructs a vector.

```rust
macro_rules! vec_strs {
    (
        // Start a repetition:
        $(
            // Each repeat must contain an expression...
            $element:expr
        )
        // ...separated by commas...
        ,
        // ...zero or more times.
        *
    ) => {
        // Enclose the expansion in a block so that we can use
        // multiple statements.
        {
            let mut v = Vec::new();

            // Start a repetition:
            $(
                // Each repeat will contain the following statement, with
                // $element replaced with the corresponding expression.
                v.push(format!("{}", $element));
            )*

            v
        }
    };
}

fn main() {
  let s = vec_strs![1, "a", true, 3.14159f32];
  assert_eq!(s, &["1", "a", "true", "3.14159"]);
}
```

Source: https://veykril.github.io/tlborm/macros/macro_rules.html#repetitions

## Rust pain points

- long compile time (but that's kinda a Rust feature/goal)
- shitty tests outputs (hard to read and get oriented, error messages are also hard to read)
- the testing framework is in general a bit weak (compared to Jest), for example awkward snapshot testing, [missing dataproviders](#how-can-i-create-parameterized-tests-in-rust) (test.each in Jest), testing only changed files, missing watch mode
