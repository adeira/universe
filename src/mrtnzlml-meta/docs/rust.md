---
id: rust
title: Rust all-in
sidebar_label: Rust
---

https://www.rust-lang.org/

> A language empowering everyone to build reliable and efficient software.

- https://www.arewewebyet.org/
- https://github.com/flosse/rust-web-framework-comparison
- https://github.com/awslabs/aws-lambda-rust-runtime
- https://rust-analyzer.github.io/
- https://github.com/passcod/cargo-watch
- https://blog.burntsushi.net/rust-error-handling/
- https://gitlab.com/qonfucius/aragog
- https://doc.rust-lang.org/std/collections/index.html
- https://rust-lang-nursery.github.io/rust-cookbook/intro.html

## Interesting Stack Overflow questions

- [How do I concatenate strings?](https://stackoverflow.com/q/30154541/3135248)
- [Check if Rust is running a test build](https://stackoverflow.com/q/56217143/3135248)
- [What exactly does '#\[derive(Debug)\]' mean in Rust?](https://stackoverflow.com/q/46388386/3135248)
- [How to mock external dependencies in tests?](https://stackoverflow.com/q/51919079/3135248)
- [Why is there a large performance impact when looping over an array with 240 or more elements?](https://stackoverflow.com/q/57458460/3135248)

## How can I create parameterized tests in Rust?

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

## Rust pain points

- long compile time (but that's kinda a Rust feature/goal)
- shitty tests outputs (hard to read and get oriented, error messages are also hard to read)
- the testing framework is in general a bit weak (compared to Jest), for example awkward snapshot testing, [missing dataproviders](#how-can-i-create-parameterized-tests-in-rust) (test.each in Jest), testing only changed files, missing watch mode
