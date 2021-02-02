"""
@generated
cargo-raze generated Bazel file.

DO NOT EDIT! Replaced on runs of cargo-raze
"""

load("@bazel_tools//tools/build_defs/repo:git.bzl", "new_git_repository")  # buildifier: disable=load
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")  # buildifier: disable=load
load("@bazel_tools//tools/build_defs/repo:utils.bzl", "maybe")  # buildifier: disable=load

def raze_fetch_remote_crates():
    """This function defines a collection of repos and should be called in a WORKSPACE file"""
    maybe(
        http_archive,
        name = "raze__adler__0_2_3",
        url = "https://crates.io/api/v1/crates/adler/0.2.3/download",
        type = "tar.gz",
        sha256 = "ee2a4ec343196209d6594e19543ae87a39f96d5534d7174822a3ad825dd6ed7e",
        strip_prefix = "adler-0.2.3",
        build_file = Label("//third_party/cargo/remote:BUILD.adler-0.2.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__adler32__1_2_0",
        url = "https://crates.io/api/v1/crates/adler32/1.2.0/download",
        type = "tar.gz",
        sha256 = "aae1277d39aeec15cb388266ecc24b11c80469deae6067e17a1a7aa9e5c1f234",
        strip_prefix = "adler32-1.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.adler32-1.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__aho_corasick__0_7_15",
        url = "https://crates.io/api/v1/crates/aho-corasick/0.7.15/download",
        type = "tar.gz",
        sha256 = "7404febffaa47dac81aa44dba71523c9d069b1bdc50a77db41195149e17f68e5",
        strip_prefix = "aho-corasick-0.7.15",
        build_file = Label("//third_party/cargo/remote:BUILD.aho-corasick-0.7.15.bazel"),
    )

    maybe(
        new_git_repository,
        name = "raze__arangors__0_4_6",
        remote = "https://github.com/mrtnzlml/arangors",
        commit = "39b5c673b994832d12ca989fe7cccd2a08b0211a",
        build_file = Label("//third_party/cargo/remote:BUILD.arangors-0.4.6.bazel"),
        init_submodules = True,
    )

    maybe(
        http_archive,
        name = "raze__arrayvec__0_5_2",
        url = "https://crates.io/api/v1/crates/arrayvec/0.5.2/download",
        type = "tar.gz",
        sha256 = "23b62fc65de8e4e7f52534fb52b0f3ed04746ae267519eef2a83941e8085068b",
        strip_prefix = "arrayvec-0.5.2",
        build_file = Label("//third_party/cargo/remote:BUILD.arrayvec-0.5.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ascii__0_9_3",
        url = "https://crates.io/api/v1/crates/ascii/0.9.3/download",
        type = "tar.gz",
        sha256 = "eab1c04a571841102f5345a8fc0f6bb3d31c315dec879b5c6e42e40ce7ffa34e",
        strip_prefix = "ascii-0.9.3",
        build_file = Label("//third_party/cargo/remote:BUILD.ascii-0.9.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_channel__1_5_1",
        url = "https://crates.io/api/v1/crates/async-channel/1.5.1/download",
        type = "tar.gz",
        sha256 = "59740d83946db6a5af71ae25ddf9562c2b176b2ca42cf99a455f09f4a220d6b9",
        strip_prefix = "async-channel-1.5.1",
        build_file = Label("//third_party/cargo/remote:BUILD.async-channel-1.5.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_compression__0_3_6",
        url = "https://crates.io/api/v1/crates/async-compression/0.3.6/download",
        type = "tar.gz",
        sha256 = "fb1ff21a63d3262af46b9f33a826a8d134e2d0d9b2179c86034948b732ea8b2a",
        strip_prefix = "async-compression-0.3.6",
        build_file = Label("//third_party/cargo/remote:BUILD.async-compression-0.3.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_executor__1_4_0",
        url = "https://crates.io/api/v1/crates/async-executor/1.4.0/download",
        type = "tar.gz",
        sha256 = "eb877970c7b440ead138f6321a3b5395d6061183af779340b65e20c0fede9146",
        strip_prefix = "async-executor-1.4.0",
        build_file = Label("//third_party/cargo/remote:BUILD.async-executor-1.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_global_executor__1_4_3",
        url = "https://crates.io/api/v1/crates/async-global-executor/1.4.3/download",
        type = "tar.gz",
        sha256 = "73079b49cd26b8fd5a15f68fc7707fc78698dc2a3d61430f2a7a9430230dfa04",
        strip_prefix = "async-global-executor-1.4.3",
        build_file = Label("//third_party/cargo/remote:BUILD.async-global-executor-1.4.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_io__1_3_1",
        url = "https://crates.io/api/v1/crates/async-io/1.3.1/download",
        type = "tar.gz",
        sha256 = "9315f8f07556761c3e48fec2e6b276004acf426e6dc068b2c2251854d65ee0fd",
        strip_prefix = "async-io-1.3.1",
        build_file = Label("//third_party/cargo/remote:BUILD.async-io-1.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_mutex__1_4_0",
        url = "https://crates.io/api/v1/crates/async-mutex/1.4.0/download",
        type = "tar.gz",
        sha256 = "479db852db25d9dbf6204e6cb6253698f175c15726470f78af0d918e99d6156e",
        strip_prefix = "async-mutex-1.4.0",
        build_file = Label("//third_party/cargo/remote:BUILD.async-mutex-1.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_std__1_8_0",
        url = "https://crates.io/api/v1/crates/async-std/1.8.0/download",
        type = "tar.gz",
        sha256 = "8f9f84f1280a2b436a2c77c2582602732b6c2f4321d5494d6e799e6c367859a8",
        strip_prefix = "async-std-1.8.0",
        build_file = Label("//third_party/cargo/remote:BUILD.async-std-1.8.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_task__4_0_3",
        url = "https://crates.io/api/v1/crates/async-task/4.0.3/download",
        type = "tar.gz",
        sha256 = "e91831deabf0d6d7ec49552e489aed63b7456a7a3c46cff62adad428110b0af0",
        strip_prefix = "async-task-4.0.3",
        build_file = Label("//third_party/cargo/remote:BUILD.async-task-4.0.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_trait__0_1_42",
        url = "https://crates.io/api/v1/crates/async-trait/0.1.42/download",
        type = "tar.gz",
        sha256 = "8d3a45e77e34375a7923b1e8febb049bb011f064714a8e17a1a616fef01da13d",
        strip_prefix = "async-trait-0.1.42",
        build_file = Label("//third_party/cargo/remote:BUILD.async-trait-0.1.42.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__atomic_waker__1_0_0",
        url = "https://crates.io/api/v1/crates/atomic-waker/1.0.0/download",
        type = "tar.gz",
        sha256 = "065374052e7df7ee4047b1160cca5e1467a12351a40b3da123c870ba0b8eda2a",
        strip_prefix = "atomic-waker-1.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.atomic-waker-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__atty__0_2_14",
        url = "https://crates.io/api/v1/crates/atty/0.2.14/download",
        type = "tar.gz",
        sha256 = "d9b39be18770d11421cdb1b9947a45dd3f37e93092cbf377614828a319d5fee8",
        strip_prefix = "atty-0.2.14",
        build_file = Label("//third_party/cargo/remote:BUILD.atty-0.2.14.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__autocfg__0_1_7",
        url = "https://crates.io/api/v1/crates/autocfg/0.1.7/download",
        type = "tar.gz",
        sha256 = "1d49d90015b3c36167a20fe2810c5cd875ad504b39cff3d4eae7977e6b7c1cb2",
        strip_prefix = "autocfg-0.1.7",
        build_file = Label("//third_party/cargo/remote:BUILD.autocfg-0.1.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__autocfg__1_0_1",
        url = "https://crates.io/api/v1/crates/autocfg/1.0.1/download",
        type = "tar.gz",
        sha256 = "cdb031dd78e28731d87d56cc8ffef4a8f36ca26c38fe2de700543e627f8a464a",
        strip_prefix = "autocfg-1.0.1",
        build_file = Label("//third_party/cargo/remote:BUILD.autocfg-1.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__base64__0_12_3",
        url = "https://crates.io/api/v1/crates/base64/0.12.3/download",
        type = "tar.gz",
        sha256 = "3441f0f7b02788e948e47f457ca01f1d7e6d92c693bc132c22b087d3141c03ff",
        strip_prefix = "base64-0.12.3",
        build_file = Label("//third_party/cargo/remote:BUILD.base64-0.12.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__base64__0_13_0",
        url = "https://crates.io/api/v1/crates/base64/0.13.0/download",
        type = "tar.gz",
        sha256 = "904dfeac50f3cdaba28fc6f57fdcddb75f49ed61346676a78c4ffe55877802fd",
        strip_prefix = "base64-0.13.0",
        build_file = Label("//third_party/cargo/remote:BUILD.base64-0.13.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bit_set__0_5_2",
        url = "https://crates.io/api/v1/crates/bit-set/0.5.2/download",
        type = "tar.gz",
        sha256 = "6e11e16035ea35e4e5997b393eacbf6f63983188f7a2ad25bfb13465f5ad59de",
        strip_prefix = "bit-set-0.5.2",
        build_file = Label("//third_party/cargo/remote:BUILD.bit-set-0.5.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bit_vec__0_6_3",
        url = "https://crates.io/api/v1/crates/bit-vec/0.6.3/download",
        type = "tar.gz",
        sha256 = "349f9b6a179ed607305526ca489b34ad0a41aed5f7980fa90eb03160b69598fb",
        strip_prefix = "bit-vec-0.6.3",
        build_file = Label("//third_party/cargo/remote:BUILD.bit-vec-0.6.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bitflags__1_2_1",
        url = "https://crates.io/api/v1/crates/bitflags/1.2.1/download",
        type = "tar.gz",
        sha256 = "cf1de2fe8c75bc145a2f577add951f8134889b4795d47466a54a5c846d691693",
        strip_prefix = "bitflags-1.2.1",
        build_file = Label("//third_party/cargo/remote:BUILD.bitflags-1.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__block_buffer__0_7_3",
        url = "https://crates.io/api/v1/crates/block-buffer/0.7.3/download",
        type = "tar.gz",
        sha256 = "c0940dc441f31689269e10ac70eb1002a3a1d3ad1390e030043662eb7fe4688b",
        strip_prefix = "block-buffer-0.7.3",
        build_file = Label("//third_party/cargo/remote:BUILD.block-buffer-0.7.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__block_buffer__0_9_0",
        url = "https://crates.io/api/v1/crates/block-buffer/0.9.0/download",
        type = "tar.gz",
        sha256 = "4152116fd6e9dadb291ae18fc1ec3575ed6d84c29642d97890f4b4a3417297e4",
        strip_prefix = "block-buffer-0.9.0",
        build_file = Label("//third_party/cargo/remote:BUILD.block-buffer-0.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__block_padding__0_1_5",
        url = "https://crates.io/api/v1/crates/block-padding/0.1.5/download",
        type = "tar.gz",
        sha256 = "fa79dedbb091f449f1f39e53edf88d5dbe95f895dae6135a8d7b881fb5af73f5",
        strip_prefix = "block-padding-0.1.5",
        build_file = Label("//third_party/cargo/remote:BUILD.block-padding-0.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__blocking__1_0_2",
        url = "https://crates.io/api/v1/crates/blocking/1.0.2/download",
        type = "tar.gz",
        sha256 = "c5e170dbede1f740736619b776d7251cb1b9095c435c34d8ca9f57fcd2f335e9",
        strip_prefix = "blocking-1.0.2",
        build_file = Label("//third_party/cargo/remote:BUILD.blocking-1.0.2.bazel"),
    )

    maybe(
        new_git_repository,
        name = "raze__blurhash_wasm__0_2_0",
        remote = "https://github.com/fpapado/blurhash-rust-wasm",
        commit = "a81e33c46a10a63f1f0ed25aa48a6e3066d26804",
        build_file = Label("//third_party/cargo/remote:BUILD.blurhash-wasm-0.2.0.bazel"),
        init_submodules = True,
    )

    maybe(
        http_archive,
        name = "raze__bson__1_1_0",
        url = "https://crates.io/api/v1/crates/bson/1.1.0/download",
        type = "tar.gz",
        sha256 = "c11f16001d679cb13d14b2c93c7d0fa13bb484a87c34a6c4c39707ad936499b5",
        strip_prefix = "bson-1.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.bson-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__buf_redux__0_8_4",
        url = "https://crates.io/api/v1/crates/buf_redux/0.8.4/download",
        type = "tar.gz",
        sha256 = "b953a6887648bb07a535631f2bc00fbdb2a2216f135552cb3f534ed136b9c07f",
        strip_prefix = "buf_redux-0.8.4",
        build_file = Label("//third_party/cargo/remote:BUILD.buf_redux-0.8.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bumpalo__3_4_0",
        url = "https://crates.io/api/v1/crates/bumpalo/3.4.0/download",
        type = "tar.gz",
        sha256 = "2e8c087f005730276d1096a652e92a8bacee2e2472bcc9715a74d2bec38b5820",
        strip_prefix = "bumpalo-3.4.0",
        build_file = Label("//third_party/cargo/remote:BUILD.bumpalo-3.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__byte_tools__0_3_1",
        url = "https://crates.io/api/v1/crates/byte-tools/0.3.1/download",
        type = "tar.gz",
        sha256 = "e3b5ca7a04898ad4bcd41c90c5285445ff5b791899bb1b0abdd2a2aa791211d7",
        strip_prefix = "byte-tools-0.3.1",
        build_file = Label("//third_party/cargo/remote:BUILD.byte-tools-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bytemuck__1_5_0",
        url = "https://crates.io/api/v1/crates/bytemuck/1.5.0/download",
        type = "tar.gz",
        sha256 = "5a4bad0c5981acc24bc09e532f35160f952e35422603f0563cd7a73c2c2e65a0",
        strip_prefix = "bytemuck-1.5.0",
        build_file = Label("//third_party/cargo/remote:BUILD.bytemuck-1.5.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__byteorder__1_3_4",
        url = "https://crates.io/api/v1/crates/byteorder/1.3.4/download",
        type = "tar.gz",
        sha256 = "08c48aae112d48ed9f069b33538ea9e3e90aa263cfa3d1c24309612b1f7472de",
        strip_prefix = "byteorder-1.3.4",
        build_file = Label("//third_party/cargo/remote:BUILD.byteorder-1.3.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bytes__0_5_6",
        url = "https://crates.io/api/v1/crates/bytes/0.5.6/download",
        type = "tar.gz",
        sha256 = "0e4cec68f03f32e44924783795810fa50a7035d8c8ebe78580ad7e6c703fba38",
        strip_prefix = "bytes-0.5.6",
        build_file = Label("//third_party/cargo/remote:BUILD.bytes-0.5.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cache_padded__1_1_1",
        url = "https://crates.io/api/v1/crates/cache-padded/1.1.1/download",
        type = "tar.gz",
        sha256 = "631ae5198c9be5e753e5cc215e1bd73c2b466a3565173db433f52bb9d3e66dba",
        strip_prefix = "cache-padded-1.1.1",
        build_file = Label("//third_party/cargo/remote:BUILD.cache-padded-1.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cc__1_0_65",
        url = "https://crates.io/api/v1/crates/cc/1.0.65/download",
        type = "tar.gz",
        sha256 = "95752358c8f7552394baf48cd82695b345628ad3f170d607de3ca03b8dacca15",
        strip_prefix = "cc-1.0.65",
        build_file = Label("//third_party/cargo/remote:BUILD.cc-1.0.65.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cfg_if__0_1_10",
        url = "https://crates.io/api/v1/crates/cfg-if/0.1.10/download",
        type = "tar.gz",
        sha256 = "4785bdd1c96b2a846b2bd7cc02e86b6b3dbf14e7e53446c4f54c92a361040822",
        strip_prefix = "cfg-if-0.1.10",
        build_file = Label("//third_party/cargo/remote:BUILD.cfg-if-0.1.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cfg_if__1_0_0",
        url = "https://crates.io/api/v1/crates/cfg-if/1.0.0/download",
        type = "tar.gz",
        sha256 = "baf1de4339761588bc0619e3cbc0120ee582ebb74b53b4efbf79117bd2da40fd",
        strip_prefix = "cfg-if-1.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.cfg-if-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__chrono__0_4_19",
        url = "https://crates.io/api/v1/crates/chrono/0.4.19/download",
        type = "tar.gz",
        sha256 = "670ad68c9088c2a963aaa298cb369688cf3f9465ce5e2d4ca10e6e0098a1ce73",
        strip_prefix = "chrono-0.4.19",
        build_file = Label("//third_party/cargo/remote:BUILD.chrono-0.4.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cloudabi__0_0_3",
        url = "https://crates.io/api/v1/crates/cloudabi/0.0.3/download",
        type = "tar.gz",
        sha256 = "ddfc5b9aa5d4507acaf872de71051dfd0e309860e88966e1051e462a077aac4f",
        strip_prefix = "cloudabi-0.0.3",
        build_file = Label("//third_party/cargo/remote:BUILD.cloudabi-0.0.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__color_quant__1_1_0",
        url = "https://crates.io/api/v1/crates/color_quant/1.1.0/download",
        type = "tar.gz",
        sha256 = "3d7b894f5411737b7867f4827955924d7c254fc9f4d91a6aad6b097804b1018b",
        strip_prefix = "color_quant-1.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.color_quant-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__combine__3_8_1",
        url = "https://crates.io/api/v1/crates/combine/3.8.1/download",
        type = "tar.gz",
        sha256 = "da3da6baa321ec19e1cc41d31bf599f00c783d0517095cdaf0332e3fe8d20680",
        strip_prefix = "combine-3.8.1",
        build_file = Label("//third_party/cargo/remote:BUILD.combine-3.8.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__concurrent_queue__1_2_2",
        url = "https://crates.io/api/v1/crates/concurrent-queue/1.2.2/download",
        type = "tar.gz",
        sha256 = "30ed07550be01594c6026cff2a1d7fe9c8f683caa798e12b68694ac9e88286a3",
        strip_prefix = "concurrent-queue-1.2.2",
        build_file = Label("//third_party/cargo/remote:BUILD.concurrent-queue-1.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__config__0_10_1",
        url = "https://crates.io/api/v1/crates/config/0.10.1/download",
        type = "tar.gz",
        sha256 = "19b076e143e1d9538dde65da30f8481c2a6c44040edb8e02b9bf1351edb92ce3",
        strip_prefix = "config-0.10.1",
        build_file = Label("//third_party/cargo/remote:BUILD.config-0.10.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__console__0_14_0",
        url = "https://crates.io/api/v1/crates/console/0.14.0/download",
        type = "tar.gz",
        sha256 = "7cc80946b3480f421c2f17ed1cb841753a371c7c5104f51d507e13f532c856aa",
        strip_prefix = "console-0.14.0",
        build_file = Label("//third_party/cargo/remote:BUILD.console-0.14.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__console_error_panic_hook__0_1_6",
        url = "https://crates.io/api/v1/crates/console_error_panic_hook/0.1.6/download",
        type = "tar.gz",
        sha256 = "b8d976903543e0c48546a91908f21588a680a8c8f984df9a5d69feccb2b2a211",
        strip_prefix = "console_error_panic_hook-0.1.6",
        build_file = Label("//third_party/cargo/remote:BUILD.console_error_panic_hook-0.1.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__const_fn__0_4_5",
        url = "https://crates.io/api/v1/crates/const_fn/0.4.5/download",
        type = "tar.gz",
        sha256 = "28b9d6de7f49e22cf97ad17fc4036ece69300032f45f78f30b4a4482cdc3f4a6",
        strip_prefix = "const_fn-0.4.5",
        build_file = Label("//third_party/cargo/remote:BUILD.const_fn-0.4.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__core_foundation__0_9_1",
        url = "https://crates.io/api/v1/crates/core-foundation/0.9.1/download",
        type = "tar.gz",
        sha256 = "0a89e2ae426ea83155dccf10c0fa6b1463ef6d5fcb44cee0b224a408fa640a62",
        strip_prefix = "core-foundation-0.9.1",
        build_file = Label("//third_party/cargo/remote:BUILD.core-foundation-0.9.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__core_foundation_sys__0_8_2",
        url = "https://crates.io/api/v1/crates/core-foundation-sys/0.8.2/download",
        type = "tar.gz",
        sha256 = "ea221b5284a47e40033bf9b66f35f984ec0ea2931eb03505246cd27a963f981b",
        strip_prefix = "core-foundation-sys-0.8.2",
        build_file = Label("//third_party/cargo/remote:BUILD.core-foundation-sys-0.8.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cpuid_bool__0_1_2",
        url = "https://crates.io/api/v1/crates/cpuid-bool/0.1.2/download",
        type = "tar.gz",
        sha256 = "8aebca1129a03dc6dc2b127edd729435bbc4a37e1d5f4d7513165089ceb02634",
        strip_prefix = "cpuid-bool-0.1.2",
        build_file = Label("//third_party/cargo/remote:BUILD.cpuid-bool-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crc32fast__1_2_1",
        url = "https://crates.io/api/v1/crates/crc32fast/1.2.1/download",
        type = "tar.gz",
        sha256 = "81156fece84ab6a9f2afdb109ce3ae577e42b1228441eded99bd77f627953b1a",
        strip_prefix = "crc32fast-1.2.1",
        build_file = Label("//third_party/cargo/remote:BUILD.crc32fast-1.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_channel__0_5_0",
        url = "https://crates.io/api/v1/crates/crossbeam-channel/0.5.0/download",
        type = "tar.gz",
        sha256 = "dca26ee1f8d361640700bde38b2c37d8c22b3ce2d360e1fc1c74ea4b0aa7d775",
        strip_prefix = "crossbeam-channel-0.5.0",
        build_file = Label("//third_party/cargo/remote:BUILD.crossbeam-channel-0.5.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_deque__0_8_0",
        url = "https://crates.io/api/v1/crates/crossbeam-deque/0.8.0/download",
        type = "tar.gz",
        sha256 = "94af6efb46fef72616855b036a624cf27ba656ffc9be1b9a3c931cfc7749a9a9",
        strip_prefix = "crossbeam-deque-0.8.0",
        build_file = Label("//third_party/cargo/remote:BUILD.crossbeam-deque-0.8.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_epoch__0_9_1",
        url = "https://crates.io/api/v1/crates/crossbeam-epoch/0.9.1/download",
        type = "tar.gz",
        sha256 = "a1aaa739f95311c2c7887a76863f500026092fb1dce0161dab577e559ef3569d",
        strip_prefix = "crossbeam-epoch-0.9.1",
        build_file = Label("//third_party/cargo/remote:BUILD.crossbeam-epoch-0.9.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_queue__0_3_1",
        url = "https://crates.io/api/v1/crates/crossbeam-queue/0.3.1/download",
        type = "tar.gz",
        sha256 = "0f6cb3c7f5b8e51bc3ebb73a2327ad4abdbd119dc13223f14f961d2f38486756",
        strip_prefix = "crossbeam-queue-0.3.1",
        build_file = Label("//third_party/cargo/remote:BUILD.crossbeam-queue-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_utils__0_8_1",
        url = "https://crates.io/api/v1/crates/crossbeam-utils/0.8.1/download",
        type = "tar.gz",
        sha256 = "02d96d1e189ef58269ebe5b97953da3274d83a93af647c2ddd6f9dab28cedb8d",
        strip_prefix = "crossbeam-utils-0.8.1",
        build_file = Label("//third_party/cargo/remote:BUILD.crossbeam-utils-0.8.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ctor__0_1_16",
        url = "https://crates.io/api/v1/crates/ctor/0.1.16/download",
        type = "tar.gz",
        sha256 = "7fbaabec2c953050352311293be5c6aba8e141ba19d6811862b232d6fd020484",
        strip_prefix = "ctor-0.1.16",
        build_file = Label("//third_party/cargo/remote:BUILD.ctor-0.1.16.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__data_encoding__2_3_2",
        url = "https://crates.io/api/v1/crates/data-encoding/2.3.2/download",
        type = "tar.gz",
        sha256 = "3ee2393c4a91429dffb4bedf19f4d6abf27d8a732c8ce4980305d782e5426d57",
        strip_prefix = "data-encoding-2.3.2",
        build_file = Label("//third_party/cargo/remote:BUILD.data-encoding-2.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__dataloader__0_14_0",
        url = "https://crates.io/api/v1/crates/dataloader/0.14.0/download",
        type = "tar.gz",
        sha256 = "730c46307af66e10aa278fa92d6a5591b976a4859f8463329c77be3982e6ab4f",
        strip_prefix = "dataloader-0.14.0",
        build_file = Label("//third_party/cargo/remote:BUILD.dataloader-0.14.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__deadpool__0_7_0",
        url = "https://crates.io/api/v1/crates/deadpool/0.7.0/download",
        type = "tar.gz",
        sha256 = "3d126179d86aee4556e54f5f3c6bf6d9884e7cc52cef82f77ee6f90a7747616d",
        strip_prefix = "deadpool-0.7.0",
        build_file = Label("//third_party/cargo/remote:BUILD.deadpool-0.7.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__deflate__0_8_6",
        url = "https://crates.io/api/v1/crates/deflate/0.8.6/download",
        type = "tar.gz",
        sha256 = "73770f8e1fe7d64df17ca66ad28994a0a623ea497fa69486e14984e715c5d174",
        strip_prefix = "deflate-0.8.6",
        build_file = Label("//third_party/cargo/remote:BUILD.deflate-0.8.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__derive_utils__0_11_0",
        url = "https://crates.io/api/v1/crates/derive_utils/0.11.0/download",
        type = "tar.gz",
        sha256 = "64196eb9f551916167225134f1e8a90f0b5774331d3c900d6328fd94bafe3544",
        strip_prefix = "derive_utils-0.11.0",
        build_file = Label("//third_party/cargo/remote:BUILD.derive_utils-0.11.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__digest__0_8_1",
        url = "https://crates.io/api/v1/crates/digest/0.8.1/download",
        type = "tar.gz",
        sha256 = "f3d0c8c8752312f9713efd397ff63acb9f85585afbf179282e720e7704954dd5",
        strip_prefix = "digest-0.8.1",
        build_file = Label("//third_party/cargo/remote:BUILD.digest-0.8.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__digest__0_9_0",
        url = "https://crates.io/api/v1/crates/digest/0.9.0/download",
        type = "tar.gz",
        sha256 = "d3dd60d1080a57a05ab032377049e0591415d2b31afd7028356dbf3cc6dcb066",
        strip_prefix = "digest-0.9.0",
        build_file = Label("//third_party/cargo/remote:BUILD.digest-0.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__dtoa__0_4_6",
        url = "https://crates.io/api/v1/crates/dtoa/0.4.6/download",
        type = "tar.gz",
        sha256 = "134951f4028bdadb9b84baf4232681efbf277da25144b9b0ad65df75946c422b",
        strip_prefix = "dtoa-0.4.6",
        build_file = Label("//third_party/cargo/remote:BUILD.dtoa-0.4.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__either__1_6_1",
        url = "https://crates.io/api/v1/crates/either/1.6.1/download",
        type = "tar.gz",
        sha256 = "e78d4f1cc4ae33bbfc157ed5d5a5ef3bc29227303d595861deb238fcec4e9457",
        strip_prefix = "either-1.6.1",
        build_file = Label("//third_party/cargo/remote:BUILD.either-1.6.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__encode_unicode__0_3_6",
        url = "https://crates.io/api/v1/crates/encode_unicode/0.3.6/download",
        type = "tar.gz",
        sha256 = "a357d28ed41a50f9c765dbfe56cbc04a64e53e5fc58ba79fbc34c10ef3df831f",
        strip_prefix = "encode_unicode-0.3.6",
        build_file = Label("//third_party/cargo/remote:BUILD.encode_unicode-0.3.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__encoding_rs__0_8_26",
        url = "https://crates.io/api/v1/crates/encoding_rs/0.8.26/download",
        type = "tar.gz",
        sha256 = "801bbab217d7f79c0062f4f7205b5d4427c6d1a7bd7aafdd1475f7c59d62b283",
        strip_prefix = "encoding_rs-0.8.26",
        build_file = Label("//third_party/cargo/remote:BUILD.encoding_rs-0.8.26.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__env_logger__0_8_2",
        url = "https://crates.io/api/v1/crates/env_logger/0.8.2/download",
        type = "tar.gz",
        sha256 = "f26ecb66b4bdca6c1409b40fb255eefc2bd4f6d135dab3c3124f80ffa2a9661e",
        strip_prefix = "env_logger-0.8.2",
        build_file = Label("//third_party/cargo/remote:BUILD.env_logger-0.8.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__event_listener__2_5_1",
        url = "https://crates.io/api/v1/crates/event-listener/2.5.1/download",
        type = "tar.gz",
        sha256 = "f7531096570974c3a9dcf9e4b8e1cede1ec26cf5046219fb3b9d897503b9be59",
        strip_prefix = "event-listener-2.5.1",
        build_file = Label("//third_party/cargo/remote:BUILD.event-listener-2.5.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fake_simd__0_1_2",
        url = "https://crates.io/api/v1/crates/fake-simd/0.1.2/download",
        type = "tar.gz",
        sha256 = "e88a8acf291dafb59c2d96e8f59828f3838bb1a70398823ade51a84de6a6deed",
        strip_prefix = "fake-simd-0.1.2",
        build_file = Label("//third_party/cargo/remote:BUILD.fake-simd-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fastrand__1_4_0",
        url = "https://crates.io/api/v1/crates/fastrand/1.4.0/download",
        type = "tar.gz",
        sha256 = "ca5faf057445ce5c9d4329e382b2ce7ca38550ef3b73a5348362d5f24e0c7fe3",
        strip_prefix = "fastrand-1.4.0",
        build_file = Label("//third_party/cargo/remote:BUILD.fastrand-1.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__flate2__1_0_19",
        url = "https://crates.io/api/v1/crates/flate2/1.0.19/download",
        type = "tar.gz",
        sha256 = "7411863d55df97a419aa64cb4d2f167103ea9d767e2c54a1868b7ac3f6b47129",
        strip_prefix = "flate2-1.0.19",
        build_file = Label("//third_party/cargo/remote:BUILD.flate2-1.0.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fnv__1_0_7",
        url = "https://crates.io/api/v1/crates/fnv/1.0.7/download",
        type = "tar.gz",
        sha256 = "3f9eec918d3f24069decb9af1554cad7c880e2da24a9afd88aca000531ab82c1",
        strip_prefix = "fnv-1.0.7",
        build_file = Label("//third_party/cargo/remote:BUILD.fnv-1.0.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__foreign_types__0_3_2",
        url = "https://crates.io/api/v1/crates/foreign-types/0.3.2/download",
        type = "tar.gz",
        sha256 = "f6f339eb8adc052cd2ca78910fda869aefa38d22d5cb648e6485e4d3fc06f3b1",
        strip_prefix = "foreign-types-0.3.2",
        build_file = Label("//third_party/cargo/remote:BUILD.foreign-types-0.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__foreign_types_shared__0_1_1",
        url = "https://crates.io/api/v1/crates/foreign-types-shared/0.1.1/download",
        type = "tar.gz",
        sha256 = "00b0228411908ca8685dba7fc2cdd70ec9990a6e753e89b6ac91a84c40fbaf4b",
        strip_prefix = "foreign-types-shared-0.1.1",
        build_file = Label("//third_party/cargo/remote:BUILD.foreign-types-shared-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__form_urlencoded__1_0_0",
        url = "https://crates.io/api/v1/crates/form_urlencoded/1.0.0/download",
        type = "tar.gz",
        sha256 = "ece68d15c92e84fa4f19d3780f1294e5ca82a78a6d515f1efaabcc144688be00",
        strip_prefix = "form_urlencoded-1.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.form_urlencoded-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fuchsia_cprng__0_1_1",
        url = "https://crates.io/api/v1/crates/fuchsia-cprng/0.1.1/download",
        type = "tar.gz",
        sha256 = "a06f77d526c1a601b7c4cdd98f54b5eaabffc14d5f2f0296febdc7f357c6d3ba",
        strip_prefix = "fuchsia-cprng-0.1.1",
        build_file = Label("//third_party/cargo/remote:BUILD.fuchsia-cprng-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fuchsia_zircon__0_3_3",
        url = "https://crates.io/api/v1/crates/fuchsia-zircon/0.3.3/download",
        type = "tar.gz",
        sha256 = "2e9763c69ebaae630ba35f74888db465e49e259ba1bc0eda7d06f4a067615d82",
        strip_prefix = "fuchsia-zircon-0.3.3",
        build_file = Label("//third_party/cargo/remote:BUILD.fuchsia-zircon-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fuchsia_zircon_sys__0_3_3",
        url = "https://crates.io/api/v1/crates/fuchsia-zircon-sys/0.3.3/download",
        type = "tar.gz",
        sha256 = "3dcaa9ae7725d12cdb85b3ad99a434db70b468c09ded17e012d86b5c1010f7a7",
        strip_prefix = "fuchsia-zircon-sys-0.3.3",
        build_file = Label("//third_party/cargo/remote:BUILD.fuchsia-zircon-sys-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures__0_3_12",
        url = "https://crates.io/api/v1/crates/futures/0.3.12/download",
        type = "tar.gz",
        sha256 = "da9052a1a50244d8d5aa9bf55cbc2fb6f357c86cc52e46c62ed390a7180cf150",
        strip_prefix = "futures-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_channel__0_3_12",
        url = "https://crates.io/api/v1/crates/futures-channel/0.3.12/download",
        type = "tar.gz",
        sha256 = "f2d31b7ec7efab6eefc7c57233bb10b847986139d88cc2f5a02a1ae6871a1846",
        strip_prefix = "futures-channel-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-channel-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_core__0_3_12",
        url = "https://crates.io/api/v1/crates/futures-core/0.3.12/download",
        type = "tar.gz",
        sha256 = "79e5145dde8da7d1b3892dad07a9c98fc04bc39892b1ecc9692cf53e2b780a65",
        strip_prefix = "futures-core-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-core-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_enum__0_1_15",
        url = "https://crates.io/api/v1/crates/futures-enum/0.1.15/download",
        type = "tar.gz",
        sha256 = "70f3979efb3aea70991b7fd261a40decddae71f8bdfd8b2982cc8442e8f6813a",
        strip_prefix = "futures-enum-0.1.15",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-enum-0.1.15.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_executor__0_3_12",
        url = "https://crates.io/api/v1/crates/futures-executor/0.3.12/download",
        type = "tar.gz",
        sha256 = "e9e59fdc009a4b3096bf94f740a0f2424c082521f20a9b08c5c07c48d90fd9b9",
        strip_prefix = "futures-executor-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-executor-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_io__0_3_12",
        url = "https://crates.io/api/v1/crates/futures-io/0.3.12/download",
        type = "tar.gz",
        sha256 = "28be053525281ad8259d47e4de5de657b25e7bac113458555bb4b70bc6870500",
        strip_prefix = "futures-io-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-io-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_lite__1_11_2",
        url = "https://crates.io/api/v1/crates/futures-lite/1.11.2/download",
        type = "tar.gz",
        sha256 = "5e6c079abfac3ab269e2927ec048dabc89d009ebfdda6b8ee86624f30c689658",
        strip_prefix = "futures-lite-1.11.2",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-lite-1.11.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_macro__0_3_12",
        url = "https://crates.io/api/v1/crates/futures-macro/0.3.12/download",
        type = "tar.gz",
        sha256 = "c287d25add322d9f9abdcdc5927ca398917996600182178774032e9f8258fedd",
        strip_prefix = "futures-macro-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-macro-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_sink__0_3_12",
        url = "https://crates.io/api/v1/crates/futures-sink/0.3.12/download",
        type = "tar.gz",
        sha256 = "caf5c69029bda2e743fddd0582d1083951d65cc9539aebf8812f36c3491342d6",
        strip_prefix = "futures-sink-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-sink-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_task__0_3_12",
        url = "https://crates.io/api/v1/crates/futures-task/0.3.12/download",
        type = "tar.gz",
        sha256 = "13de07eb8ea81ae445aca7b69f5f7bf15d7bf4912d8ca37d6645c77ae8a58d86",
        strip_prefix = "futures-task-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-task-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_util__0_3_12",
        url = "https://crates.io/api/v1/crates/futures-util/0.3.12/download",
        type = "tar.gz",
        sha256 = "632a8cd0f2a4b3fdea1657f08bde063848c3bd00f9bbf6e256b8be78802e624b",
        strip_prefix = "futures-util-0.3.12",
        build_file = Label("//third_party/cargo/remote:BUILD.futures-util-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__generic_array__0_12_3",
        url = "https://crates.io/api/v1/crates/generic-array/0.12.3/download",
        type = "tar.gz",
        sha256 = "c68f0274ae0e023facc3c97b2e00f076be70e254bc851d972503b328db79b2ec",
        strip_prefix = "generic-array-0.12.3",
        build_file = Label("//third_party/cargo/remote:BUILD.generic-array-0.12.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__generic_array__0_14_4",
        url = "https://crates.io/api/v1/crates/generic-array/0.14.4/download",
        type = "tar.gz",
        sha256 = "501466ecc8a30d1d3b7fc9229b122b2ce8ed6e9d9223f1138d4babb253e51817",
        strip_prefix = "generic-array-0.14.4",
        build_file = Label("//third_party/cargo/remote:BUILD.generic-array-0.14.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__getrandom__0_1_15",
        url = "https://crates.io/api/v1/crates/getrandom/0.1.15/download",
        type = "tar.gz",
        sha256 = "fc587bc0ec293155d5bfa6b9891ec18a1e330c234f896ea47fbada4cadbe47e6",
        strip_prefix = "getrandom-0.1.15",
        build_file = Label("//third_party/cargo/remote:BUILD.getrandom-0.1.15.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__getrandom__0_2_0",
        url = "https://crates.io/api/v1/crates/getrandom/0.2.0/download",
        type = "tar.gz",
        sha256 = "ee8025cf36f917e6a52cce185b7c7177689b838b7ec138364e50cc2277a56cf4",
        strip_prefix = "getrandom-0.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.getrandom-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__gif__0_11_1",
        url = "https://crates.io/api/v1/crates/gif/0.11.1/download",
        type = "tar.gz",
        sha256 = "02efba560f227847cb41463a7395c514d127d4f74fff12ef0137fff1b84b96c4",
        strip_prefix = "gif-0.11.1",
        build_file = Label("//third_party/cargo/remote:BUILD.gif-0.11.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__gloo_timers__0_2_1",
        url = "https://crates.io/api/v1/crates/gloo-timers/0.2.1/download",
        type = "tar.gz",
        sha256 = "47204a46aaff920a1ea58b11d03dec6f704287d27561724a4631e450654a891f",
        strip_prefix = "gloo-timers-0.2.1",
        build_file = Label("//third_party/cargo/remote:BUILD.gloo-timers-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__graphql_parser__0_3_0",
        url = "https://crates.io/api/v1/crates/graphql-parser/0.3.0/download",
        type = "tar.gz",
        sha256 = "d1abd4ce5247dfc04a03ccde70f87a048458c9356c7e41d21ad8c407b3dde6f2",
        strip_prefix = "graphql-parser-0.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.graphql-parser-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__h2__0_2_7",
        url = "https://crates.io/api/v1/crates/h2/0.2.7/download",
        type = "tar.gz",
        sha256 = "5e4728fd124914ad25e99e3d15a9361a879f6620f63cb56bbb08f95abb97a535",
        strip_prefix = "h2-0.2.7",
        build_file = Label("//third_party/cargo/remote:BUILD.h2-0.2.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hashbrown__0_9_1",
        url = "https://crates.io/api/v1/crates/hashbrown/0.9.1/download",
        type = "tar.gz",
        sha256 = "d7afe4a420e3fe79967a00898cc1f4db7c8a49a9333a29f8a4bd76a253d5cd04",
        strip_prefix = "hashbrown-0.9.1",
        build_file = Label("//third_party/cargo/remote:BUILD.hashbrown-0.9.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__headers__0_3_2",
        url = "https://crates.io/api/v1/crates/headers/0.3.2/download",
        type = "tar.gz",
        sha256 = "ed18eb2459bf1a09ad2d6b1547840c3e5e62882fa09b9a6a20b1de8e3228848f",
        strip_prefix = "headers-0.3.2",
        build_file = Label("//third_party/cargo/remote:BUILD.headers-0.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__headers_core__0_2_0",
        url = "https://crates.io/api/v1/crates/headers-core/0.2.0/download",
        type = "tar.gz",
        sha256 = "e7f66481bfee273957b1f20485a4ff3362987f85b2c236580d81b4eb7a326429",
        strip_prefix = "headers-core-0.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.headers-core-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hermit_abi__0_1_17",
        url = "https://crates.io/api/v1/crates/hermit-abi/0.1.17/download",
        type = "tar.gz",
        sha256 = "5aca5565f760fb5b220e499d72710ed156fdb74e631659e99377d9ebfbd13ae8",
        strip_prefix = "hermit-abi-0.1.17",
        build_file = Label("//third_party/cargo/remote:BUILD.hermit-abi-0.1.17.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hex__0_4_2",
        url = "https://crates.io/api/v1/crates/hex/0.4.2/download",
        type = "tar.gz",
        sha256 = "644f9158b2f133fd50f5fb3242878846d9eb792e445c893805ff0e3824006e35",
        strip_prefix = "hex-0.4.2",
        build_file = Label("//third_party/cargo/remote:BUILD.hex-0.4.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__http__0_2_1",
        url = "https://crates.io/api/v1/crates/http/0.2.1/download",
        type = "tar.gz",
        sha256 = "28d569972648b2c512421b5f2a405ad6ac9666547189d0c5477a3f200f3e02f9",
        strip_prefix = "http-0.2.1",
        build_file = Label("//third_party/cargo/remote:BUILD.http-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__http_body__0_3_1",
        url = "https://crates.io/api/v1/crates/http-body/0.3.1/download",
        type = "tar.gz",
        sha256 = "13d5ff830006f7646652e057693569bfe0d51760c0085a071769d142a205111b",
        strip_prefix = "http-body-0.3.1",
        build_file = Label("//third_party/cargo/remote:BUILD.http-body-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__httparse__1_3_4",
        url = "https://crates.io/api/v1/crates/httparse/1.3.4/download",
        type = "tar.gz",
        sha256 = "cd179ae861f0c2e53da70d892f5f3029f9594be0c41dc5269cd371691b1dc2f9",
        strip_prefix = "httparse-1.3.4",
        build_file = Label("//third_party/cargo/remote:BUILD.httparse-1.3.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__httpdate__0_3_2",
        url = "https://crates.io/api/v1/crates/httpdate/0.3.2/download",
        type = "tar.gz",
        sha256 = "494b4d60369511e7dea41cf646832512a94e542f68bb9c49e54518e0f468eb47",
        strip_prefix = "httpdate-0.3.2",
        build_file = Label("//third_party/cargo/remote:BUILD.httpdate-0.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__humantime__2_0_1",
        url = "https://crates.io/api/v1/crates/humantime/2.0.1/download",
        type = "tar.gz",
        sha256 = "3c1ad908cc71012b7bea4d0c53ba96a8cba9962f048fa68d143376143d863b7a",
        strip_prefix = "humantime-2.0.1",
        build_file = Label("//third_party/cargo/remote:BUILD.humantime-2.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hyper__0_13_9",
        url = "https://crates.io/api/v1/crates/hyper/0.13.9/download",
        type = "tar.gz",
        sha256 = "f6ad767baac13b44d4529fcf58ba2cd0995e36e7b435bc5b039de6f47e880dbf",
        strip_prefix = "hyper-0.13.9",
        build_file = Label("//third_party/cargo/remote:BUILD.hyper-0.13.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hyper_tls__0_4_3",
        url = "https://crates.io/api/v1/crates/hyper-tls/0.4.3/download",
        type = "tar.gz",
        sha256 = "d979acc56dcb5b8dddba3917601745e877576475aa046df3226eabdecef78eed",
        strip_prefix = "hyper-tls-0.4.3",
        build_file = Label("//third_party/cargo/remote:BUILD.hyper-tls-0.4.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__idna__0_2_0",
        url = "https://crates.io/api/v1/crates/idna/0.2.0/download",
        type = "tar.gz",
        sha256 = "02e2673c30ee86b5b96a9cb52ad15718aa1f966f5ab9ad54a8b95d5ca33120a9",
        strip_prefix = "idna-0.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.idna-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__image__0_23_12",
        url = "https://crates.io/api/v1/crates/image/0.23.12/download",
        type = "tar.gz",
        sha256 = "7ce04077ead78e39ae8610ad26216aed811996b043d47beed5090db674f9e9b5",
        strip_prefix = "image-0.23.12",
        build_file = Label("//third_party/cargo/remote:BUILD.image-0.23.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__indexmap__1_6_0",
        url = "https://crates.io/api/v1/crates/indexmap/1.6.0/download",
        type = "tar.gz",
        sha256 = "55e2e4c765aa53a0424761bf9f41aa7a6ac1efa87238f59560640e27fca028f2",
        strip_prefix = "indexmap-1.6.0",
        build_file = Label("//third_party/cargo/remote:BUILD.indexmap-1.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__input_buffer__0_3_1",
        url = "https://crates.io/api/v1/crates/input_buffer/0.3.1/download",
        type = "tar.gz",
        sha256 = "19a8a95243d5a0398cae618ec29477c6e3cb631152be5c19481f80bc71559754",
        strip_prefix = "input_buffer-0.3.1",
        build_file = Label("//third_party/cargo/remote:BUILD.input_buffer-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__insta__1_5_3",
        url = "https://crates.io/api/v1/crates/insta/1.5.3/download",
        type = "tar.gz",
        sha256 = "f62fca340815e6190f0ab60fd2729d297a55bcf9863025e5a8a4ce68f50066c4",
        strip_prefix = "insta-1.5.3",
        build_file = Label("//third_party/cargo/remote:BUILD.insta-1.5.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__instant__0_1_9",
        url = "https://crates.io/api/v1/crates/instant/0.1.9/download",
        type = "tar.gz",
        sha256 = "61124eeebbd69b8190558df225adf7e4caafce0d743919e5d6b19652314ec5ec",
        strip_prefix = "instant-0.1.9",
        build_file = Label("//third_party/cargo/remote:BUILD.instant-0.1.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__iovec__0_1_4",
        url = "https://crates.io/api/v1/crates/iovec/0.1.4/download",
        type = "tar.gz",
        sha256 = "b2b3ea6ff95e175473f8ffe6a7eb7c00d054240321b84c57051175fe3c1e075e",
        strip_prefix = "iovec-0.1.4",
        build_file = Label("//third_party/cargo/remote:BUILD.iovec-0.1.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ipnet__2_3_0",
        url = "https://crates.io/api/v1/crates/ipnet/2.3.0/download",
        type = "tar.gz",
        sha256 = "47be2f14c678be2fdcab04ab1171db51b2762ce6f0a8ee87c8dd4a04ed216135",
        strip_prefix = "ipnet-2.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.ipnet-2.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__itoa__0_4_6",
        url = "https://crates.io/api/v1/crates/itoa/0.4.6/download",
        type = "tar.gz",
        sha256 = "dc6f3ad7b9d11a0c00842ff8de1b60ee58661048eb8049ed33c73594f359d7e6",
        strip_prefix = "itoa-0.4.6",
        build_file = Label("//third_party/cargo/remote:BUILD.itoa-0.4.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__jpeg_decoder__0_1_20",
        url = "https://crates.io/api/v1/crates/jpeg-decoder/0.1.20/download",
        type = "tar.gz",
        sha256 = "cc797adac5f083b8ff0ca6f6294a999393d76e197c36488e2ef732c4715f6fa3",
        strip_prefix = "jpeg-decoder-0.1.20",
        build_file = Label("//third_party/cargo/remote:BUILD.jpeg-decoder-0.1.20.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__js_sys__0_3_45",
        url = "https://crates.io/api/v1/crates/js-sys/0.3.45/download",
        type = "tar.gz",
        sha256 = "ca059e81d9486668f12d455a4ea6daa600bd408134cd17e3d3fb5a32d1f016f8",
        strip_prefix = "js-sys-0.3.45",
        build_file = Label("//third_party/cargo/remote:BUILD.js-sys-0.3.45.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__jsonwebtoken__7_2_0",
        url = "https://crates.io/api/v1/crates/jsonwebtoken/7.2.0/download",
        type = "tar.gz",
        sha256 = "afabcc15e437a6484fc4f12d0fd63068fe457bf93f1c148d3d9649c60b103f32",
        strip_prefix = "jsonwebtoken-7.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.jsonwebtoken-7.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__juniper__0_15_3",
        url = "https://crates.io/api/v1/crates/juniper/0.15.3/download",
        type = "tar.gz",
        sha256 = "9ce9122e520b17ce7593f628d2b440318a5fd77b8923b1918e59ec28cf2c2815",
        strip_prefix = "juniper-0.15.3",
        build_file = Label("//third_party/cargo/remote:BUILD.juniper-0.15.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__juniper_codegen__0_15_3",
        url = "https://crates.io/api/v1/crates/juniper_codegen/0.15.3/download",
        type = "tar.gz",
        sha256 = "2aad9bb6febeb76eeb97aa39b1ec4e640ee0eb37db98379f89972b2d0da85d18",
        strip_prefix = "juniper_codegen-0.15.3",
        build_file = Label("//third_party/cargo/remote:BUILD.juniper_codegen-0.15.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__kernel32_sys__0_2_2",
        url = "https://crates.io/api/v1/crates/kernel32-sys/0.2.2/download",
        type = "tar.gz",
        sha256 = "7507624b29483431c0ba2d82aece8ca6cdba9382bff4ddd0f7490560c056098d",
        strip_prefix = "kernel32-sys-0.2.2",
        build_file = Label("//third_party/cargo/remote:BUILD.kernel32-sys-0.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__kv_log_macro__1_0_7",
        url = "https://crates.io/api/v1/crates/kv-log-macro/1.0.7/download",
        type = "tar.gz",
        sha256 = "0de8b303297635ad57c9f5059fd9cee7a47f8e8daa09df0fcd07dd39fb22977f",
        strip_prefix = "kv-log-macro-1.0.7",
        build_file = Label("//third_party/cargo/remote:BUILD.kv-log-macro-1.0.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__lazy_static__1_4_0",
        url = "https://crates.io/api/v1/crates/lazy_static/1.4.0/download",
        type = "tar.gz",
        sha256 = "e2abad23fbc42b3700f2f279844dc832adb2b2eb069b2df918f455c4e18cc646",
        strip_prefix = "lazy_static-1.4.0",
        build_file = Label("//third_party/cargo/remote:BUILD.lazy_static-1.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__lexical_core__0_7_4",
        url = "https://crates.io/api/v1/crates/lexical-core/0.7.4/download",
        type = "tar.gz",
        sha256 = "db65c6da02e61f55dae90a0ae427b2a5f6b3e8db09f58d10efab23af92592616",
        strip_prefix = "lexical-core-0.7.4",
        build_file = Label("//third_party/cargo/remote:BUILD.lexical-core-0.7.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__libc__0_2_80",
        url = "https://crates.io/api/v1/crates/libc/0.2.80/download",
        type = "tar.gz",
        sha256 = "4d58d1b70b004888f764dfbf6a26a3b0342a1632d33968e4a179d8011c760614",
        strip_prefix = "libc-0.2.80",
        build_file = Label("//third_party/cargo/remote:BUILD.libc-0.2.80.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__linked_hash_map__0_5_3",
        url = "https://crates.io/api/v1/crates/linked-hash-map/0.5.3/download",
        type = "tar.gz",
        sha256 = "8dd5a6d5999d9907cda8ed67bbd137d3af8085216c2ac62de5be860bd41f304a",
        strip_prefix = "linked-hash-map-0.5.3",
        build_file = Label("//third_party/cargo/remote:BUILD.linked-hash-map-0.5.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__log__0_4_14",
        url = "https://crates.io/api/v1/crates/log/0.4.14/download",
        type = "tar.gz",
        sha256 = "51b9bbe6c47d51fc3e1a9b945965946b4c44142ab8792c50835a980d362c2710",
        strip_prefix = "log-0.4.14",
        build_file = Label("//third_party/cargo/remote:BUILD.log-0.4.14.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__matches__0_1_8",
        url = "https://crates.io/api/v1/crates/matches/0.1.8/download",
        type = "tar.gz",
        sha256 = "7ffc5c5338469d4d3ea17d269fa8ea3512ad247247c30bd2df69e68309ed0a08",
        strip_prefix = "matches-0.1.8",
        build_file = Label("//third_party/cargo/remote:BUILD.matches-0.1.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__maybe_async__0_2_2",
        url = "https://crates.io/api/v1/crates/maybe-async/0.2.2/download",
        type = "tar.gz",
        sha256 = "fd1afac51d14f8056cd544c83239b961c464e0a98c2ca65353195df93e636a20",
        strip_prefix = "maybe-async-0.2.2",
        build_file = Label("//third_party/cargo/remote:BUILD.maybe-async-0.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__md_5__0_9_1",
        url = "https://crates.io/api/v1/crates/md-5/0.9.1/download",
        type = "tar.gz",
        sha256 = "7b5a279bb9607f9f53c22d496eade00d138d1bdcccd07d74650387cf94942a15",
        strip_prefix = "md-5-0.9.1",
        build_file = Label("//third_party/cargo/remote:BUILD.md-5-0.9.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__memchr__2_3_4",
        url = "https://crates.io/api/v1/crates/memchr/2.3.4/download",
        type = "tar.gz",
        sha256 = "0ee1c47aaa256ecabcaea351eae4a9b01ef39ed810004e298d2511ed284b1525",
        strip_prefix = "memchr-2.3.4",
        build_file = Label("//third_party/cargo/remote:BUILD.memchr-2.3.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__memoffset__0_6_1",
        url = "https://crates.io/api/v1/crates/memoffset/0.6.1/download",
        type = "tar.gz",
        sha256 = "157b4208e3059a8f9e78d559edc658e13df41410cb3ae03979c83130067fdd87",
        strip_prefix = "memoffset-0.6.1",
        build_file = Label("//third_party/cargo/remote:BUILD.memoffset-0.6.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mime__0_3_16",
        url = "https://crates.io/api/v1/crates/mime/0.3.16/download",
        type = "tar.gz",
        sha256 = "2a60c7ce501c71e03a9c9c0d35b861413ae925bd979cc7a4e30d060069aaac8d",
        strip_prefix = "mime-0.3.16",
        build_file = Label("//third_party/cargo/remote:BUILD.mime-0.3.16.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mime_guess__2_0_3",
        url = "https://crates.io/api/v1/crates/mime_guess/2.0.3/download",
        type = "tar.gz",
        sha256 = "2684d4c2e97d99848d30b324b00c8fcc7e5c897b7cbb5819b09e7c90e8baf212",
        strip_prefix = "mime_guess-2.0.3",
        build_file = Label("//third_party/cargo/remote:BUILD.mime_guess-2.0.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__miniz_oxide__0_3_7",
        url = "https://crates.io/api/v1/crates/miniz_oxide/0.3.7/download",
        type = "tar.gz",
        sha256 = "791daaae1ed6889560f8c4359194f56648355540573244a5448a83ba1ecc7435",
        strip_prefix = "miniz_oxide-0.3.7",
        build_file = Label("//third_party/cargo/remote:BUILD.miniz_oxide-0.3.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__miniz_oxide__0_4_3",
        url = "https://crates.io/api/v1/crates/miniz_oxide/0.4.3/download",
        type = "tar.gz",
        sha256 = "0f2d26ec3309788e423cfbf68ad1800f061638098d76a83681af979dc4eda19d",
        strip_prefix = "miniz_oxide-0.4.3",
        build_file = Label("//third_party/cargo/remote:BUILD.miniz_oxide-0.4.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mio__0_6_22",
        url = "https://crates.io/api/v1/crates/mio/0.6.22/download",
        type = "tar.gz",
        sha256 = "fce347092656428bc8eaf6201042cb551b8d67855af7374542a92a0fbfcac430",
        strip_prefix = "mio-0.6.22",
        build_file = Label("//third_party/cargo/remote:BUILD.mio-0.6.22.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__miow__0_2_1",
        url = "https://crates.io/api/v1/crates/miow/0.2.1/download",
        type = "tar.gz",
        sha256 = "8c1f2f3b1cf331de6896aabf6e9d55dca90356cc9960cca7eaaf408a355ae919",
        strip_prefix = "miow-0.2.1",
        build_file = Label("//third_party/cargo/remote:BUILD.miow-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__multipart__0_17_0",
        url = "https://crates.io/api/v1/crates/multipart/0.17.0/download",
        type = "tar.gz",
        sha256 = "8209c33c951f07387a8497841122fc6f712165e3f9bda3e6be4645b58188f676",
        strip_prefix = "multipart-0.17.0",
        build_file = Label("//third_party/cargo/remote:BUILD.multipart-0.17.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__native_tls__0_2_6",
        url = "https://crates.io/api/v1/crates/native-tls/0.2.6/download",
        type = "tar.gz",
        sha256 = "6fcc7939b5edc4e4f86b1b4a04bb1498afaaf871b1a6691838ed06fcb48d3a3f",
        strip_prefix = "native-tls-0.2.6",
        build_file = Label("//third_party/cargo/remote:BUILD.native-tls-0.2.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__nb_connect__1_0_2",
        url = "https://crates.io/api/v1/crates/nb-connect/1.0.2/download",
        type = "tar.gz",
        sha256 = "8123a81538e457d44b933a02faf885d3fe8408806b23fa700e8f01c6c3a98998",
        strip_prefix = "nb-connect-1.0.2",
        build_file = Label("//third_party/cargo/remote:BUILD.nb-connect-1.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__net2__0_2_35",
        url = "https://crates.io/api/v1/crates/net2/0.2.35/download",
        type = "tar.gz",
        sha256 = "3ebc3ec692ed7c9a255596c67808dee269f64655d8baf7b4f0638e51ba1d6853",
        strip_prefix = "net2-0.2.35",
        build_file = Label("//third_party/cargo/remote:BUILD.net2-0.2.35.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__nom__5_1_2",
        url = "https://crates.io/api/v1/crates/nom/5.1.2/download",
        type = "tar.gz",
        sha256 = "ffb4262d26ed83a1c0a33a38fe2bb15797329c85770da05e6b828ddb782627af",
        strip_prefix = "nom-5.1.2",
        build_file = Label("//third_party/cargo/remote:BUILD.nom-5.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_bigint__0_2_6",
        url = "https://crates.io/api/v1/crates/num-bigint/0.2.6/download",
        type = "tar.gz",
        sha256 = "090c7f9998ee0ff65aa5b723e4009f7b217707f1fb5ea551329cc4d6231fb304",
        strip_prefix = "num-bigint-0.2.6",
        build_file = Label("//third_party/cargo/remote:BUILD.num-bigint-0.2.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_integer__0_1_44",
        url = "https://crates.io/api/v1/crates/num-integer/0.1.44/download",
        type = "tar.gz",
        sha256 = "d2cc698a63b549a70bc047073d2949cce27cd1c7b0a4a862d08a8031bc2801db",
        strip_prefix = "num-integer-0.1.44",
        build_file = Label("//third_party/cargo/remote:BUILD.num-integer-0.1.44.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_iter__0_1_42",
        url = "https://crates.io/api/v1/crates/num-iter/0.1.42/download",
        type = "tar.gz",
        sha256 = "b2021c8337a54d21aca0d59a92577a029af9431cb59b909b03252b9c164fad59",
        strip_prefix = "num-iter-0.1.42",
        build_file = Label("//third_party/cargo/remote:BUILD.num-iter-0.1.42.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_rational__0_3_2",
        url = "https://crates.io/api/v1/crates/num-rational/0.3.2/download",
        type = "tar.gz",
        sha256 = "12ac428b1cb17fce6f731001d307d351ec70a6d202fc2e60f7d4c5e42d8f4f07",
        strip_prefix = "num-rational-0.3.2",
        build_file = Label("//third_party/cargo/remote:BUILD.num-rational-0.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_traits__0_2_14",
        url = "https://crates.io/api/v1/crates/num-traits/0.2.14/download",
        type = "tar.gz",
        sha256 = "9a64b1ec5cda2586e284722486d802acf1f7dbdc623e2bfc57e65ca1cd099290",
        strip_prefix = "num-traits-0.2.14",
        build_file = Label("//third_party/cargo/remote:BUILD.num-traits-0.2.14.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_cpus__1_13_0",
        url = "https://crates.io/api/v1/crates/num_cpus/1.13.0/download",
        type = "tar.gz",
        sha256 = "05499f3756671c15885fee9034446956fff3f243d6077b91e5767df161f766b3",
        strip_prefix = "num_cpus-1.13.0",
        build_file = Label("//third_party/cargo/remote:BUILD.num_cpus-1.13.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__once_cell__1_5_2",
        url = "https://crates.io/api/v1/crates/once_cell/1.5.2/download",
        type = "tar.gz",
        sha256 = "13bd41f508810a131401606d54ac32a467c97172d74ba7662562ebba5ad07fa0",
        strip_prefix = "once_cell-1.5.2",
        build_file = Label("//third_party/cargo/remote:BUILD.once_cell-1.5.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__opaque_debug__0_2_3",
        url = "https://crates.io/api/v1/crates/opaque-debug/0.2.3/download",
        type = "tar.gz",
        sha256 = "2839e79665f131bdb5782e51f2c6c9599c133c6098982a54c794358bf432529c",
        strip_prefix = "opaque-debug-0.2.3",
        build_file = Label("//third_party/cargo/remote:BUILD.opaque-debug-0.2.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__opaque_debug__0_3_0",
        url = "https://crates.io/api/v1/crates/opaque-debug/0.3.0/download",
        type = "tar.gz",
        sha256 = "624a8340c38c1b80fd549087862da4ba43e08858af025b236e509b6649fc13d5",
        strip_prefix = "opaque-debug-0.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.opaque-debug-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__openssl__0_10_30",
        url = "https://crates.io/api/v1/crates/openssl/0.10.30/download",
        type = "tar.gz",
        sha256 = "8d575eff3665419f9b83678ff2815858ad9d11567e082f5ac1814baba4e2bcb4",
        strip_prefix = "openssl-0.10.30",
        build_file = Label("//third_party/cargo/remote:BUILD.openssl-0.10.30.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__openssl_probe__0_1_2",
        url = "https://crates.io/api/v1/crates/openssl-probe/0.1.2/download",
        type = "tar.gz",
        sha256 = "77af24da69f9d9341038eba93a073b1fdaaa1b788221b00a69bce9e762cb32de",
        strip_prefix = "openssl-probe-0.1.2",
        build_file = Label("//third_party/cargo/remote:BUILD.openssl-probe-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__openssl_sys__0_9_58",
        url = "https://crates.io/api/v1/crates/openssl-sys/0.9.58/download",
        type = "tar.gz",
        sha256 = "a842db4709b604f0fe5d1170ae3565899be2ad3d9cbc72dedc789ac0511f78de",
        strip_prefix = "openssl-sys-0.9.58",
        build_file = Label("//third_party/cargo/remote:BUILD.openssl-sys-0.9.58.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__parking__2_0_0",
        url = "https://crates.io/api/v1/crates/parking/2.0.0/download",
        type = "tar.gz",
        sha256 = "427c3892f9e783d91cc128285287e70a59e206ca452770ece88a76f7a3eddd72",
        strip_prefix = "parking-2.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.parking-2.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pem__0_8_2",
        url = "https://crates.io/api/v1/crates/pem/0.8.2/download",
        type = "tar.gz",
        sha256 = "f4c220d01f863d13d96ca82359d1e81e64a7c6bf0637bcde7b2349630addf0c6",
        strip_prefix = "pem-0.8.2",
        build_file = Label("//third_party/cargo/remote:BUILD.pem-0.8.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__percent_encoding__2_1_0",
        url = "https://crates.io/api/v1/crates/percent-encoding/2.1.0/download",
        type = "tar.gz",
        sha256 = "d4fd5641d01c8f18a23da7b6fe29298ff4b55afcccdf78973b24cf3175fee32e",
        strip_prefix = "percent-encoding-2.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.percent-encoding-2.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project__0_4_27",
        url = "https://crates.io/api/v1/crates/pin-project/0.4.27/download",
        type = "tar.gz",
        sha256 = "2ffbc8e94b38ea3d2d8ba92aea2983b503cd75d0888d75b86bb37970b5698e15",
        strip_prefix = "pin-project-0.4.27",
        build_file = Label("//third_party/cargo/remote:BUILD.pin-project-0.4.27.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project__1_0_2",
        url = "https://crates.io/api/v1/crates/pin-project/1.0.2/download",
        type = "tar.gz",
        sha256 = "9ccc2237c2c489783abd8c4c80e5450fc0e98644555b1364da68cc29aa151ca7",
        strip_prefix = "pin-project-1.0.2",
        build_file = Label("//third_party/cargo/remote:BUILD.pin-project-1.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project_internal__0_4_27",
        url = "https://crates.io/api/v1/crates/pin-project-internal/0.4.27/download",
        type = "tar.gz",
        sha256 = "65ad2ae56b6abe3a1ee25f15ee605bacadb9a764edaba9c2bf4103800d4a1895",
        strip_prefix = "pin-project-internal-0.4.27",
        build_file = Label("//third_party/cargo/remote:BUILD.pin-project-internal-0.4.27.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project_internal__1_0_2",
        url = "https://crates.io/api/v1/crates/pin-project-internal/1.0.2/download",
        type = "tar.gz",
        sha256 = "f8e8d2bf0b23038a4424865103a4df472855692821aab4e4f5c3312d461d9e5f",
        strip_prefix = "pin-project-internal-1.0.2",
        build_file = Label("//third_party/cargo/remote:BUILD.pin-project-internal-1.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project_lite__0_1_11",
        url = "https://crates.io/api/v1/crates/pin-project-lite/0.1.11/download",
        type = "tar.gz",
        sha256 = "c917123afa01924fc84bb20c4c03f004d9c38e5127e3c039bbf7f4b9c76a2f6b",
        strip_prefix = "pin-project-lite-0.1.11",
        build_file = Label("//third_party/cargo/remote:BUILD.pin-project-lite-0.1.11.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project_lite__0_2_4",
        url = "https://crates.io/api/v1/crates/pin-project-lite/0.2.4/download",
        type = "tar.gz",
        sha256 = "439697af366c49a6d0a010c56a0d97685bc140ce0d377b13a2ea2aa42d64a827",
        strip_prefix = "pin-project-lite-0.2.4",
        build_file = Label("//third_party/cargo/remote:BUILD.pin-project-lite-0.2.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_utils__0_1_0",
        url = "https://crates.io/api/v1/crates/pin-utils/0.1.0/download",
        type = "tar.gz",
        sha256 = "8b870d8c151b6f2fb93e84a13146138f05d02ed11c7e7c54f8826aaaf7c9f184",
        strip_prefix = "pin-utils-0.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.pin-utils-0.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pkg_config__0_3_19",
        url = "https://crates.io/api/v1/crates/pkg-config/0.3.19/download",
        type = "tar.gz",
        sha256 = "3831453b3449ceb48b6d9c7ad7c96d5ea673e9b470a1dc578c2ce6521230884c",
        strip_prefix = "pkg-config-0.3.19",
        build_file = Label("//third_party/cargo/remote:BUILD.pkg-config-0.3.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__png__0_16_8",
        url = "https://crates.io/api/v1/crates/png/0.16.8/download",
        type = "tar.gz",
        sha256 = "3c3287920cb847dee3de33d301c463fba14dda99db24214ddf93f83d3021f4c6",
        strip_prefix = "png-0.16.8",
        build_file = Label("//third_party/cargo/remote:BUILD.png-0.16.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__polling__2_0_2",
        url = "https://crates.io/api/v1/crates/polling/2.0.2/download",
        type = "tar.gz",
        sha256 = "a2a7bc6b2a29e632e45451c941832803a18cce6781db04de8a04696cdca8bde4",
        strip_prefix = "polling-2.0.2",
        build_file = Label("//third_party/cargo/remote:BUILD.polling-2.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ppv_lite86__0_2_10",
        url = "https://crates.io/api/v1/crates/ppv-lite86/0.2.10/download",
        type = "tar.gz",
        sha256 = "ac74c624d6b2d21f425f752262f42188365d7b8ff1aff74c82e45136510a4857",
        strip_prefix = "ppv-lite86-0.2.10",
        build_file = Label("//third_party/cargo/remote:BUILD.ppv-lite86-0.2.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proc_macro_error__1_0_4",
        url = "https://crates.io/api/v1/crates/proc-macro-error/1.0.4/download",
        type = "tar.gz",
        sha256 = "da25490ff9892aab3fcf7c36f08cfb902dd3e71ca0f9f9517bea02a73a5ce38c",
        strip_prefix = "proc-macro-error-1.0.4",
        build_file = Label("//third_party/cargo/remote:BUILD.proc-macro-error-1.0.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proc_macro_error_attr__1_0_4",
        url = "https://crates.io/api/v1/crates/proc-macro-error-attr/1.0.4/download",
        type = "tar.gz",
        sha256 = "a1be40180e52ecc98ad80b184934baf3d0d29f979574e439af5a55274b35f869",
        strip_prefix = "proc-macro-error-attr-1.0.4",
        build_file = Label("//third_party/cargo/remote:BUILD.proc-macro-error-attr-1.0.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proc_macro_hack__0_5_19",
        url = "https://crates.io/api/v1/crates/proc-macro-hack/0.5.19/download",
        type = "tar.gz",
        sha256 = "dbf0c48bc1d91375ae5c3cd81e3722dff1abcf81a30960240640d223f59fe0e5",
        strip_prefix = "proc-macro-hack-0.5.19",
        build_file = Label("//third_party/cargo/remote:BUILD.proc-macro-hack-0.5.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proc_macro_nested__0_1_7",
        url = "https://crates.io/api/v1/crates/proc-macro-nested/0.1.7/download",
        type = "tar.gz",
        sha256 = "bc881b2c22681370c6a780e47af9840ef841837bc98118431d4e1868bd0c1086",
        strip_prefix = "proc-macro-nested-0.1.7",
        build_file = Label("//third_party/cargo/remote:BUILD.proc-macro-nested-0.1.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proc_macro2__1_0_24",
        url = "https://crates.io/api/v1/crates/proc-macro2/1.0.24/download",
        type = "tar.gz",
        sha256 = "1e0704ee1a7e00d7bb417d0770ea303c1bccbabf0ef1667dae92b5967f5f8a71",
        strip_prefix = "proc-macro2-1.0.24",
        build_file = Label("//third_party/cargo/remote:BUILD.proc-macro2-1.0.24.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proptest__0_10_1",
        url = "https://crates.io/api/v1/crates/proptest/0.10.1/download",
        type = "tar.gz",
        sha256 = "12e6c80c1139113c28ee4670dc50cc42915228b51f56a9e407f0ec60f966646f",
        strip_prefix = "proptest-0.10.1",
        build_file = Label("//third_party/cargo/remote:BUILD.proptest-0.10.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__quick_error__1_2_3",
        url = "https://crates.io/api/v1/crates/quick-error/1.2.3/download",
        type = "tar.gz",
        sha256 = "a1d01941d82fa2ab50be1e79e6714289dd7cde78eba4c074bc5a4374f650dfe0",
        strip_prefix = "quick-error-1.2.3",
        build_file = Label("//third_party/cargo/remote:BUILD.quick-error-1.2.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__quote__1_0_7",
        url = "https://crates.io/api/v1/crates/quote/1.0.7/download",
        type = "tar.gz",
        sha256 = "aa563d17ecb180e500da1cfd2b028310ac758de548efdd203e18f283af693f37",
        strip_prefix = "quote-1.0.7",
        build_file = Label("//third_party/cargo/remote:BUILD.quote-1.0.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand__0_6_5",
        url = "https://crates.io/api/v1/crates/rand/0.6.5/download",
        type = "tar.gz",
        sha256 = "6d71dacdc3c88c1fde3885a3be3fbab9f35724e6ce99467f7d9c5026132184ca",
        strip_prefix = "rand-0.6.5",
        build_file = Label("//third_party/cargo/remote:BUILD.rand-0.6.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand__0_7_3",
        url = "https://crates.io/api/v1/crates/rand/0.7.3/download",
        type = "tar.gz",
        sha256 = "6a6b1679d49b24bbfe0c803429aa1874472f50d9b363131f0e89fc356b544d03",
        strip_prefix = "rand-0.7.3",
        build_file = Label("//third_party/cargo/remote:BUILD.rand-0.7.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand__0_8_3",
        url = "https://crates.io/api/v1/crates/rand/0.8.3/download",
        type = "tar.gz",
        sha256 = "0ef9e7e66b4468674bfcb0c81af8b7fa0bb154fa9f28eb840da5c447baeb8d7e",
        strip_prefix = "rand-0.8.3",
        build_file = Label("//third_party/cargo/remote:BUILD.rand-0.8.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_chacha__0_1_1",
        url = "https://crates.io/api/v1/crates/rand_chacha/0.1.1/download",
        type = "tar.gz",
        sha256 = "556d3a1ca6600bfcbab7c7c91ccb085ac7fbbcd70e008a98742e7847f4f7bcef",
        strip_prefix = "rand_chacha-0.1.1",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_chacha-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_chacha__0_2_2",
        url = "https://crates.io/api/v1/crates/rand_chacha/0.2.2/download",
        type = "tar.gz",
        sha256 = "f4c8ed856279c9737206bf725bf36935d8666ead7aa69b52be55af369d193402",
        strip_prefix = "rand_chacha-0.2.2",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_chacha-0.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_chacha__0_3_0",
        url = "https://crates.io/api/v1/crates/rand_chacha/0.3.0/download",
        type = "tar.gz",
        sha256 = "e12735cf05c9e10bf21534da50a147b924d555dc7a547c42e6bb2d5b6017ae0d",
        strip_prefix = "rand_chacha-0.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_chacha-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_core__0_3_1",
        url = "https://crates.io/api/v1/crates/rand_core/0.3.1/download",
        type = "tar.gz",
        sha256 = "7a6fdeb83b075e8266dcc8762c22776f6877a63111121f5f8c7411e5be7eed4b",
        strip_prefix = "rand_core-0.3.1",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_core-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_core__0_4_2",
        url = "https://crates.io/api/v1/crates/rand_core/0.4.2/download",
        type = "tar.gz",
        sha256 = "9c33a3c44ca05fa6f1807d8e6743f3824e8509beca625669633be0acbdf509dc",
        strip_prefix = "rand_core-0.4.2",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_core-0.4.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_core__0_5_1",
        url = "https://crates.io/api/v1/crates/rand_core/0.5.1/download",
        type = "tar.gz",
        sha256 = "90bde5296fc891b0cef12a6d03ddccc162ce7b2aff54160af9338f8d40df6d19",
        strip_prefix = "rand_core-0.5.1",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_core-0.5.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_core__0_6_0",
        url = "https://crates.io/api/v1/crates/rand_core/0.6.0/download",
        type = "tar.gz",
        sha256 = "a8b34ba8cfb21243bd8df91854c830ff0d785fff2e82ebd4434c2644cb9ada18",
        strip_prefix = "rand_core-0.6.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_core-0.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_hc__0_1_0",
        url = "https://crates.io/api/v1/crates/rand_hc/0.1.0/download",
        type = "tar.gz",
        sha256 = "7b40677c7be09ae76218dc623efbf7b18e34bced3f38883af07bb75630a21bc4",
        strip_prefix = "rand_hc-0.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_hc-0.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_hc__0_2_0",
        url = "https://crates.io/api/v1/crates/rand_hc/0.2.0/download",
        type = "tar.gz",
        sha256 = "ca3129af7b92a17112d59ad498c6f81eaf463253766b90396d39ea7a39d6613c",
        strip_prefix = "rand_hc-0.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_hc-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_hc__0_3_0",
        url = "https://crates.io/api/v1/crates/rand_hc/0.3.0/download",
        type = "tar.gz",
        sha256 = "3190ef7066a446f2e7f42e239d161e905420ccab01eb967c9eb27d21b2322a73",
        strip_prefix = "rand_hc-0.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_hc-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_isaac__0_1_1",
        url = "https://crates.io/api/v1/crates/rand_isaac/0.1.1/download",
        type = "tar.gz",
        sha256 = "ded997c9d5f13925be2a6fd7e66bf1872597f759fd9dd93513dd7e92e5a5ee08",
        strip_prefix = "rand_isaac-0.1.1",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_isaac-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_jitter__0_1_4",
        url = "https://crates.io/api/v1/crates/rand_jitter/0.1.4/download",
        type = "tar.gz",
        sha256 = "1166d5c91dc97b88d1decc3285bb0a99ed84b05cfd0bc2341bdf2d43fc41e39b",
        strip_prefix = "rand_jitter-0.1.4",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_jitter-0.1.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_os__0_1_3",
        url = "https://crates.io/api/v1/crates/rand_os/0.1.3/download",
        type = "tar.gz",
        sha256 = "7b75f676a1e053fc562eafbb47838d67c84801e38fc1ba459e8f180deabd5071",
        strip_prefix = "rand_os-0.1.3",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_os-0.1.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_pcg__0_1_2",
        url = "https://crates.io/api/v1/crates/rand_pcg/0.1.2/download",
        type = "tar.gz",
        sha256 = "abf9b09b01790cfe0364f52bf32995ea3c39f4d2dd011eac241d2914146d0b44",
        strip_prefix = "rand_pcg-0.1.2",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_pcg-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_xorshift__0_1_1",
        url = "https://crates.io/api/v1/crates/rand_xorshift/0.1.1/download",
        type = "tar.gz",
        sha256 = "cbf7e9e623549b0e21f6e97cf8ecf247c1a8fd2e8a992ae265314300b2455d5c",
        strip_prefix = "rand_xorshift-0.1.1",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_xorshift-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_xorshift__0_2_0",
        url = "https://crates.io/api/v1/crates/rand_xorshift/0.2.0/download",
        type = "tar.gz",
        sha256 = "77d416b86801d23dde1aa643023b775c3a462efc0ed96443add11546cdf1dca8",
        strip_prefix = "rand_xorshift-0.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rand_xorshift-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rayon__1_5_0",
        url = "https://crates.io/api/v1/crates/rayon/1.5.0/download",
        type = "tar.gz",
        sha256 = "8b0d8e0819fadc20c74ea8373106ead0600e3a67ef1fe8da56e39b9ae7275674",
        strip_prefix = "rayon-1.5.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rayon-1.5.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rayon_core__1_9_0",
        url = "https://crates.io/api/v1/crates/rayon-core/1.9.0/download",
        type = "tar.gz",
        sha256 = "9ab346ac5921dc62ffa9f89b7a773907511cdfa5490c572ae9be1be33e8afa4a",
        strip_prefix = "rayon-core-1.9.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rayon-core-1.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rdrand__0_4_0",
        url = "https://crates.io/api/v1/crates/rdrand/0.4.0/download",
        type = "tar.gz",
        sha256 = "678054eb77286b51581ba43620cc911abf02758c91f93f479767aed0f90458b2",
        strip_prefix = "rdrand-0.4.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rdrand-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__redox_syscall__0_1_57",
        url = "https://crates.io/api/v1/crates/redox_syscall/0.1.57/download",
        type = "tar.gz",
        sha256 = "41cc0f7e4d5d4544e8861606a285bb08d3e70712ccc7d2b84d7c0ccfaf4b05ce",
        strip_prefix = "redox_syscall-0.1.57",
        build_file = Label("//third_party/cargo/remote:BUILD.redox_syscall-0.1.57.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__regex__1_4_3",
        url = "https://crates.io/api/v1/crates/regex/1.4.3/download",
        type = "tar.gz",
        sha256 = "d9251239e129e16308e70d853559389de218ac275b515068abc96829d05b948a",
        strip_prefix = "regex-1.4.3",
        build_file = Label("//third_party/cargo/remote:BUILD.regex-1.4.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__regex_syntax__0_6_22",
        url = "https://crates.io/api/v1/crates/regex-syntax/0.6.22/download",
        type = "tar.gz",
        sha256 = "b5eb417147ba9860a96cfe72a0b93bf88fee1744b5636ec99ab20c1aa9376581",
        strip_prefix = "regex-syntax-0.6.22",
        build_file = Label("//third_party/cargo/remote:BUILD.regex-syntax-0.6.22.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__remove_dir_all__0_5_3",
        url = "https://crates.io/api/v1/crates/remove_dir_all/0.5.3/download",
        type = "tar.gz",
        sha256 = "3acd125665422973a33ac9d3dd2df85edad0f4ae9b00dafb1a05e43a9f5ef8e7",
        strip_prefix = "remove_dir_all-0.5.3",
        build_file = Label("//third_party/cargo/remote:BUILD.remove_dir_all-0.5.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__reqwest__0_10_10",
        url = "https://crates.io/api/v1/crates/reqwest/0.10.10/download",
        type = "tar.gz",
        sha256 = "0718f81a8e14c4dbb3b34cf23dc6aaf9ab8a0dfec160c534b3dbca1aaa21f47c",
        strip_prefix = "reqwest-0.10.10",
        build_file = Label("//third_party/cargo/remote:BUILD.reqwest-0.10.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ring__0_16_19",
        url = "https://crates.io/api/v1/crates/ring/0.16.19/download",
        type = "tar.gz",
        sha256 = "024a1e66fea74c66c66624ee5622a7ff0e4b73a13b4f5c326ddb50c708944226",
        strip_prefix = "ring-0.16.19",
        build_file = Label("//third_party/cargo/remote:BUILD.ring-0.16.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rusty_fork__0_3_0",
        url = "https://crates.io/api/v1/crates/rusty-fork/0.3.0/download",
        type = "tar.gz",
        sha256 = "cb3dcc6e454c328bb824492db107ab7c0ae8fcffe4ad210136ef014458c1bc4f",
        strip_prefix = "rusty-fork-0.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.rusty-fork-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ryu__1_0_5",
        url = "https://crates.io/api/v1/crates/ryu/1.0.5/download",
        type = "tar.gz",
        sha256 = "71d301d4193d031abdd79ff7e3dd721168a9572ef3fe51a1517aba235bd8f86e",
        strip_prefix = "ryu-1.0.5",
        build_file = Label("//third_party/cargo/remote:BUILD.ryu-1.0.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__safemem__0_3_3",
        url = "https://crates.io/api/v1/crates/safemem/0.3.3/download",
        type = "tar.gz",
        sha256 = "ef703b7cb59335eae2eb93ceb664c0eb7ea6bf567079d843e09420219668e072",
        strip_prefix = "safemem-0.3.3",
        build_file = Label("//third_party/cargo/remote:BUILD.safemem-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__schannel__0_1_19",
        url = "https://crates.io/api/v1/crates/schannel/0.1.19/download",
        type = "tar.gz",
        sha256 = "8f05ba609c234e60bee0d547fe94a4c7e9da733d1c962cf6e59efa4cd9c8bc75",
        strip_prefix = "schannel-0.1.19",
        build_file = Label("//third_party/cargo/remote:BUILD.schannel-0.1.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__scoped_tls__1_0_0",
        url = "https://crates.io/api/v1/crates/scoped-tls/1.0.0/download",
        type = "tar.gz",
        sha256 = "ea6a9290e3c9cf0f18145ef7ffa62d68ee0bf5fcd651017e586dc7fd5da448c2",
        strip_prefix = "scoped-tls-1.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.scoped-tls-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__scoped_threadpool__0_1_9",
        url = "https://crates.io/api/v1/crates/scoped_threadpool/0.1.9/download",
        type = "tar.gz",
        sha256 = "1d51f5df5af43ab3f1360b429fa5e0152ac5ce8c0bd6485cae490332e96846a8",
        strip_prefix = "scoped_threadpool-0.1.9",
        build_file = Label("//third_party/cargo/remote:BUILD.scoped_threadpool-0.1.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__scopeguard__1_1_0",
        url = "https://crates.io/api/v1/crates/scopeguard/1.1.0/download",
        type = "tar.gz",
        sha256 = "d29ab0c6d3fc0ee92fe66e2d99f700eab17a8d57d1c1d3b748380fb20baa78cd",
        strip_prefix = "scopeguard-1.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.scopeguard-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__security_framework__2_0_0",
        url = "https://crates.io/api/v1/crates/security-framework/2.0.0/download",
        type = "tar.gz",
        sha256 = "c1759c2e3c8580017a484a7ac56d3abc5a6c1feadf88db2f3633f12ae4268c69",
        strip_prefix = "security-framework-2.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.security-framework-2.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__security_framework_sys__2_0_0",
        url = "https://crates.io/api/v1/crates/security-framework-sys/2.0.0/download",
        type = "tar.gz",
        sha256 = "f99b9d5e26d2a71633cc4f2ebae7cc9f874044e0c351a27e17892d76dce5678b",
        strip_prefix = "security-framework-sys-2.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.security-framework-sys-2.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde__1_0_123",
        url = "https://crates.io/api/v1/crates/serde/1.0.123/download",
        type = "tar.gz",
        sha256 = "92d5161132722baa40d802cc70b15262b98258453e85e5d1d365c757c73869ae",
        strip_prefix = "serde-1.0.123",
        build_file = Label("//third_party/cargo/remote:BUILD.serde-1.0.123.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_derive__1_0_123",
        url = "https://crates.io/api/v1/crates/serde_derive/1.0.123/download",
        type = "tar.gz",
        sha256 = "9391c295d64fc0abb2c556bad848f33cb8296276b1ad2677d1ae1ace4f258f31",
        strip_prefix = "serde_derive-1.0.123",
        build_file = Label("//third_party/cargo/remote:BUILD.serde_derive-1.0.123.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_json__1_0_61",
        url = "https://crates.io/api/v1/crates/serde_json/1.0.61/download",
        type = "tar.gz",
        sha256 = "4fceb2595057b6891a4ee808f70054bd2d12f0e97f1cbb78689b59f676df325a",
        strip_prefix = "serde_json-1.0.61",
        build_file = Label("//third_party/cargo/remote:BUILD.serde_json-1.0.61.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_qs__0_7_0",
        url = "https://crates.io/api/v1/crates/serde_qs/0.7.0/download",
        type = "tar.gz",
        sha256 = "9408a61dabe404c76cec504ec510f7d92f41dc0a9362a0db8ab73d141cfbf93f",
        strip_prefix = "serde_qs-0.7.0",
        build_file = Label("//third_party/cargo/remote:BUILD.serde_qs-0.7.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_urlencoded__0_6_1",
        url = "https://crates.io/api/v1/crates/serde_urlencoded/0.6.1/download",
        type = "tar.gz",
        sha256 = "9ec5d77e2d4c73717816afac02670d5c4f534ea95ed430442cad02e7a6e32c97",
        strip_prefix = "serde_urlencoded-0.6.1",
        build_file = Label("//third_party/cargo/remote:BUILD.serde_urlencoded-0.6.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_urlencoded__0_7_0",
        url = "https://crates.io/api/v1/crates/serde_urlencoded/0.7.0/download",
        type = "tar.gz",
        sha256 = "edfa57a7f8d9c1d260a549e7224100f6c43d43f9103e06dd8b4095a9b2b43ce9",
        strip_prefix = "serde_urlencoded-0.7.0",
        build_file = Label("//third_party/cargo/remote:BUILD.serde_urlencoded-0.7.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_yaml__0_8_14",
        url = "https://crates.io/api/v1/crates/serde_yaml/0.8.14/download",
        type = "tar.gz",
        sha256 = "f7baae0a99f1a324984bcdc5f0718384c1f69775f1c7eec8b859b71b443e3fd7",
        strip_prefix = "serde_yaml-0.8.14",
        build_file = Label("//third_party/cargo/remote:BUILD.serde_yaml-0.8.14.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__sha_1__0_8_2",
        url = "https://crates.io/api/v1/crates/sha-1/0.8.2/download",
        type = "tar.gz",
        sha256 = "f7d94d0bede923b3cea61f3f1ff57ff8cdfd77b400fb8f9998949e0cf04163df",
        strip_prefix = "sha-1-0.8.2",
        build_file = Label("//third_party/cargo/remote:BUILD.sha-1-0.8.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__sha_1__0_9_2",
        url = "https://crates.io/api/v1/crates/sha-1/0.9.2/download",
        type = "tar.gz",
        sha256 = "ce3cdf1b5e620a498ee6f2a171885ac7e22f0e12089ec4b3d22b84921792507c",
        strip_prefix = "sha-1-0.9.2",
        build_file = Label("//third_party/cargo/remote:BUILD.sha-1-0.9.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__similar__0_3_0",
        url = "https://crates.io/api/v1/crates/similar/0.3.0/download",
        type = "tar.gz",
        sha256 = "2c2c5334976f6000d0c36cf95a0b70ff4daa310b935aa4ce190d02f1012c81d0",
        strip_prefix = "similar-0.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.similar-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__simple_asn1__0_4_1",
        url = "https://crates.io/api/v1/crates/simple_asn1/0.4.1/download",
        type = "tar.gz",
        sha256 = "692ca13de57ce0613a363c8c2f1de925adebc81b04c923ac60c5488bb44abe4b",
        strip_prefix = "simple_asn1-0.4.1",
        build_file = Label("//third_party/cargo/remote:BUILD.simple_asn1-0.4.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__slab__0_4_2",
        url = "https://crates.io/api/v1/crates/slab/0.4.2/download",
        type = "tar.gz",
        sha256 = "c111b5bd5695e56cffe5129854aa230b39c93a305372fdbb2668ca2394eea9f8",
        strip_prefix = "slab-0.4.2",
        build_file = Label("//third_party/cargo/remote:BUILD.slab-0.4.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__socket2__0_3_17",
        url = "https://crates.io/api/v1/crates/socket2/0.3.17/download",
        type = "tar.gz",
        sha256 = "2c29947abdee2a218277abeca306f25789c938e500ea5a9d4b12a5a504466902",
        strip_prefix = "socket2-0.3.17",
        build_file = Label("//third_party/cargo/remote:BUILD.socket2-0.3.17.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__spin__0_5_2",
        url = "https://crates.io/api/v1/crates/spin/0.5.2/download",
        type = "tar.gz",
        sha256 = "6e63cff320ae2c57904679ba7cb63280a3dc4613885beafb148ee7bf9aa9042d",
        strip_prefix = "spin-0.5.2",
        build_file = Label("//third_party/cargo/remote:BUILD.spin-0.5.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__static_assertions__1_1_0",
        url = "https://crates.io/api/v1/crates/static_assertions/1.1.0/download",
        type = "tar.gz",
        sha256 = "a2eb9349b6444b326872e140eb1cf5e7c522154d69e7a0ffb0fb81c06b37543f",
        strip_prefix = "static_assertions-1.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.static_assertions-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__syn__1_0_60",
        url = "https://crates.io/api/v1/crates/syn/1.0.60/download",
        type = "tar.gz",
        sha256 = "c700597eca8a5a762beb35753ef6b94df201c81cca676604f547495a0d7f0081",
        strip_prefix = "syn-1.0.60",
        build_file = Label("//third_party/cargo/remote:BUILD.syn-1.0.60.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tempfile__3_1_0",
        url = "https://crates.io/api/v1/crates/tempfile/3.1.0/download",
        type = "tar.gz",
        sha256 = "7a6e24d9338a0a5be79593e2fa15a648add6138caa803e2d5bc782c371732ca9",
        strip_prefix = "tempfile-3.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.tempfile-3.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__termcolor__1_1_2",
        url = "https://crates.io/api/v1/crates/termcolor/1.1.2/download",
        type = "tar.gz",
        sha256 = "2dfed899f0eb03f32ee8c6a0aabdb8a7949659e3466561fc0adf54e26d88c5f4",
        strip_prefix = "termcolor-1.1.2",
        build_file = Label("//third_party/cargo/remote:BUILD.termcolor-1.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__terminal_size__0_1_15",
        url = "https://crates.io/api/v1/crates/terminal_size/0.1.15/download",
        type = "tar.gz",
        sha256 = "4bd2d183bd3fac5f5fe38ddbeb4dc9aec4a39a9d7d59e7491d900302da01cbe1",
        strip_prefix = "terminal_size-0.1.15",
        build_file = Label("//third_party/cargo/remote:BUILD.terminal_size-0.1.15.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__thiserror__1_0_22",
        url = "https://crates.io/api/v1/crates/thiserror/1.0.22/download",
        type = "tar.gz",
        sha256 = "0e9ae34b84616eedaaf1e9dd6026dbe00dcafa92aa0c8077cb69df1fcfe5e53e",
        strip_prefix = "thiserror-1.0.22",
        build_file = Label("//third_party/cargo/remote:BUILD.thiserror-1.0.22.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__thiserror_impl__1_0_22",
        url = "https://crates.io/api/v1/crates/thiserror-impl/1.0.22/download",
        type = "tar.gz",
        sha256 = "9ba20f23e85b10754cd195504aebf6a27e2e6cbe28c17778a0c930724628dd56",
        strip_prefix = "thiserror-impl-1.0.22",
        build_file = Label("//third_party/cargo/remote:BUILD.thiserror-impl-1.0.22.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__thread_local__1_0_1",
        url = "https://crates.io/api/v1/crates/thread_local/1.0.1/download",
        type = "tar.gz",
        sha256 = "d40c6d1b69745a6ec6fb1ca717914848da4b44ae29d9b3080cbee91d72a69b14",
        strip_prefix = "thread_local-1.0.1",
        build_file = Label("//third_party/cargo/remote:BUILD.thread_local-1.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tiff__0_6_1",
        url = "https://crates.io/api/v1/crates/tiff/0.6.1/download",
        type = "tar.gz",
        sha256 = "9a53f4706d65497df0c4349241deddf35f84cee19c87ed86ea8ca590f4464437",
        strip_prefix = "tiff-0.6.1",
        build_file = Label("//third_party/cargo/remote:BUILD.tiff-0.6.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__time__0_1_44",
        url = "https://crates.io/api/v1/crates/time/0.1.44/download",
        type = "tar.gz",
        sha256 = "6db9e6914ab8b1ae1c260a4ae7a49b6c5611b40328a735b21862567685e73255",
        strip_prefix = "time-0.1.44",
        build_file = Label("//third_party/cargo/remote:BUILD.time-0.1.44.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tinyvec__1_1_0",
        url = "https://crates.io/api/v1/crates/tinyvec/1.1.0/download",
        type = "tar.gz",
        sha256 = "ccf8dbc19eb42fba10e8feaaec282fb50e2c14b2726d6301dbfeed0f73306a6f",
        strip_prefix = "tinyvec-1.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.tinyvec-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tinyvec_macros__0_1_0",
        url = "https://crates.io/api/v1/crates/tinyvec_macros/0.1.0/download",
        type = "tar.gz",
        sha256 = "cda74da7e1a664f795bb1f8a87ec406fb89a02522cf6e50620d016add6dbbf5c",
        strip_prefix = "tinyvec_macros-0.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.tinyvec_macros-0.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio__0_2_23",
        url = "https://crates.io/api/v1/crates/tokio/0.2.23/download",
        type = "tar.gz",
        sha256 = "a6d7ad61edd59bfcc7e80dababf0f4aed2e6d5e0ba1659356ae889752dfc12ff",
        strip_prefix = "tokio-0.2.23",
        build_file = Label("//third_party/cargo/remote:BUILD.tokio-0.2.23.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio__1_0_1",
        url = "https://crates.io/api/v1/crates/tokio/1.0.1/download",
        type = "tar.gz",
        sha256 = "d258221f566b6c803c7b4714abadc080172b272090cdc5e244a6d4dd13c3a6bd",
        strip_prefix = "tokio-1.0.1",
        build_file = Label("//third_party/cargo/remote:BUILD.tokio-1.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_macros__0_2_6",
        url = "https://crates.io/api/v1/crates/tokio-macros/0.2.6/download",
        type = "tar.gz",
        sha256 = "e44da00bfc73a25f814cd8d7e57a68a5c31b74b3152a0a1d1f590c97ed06265a",
        strip_prefix = "tokio-macros-0.2.6",
        build_file = Label("//third_party/cargo/remote:BUILD.tokio-macros-0.2.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_tls__0_3_1",
        url = "https://crates.io/api/v1/crates/tokio-tls/0.3.1/download",
        type = "tar.gz",
        sha256 = "9a70f4fcd7b3b24fb194f837560168208f669ca8cb70d0c4b862944452396343",
        strip_prefix = "tokio-tls-0.3.1",
        build_file = Label("//third_party/cargo/remote:BUILD.tokio-tls-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_tungstenite__0_11_0",
        url = "https://crates.io/api/v1/crates/tokio-tungstenite/0.11.0/download",
        type = "tar.gz",
        sha256 = "6d9e878ad426ca286e4dcae09cbd4e1973a7f8987d97570e2469703dd7f5720c",
        strip_prefix = "tokio-tungstenite-0.11.0",
        build_file = Label("//third_party/cargo/remote:BUILD.tokio-tungstenite-0.11.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_util__0_3_1",
        url = "https://crates.io/api/v1/crates/tokio-util/0.3.1/download",
        type = "tar.gz",
        sha256 = "be8242891f2b6cbef26a2d7e8605133c2c554cd35b3e4948ea892d6d68436499",
        strip_prefix = "tokio-util-0.3.1",
        build_file = Label("//third_party/cargo/remote:BUILD.tokio-util-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tower_service__0_3_0",
        url = "https://crates.io/api/v1/crates/tower-service/0.3.0/download",
        type = "tar.gz",
        sha256 = "e987b6bf443f4b5b3b6f38704195592cca41c5bb7aedd3c3693c7081f8289860",
        strip_prefix = "tower-service-0.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.tower-service-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing__0_1_22",
        url = "https://crates.io/api/v1/crates/tracing/0.1.22/download",
        type = "tar.gz",
        sha256 = "9f47026cdc4080c07e49b37087de021820269d996f581aac150ef9e5583eefe3",
        strip_prefix = "tracing-0.1.22",
        build_file = Label("//third_party/cargo/remote:BUILD.tracing-0.1.22.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_core__0_1_17",
        url = "https://crates.io/api/v1/crates/tracing-core/0.1.17/download",
        type = "tar.gz",
        sha256 = "f50de3927f93d202783f4513cda820ab47ef17f624b03c096e86ef00c67e6b5f",
        strip_prefix = "tracing-core-0.1.17",
        build_file = Label("//third_party/cargo/remote:BUILD.tracing-core-0.1.17.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_futures__0_2_4",
        url = "https://crates.io/api/v1/crates/tracing-futures/0.2.4/download",
        type = "tar.gz",
        sha256 = "ab7bb6f14721aa00656086e9335d363c5c8747bae02ebe32ea2c7dece5689b4c",
        strip_prefix = "tracing-futures-0.2.4",
        build_file = Label("//third_party/cargo/remote:BUILD.tracing-futures-0.2.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__try_lock__0_2_3",
        url = "https://crates.io/api/v1/crates/try-lock/0.2.3/download",
        type = "tar.gz",
        sha256 = "59547bce71d9c38b83d9c0e92b6066c4253371f15005def0c30d9657f50c7642",
        strip_prefix = "try-lock-0.2.3",
        build_file = Label("//third_party/cargo/remote:BUILD.try-lock-0.2.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tungstenite__0_11_1",
        url = "https://crates.io/api/v1/crates/tungstenite/0.11.1/download",
        type = "tar.gz",
        sha256 = "f0308d80d86700c5878b9ef6321f020f29b1bb9d5ff3cab25e75e23f3a492a23",
        strip_prefix = "tungstenite-0.11.1",
        build_file = Label("//third_party/cargo/remote:BUILD.tungstenite-0.11.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__twoway__0_1_8",
        url = "https://crates.io/api/v1/crates/twoway/0.1.8/download",
        type = "tar.gz",
        sha256 = "59b11b2b5241ba34be09c3cc85a36e56e48f9888862e19cedf23336d35316ed1",
        strip_prefix = "twoway-0.1.8",
        build_file = Label("//third_party/cargo/remote:BUILD.twoway-0.1.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__typed_builder__0_7_1",
        url = "https://crates.io/api/v1/crates/typed-builder/0.7.1/download",
        type = "tar.gz",
        sha256 = "f85f4270f4f449a3f2c0cf2aecc8415e388a597aeacc7d55fc749c5c968c8533",
        strip_prefix = "typed-builder-0.7.1",
        build_file = Label("//third_party/cargo/remote:BUILD.typed-builder-0.7.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__typenum__1_12_0",
        url = "https://crates.io/api/v1/crates/typenum/1.12.0/download",
        type = "tar.gz",
        sha256 = "373c8a200f9e67a0c95e62a4f52fbf80c23b4381c05a17845531982fa99e6b33",
        strip_prefix = "typenum-1.12.0",
        build_file = Label("//third_party/cargo/remote:BUILD.typenum-1.12.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicase__2_6_0",
        url = "https://crates.io/api/v1/crates/unicase/2.6.0/download",
        type = "tar.gz",
        sha256 = "50f37be617794602aabbeee0be4f259dc1778fabe05e2d67ee8f79326d5cb4f6",
        strip_prefix = "unicase-2.6.0",
        build_file = Label("//third_party/cargo/remote:BUILD.unicase-2.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_bidi__0_3_4",
        url = "https://crates.io/api/v1/crates/unicode-bidi/0.3.4/download",
        type = "tar.gz",
        sha256 = "49f2bd0c6468a8230e1db229cff8029217cf623c767ea5d60bfbd42729ea54d5",
        strip_prefix = "unicode-bidi-0.3.4",
        build_file = Label("//third_party/cargo/remote:BUILD.unicode-bidi-0.3.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_normalization__0_1_16",
        url = "https://crates.io/api/v1/crates/unicode-normalization/0.1.16/download",
        type = "tar.gz",
        sha256 = "a13e63ab62dbe32aeee58d1c5408d35c36c392bba5d9d3142287219721afe606",
        strip_prefix = "unicode-normalization-0.1.16",
        build_file = Label("//third_party/cargo/remote:BUILD.unicode-normalization-0.1.16.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_xid__0_2_1",
        url = "https://crates.io/api/v1/crates/unicode-xid/0.2.1/download",
        type = "tar.gz",
        sha256 = "f7fe0bb3479651439c9112f72b6c505038574c9fbb575ed1bf3b797fa39dd564",
        strip_prefix = "unicode-xid-0.2.1",
        build_file = Label("//third_party/cargo/remote:BUILD.unicode-xid-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unreachable__1_0_0",
        url = "https://crates.io/api/v1/crates/unreachable/1.0.0/download",
        type = "tar.gz",
        sha256 = "382810877fe448991dfc7f0dd6e3ae5d58088fd0ea5e35189655f84e6814fa56",
        strip_prefix = "unreachable-1.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.unreachable-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__untrusted__0_7_1",
        url = "https://crates.io/api/v1/crates/untrusted/0.7.1/download",
        type = "tar.gz",
        sha256 = "a156c684c91ea7d62626509bce3cb4e1d9ed5c4d978f7b4352658f96a4c26b4a",
        strip_prefix = "untrusted-0.7.1",
        build_file = Label("//third_party/cargo/remote:BUILD.untrusted-0.7.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__url__2_2_0",
        url = "https://crates.io/api/v1/crates/url/2.2.0/download",
        type = "tar.gz",
        sha256 = "5909f2b0817350449ed73e8bcd81c8c3c8d9a7a5d8acba4b27db277f1868976e",
        strip_prefix = "url-2.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.url-2.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__urlencoding__1_1_1",
        url = "https://crates.io/api/v1/crates/urlencoding/1.1.1/download",
        type = "tar.gz",
        sha256 = "c9232eb53352b4442e40d7900465dfc534e8cb2dc8f18656fcb2ac16112b5593",
        strip_prefix = "urlencoding-1.1.1",
        build_file = Label("//third_party/cargo/remote:BUILD.urlencoding-1.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__utf_8__0_7_5",
        url = "https://crates.io/api/v1/crates/utf-8/0.7.5/download",
        type = "tar.gz",
        sha256 = "05e42f7c18b8f902290b009cde6d651262f956c98bc51bca4cd1d511c9cd85c7",
        strip_prefix = "utf-8-0.7.5",
        build_file = Label("//third_party/cargo/remote:BUILD.utf-8-0.7.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__uuid__0_8_1",
        url = "https://crates.io/api/v1/crates/uuid/0.8.1/download",
        type = "tar.gz",
        sha256 = "9fde2f6a4bea1d6e007c4ad38c6839fa71cbb63b6dbf5b595aa38dc9b1093c11",
        strip_prefix = "uuid-0.8.1",
        build_file = Label("//third_party/cargo/remote:BUILD.uuid-0.8.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__value_bag__1_0_0_alpha_6",
        url = "https://crates.io/api/v1/crates/value-bag/1.0.0-alpha.6/download",
        type = "tar.gz",
        sha256 = "6b676010e055c99033117c2343b33a40a30b91fecd6c49055ac9cd2d6c305ab1",
        strip_prefix = "value-bag-1.0.0-alpha.6",
        build_file = Label("//third_party/cargo/remote:BUILD.value-bag-1.0.0-alpha.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__vcpkg__0_2_10",
        url = "https://crates.io/api/v1/crates/vcpkg/0.2.10/download",
        type = "tar.gz",
        sha256 = "6454029bf181f092ad1b853286f23e2c507d8e8194d01d92da4a55c274a5508c",
        strip_prefix = "vcpkg-0.2.10",
        build_file = Label("//third_party/cargo/remote:BUILD.vcpkg-0.2.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__vec_arena__1_0_0",
        url = "https://crates.io/api/v1/crates/vec-arena/1.0.0/download",
        type = "tar.gz",
        sha256 = "eafc1b9b2dfc6f5529177b62cf806484db55b32dc7c9658a118e11bbeb33061d",
        strip_prefix = "vec-arena-1.0.0",
        build_file = Label("//third_party/cargo/remote:BUILD.vec-arena-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__version_check__0_9_2",
        url = "https://crates.io/api/v1/crates/version_check/0.9.2/download",
        type = "tar.gz",
        sha256 = "b5a972e5669d67ba988ce3dc826706fb0a8b01471c088cb0b6110b805cc36aed",
        strip_prefix = "version_check-0.9.2",
        build_file = Label("//third_party/cargo/remote:BUILD.version_check-0.9.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__void__1_0_2",
        url = "https://crates.io/api/v1/crates/void/1.0.2/download",
        type = "tar.gz",
        sha256 = "6a02e4885ed3bc0f2de90ea6dd45ebcbb66dacffe03547fadbb0eeae2770887d",
        strip_prefix = "void-1.0.2",
        build_file = Label("//third_party/cargo/remote:BUILD.void-1.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wait_timeout__0_2_0",
        url = "https://crates.io/api/v1/crates/wait-timeout/0.2.0/download",
        type = "tar.gz",
        sha256 = "9f200f5b12eb75f8c1ed65abd4b2db8a6e1b138a20de009dacee265a2498f3f6",
        strip_prefix = "wait-timeout-0.2.0",
        build_file = Label("//third_party/cargo/remote:BUILD.wait-timeout-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__waker_fn__1_1_0",
        url = "https://crates.io/api/v1/crates/waker-fn/1.1.0/download",
        type = "tar.gz",
        sha256 = "9d5b2c62b4012a3e1eca5a7e077d13b3bf498c4073e33ccd58626607748ceeca",
        strip_prefix = "waker-fn-1.1.0",
        build_file = Label("//third_party/cargo/remote:BUILD.waker-fn-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__want__0_3_0",
        url = "https://crates.io/api/v1/crates/want/0.3.0/download",
        type = "tar.gz",
        sha256 = "1ce8a968cb1cd110d136ff8b819a556d6fb6d919363c61534f6860c7eb172ba0",
        strip_prefix = "want-0.3.0",
        build_file = Label("//third_party/cargo/remote:BUILD.want-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__warp__0_2_5",
        url = "https://crates.io/api/v1/crates/warp/0.2.5/download",
        type = "tar.gz",
        sha256 = "f41be6df54c97904af01aa23e613d4521eed7ab23537cede692d4058f6449407",
        strip_prefix = "warp-0.2.5",
        build_file = Label("//third_party/cargo/remote:BUILD.warp-0.2.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasi__0_10_0_wasi_snapshot_preview1",
        url = "https://crates.io/api/v1/crates/wasi/0.10.0+wasi-snapshot-preview1/download",
        type = "tar.gz",
        sha256 = "1a143597ca7c7793eff794def352d41792a93c481eb1042423ff7ff72ba2c31f",
        strip_prefix = "wasi-0.10.0+wasi-snapshot-preview1",
        build_file = Label("//third_party/cargo/remote:BUILD.wasi-0.10.0+wasi-snapshot-preview1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasi__0_9_0_wasi_snapshot_preview1",
        url = "https://crates.io/api/v1/crates/wasi/0.9.0+wasi-snapshot-preview1/download",
        type = "tar.gz",
        sha256 = "cccddf32554fecc6acb585f82a32a72e28b48f8c4c1883ddfeeeaa96f7d8e519",
        strip_prefix = "wasi-0.9.0+wasi-snapshot-preview1",
        build_file = Label("//third_party/cargo/remote:BUILD.wasi-0.9.0+wasi-snapshot-preview1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen__0_2_68",
        url = "https://crates.io/api/v1/crates/wasm-bindgen/0.2.68/download",
        type = "tar.gz",
        sha256 = "1ac64ead5ea5f05873d7c12b545865ca2b8d28adfc50a49b84770a3a97265d42",
        strip_prefix = "wasm-bindgen-0.2.68",
        build_file = Label("//third_party/cargo/remote:BUILD.wasm-bindgen-0.2.68.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_backend__0_2_68",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-backend/0.2.68/download",
        type = "tar.gz",
        sha256 = "f22b422e2a757c35a73774860af8e112bff612ce6cb604224e8e47641a9e4f68",
        strip_prefix = "wasm-bindgen-backend-0.2.68",
        build_file = Label("//third_party/cargo/remote:BUILD.wasm-bindgen-backend-0.2.68.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_futures__0_4_18",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-futures/0.4.18/download",
        type = "tar.gz",
        sha256 = "b7866cab0aa01de1edf8b5d7936938a7e397ee50ce24119aef3e1eaa3b6171da",
        strip_prefix = "wasm-bindgen-futures-0.4.18",
        build_file = Label("//third_party/cargo/remote:BUILD.wasm-bindgen-futures-0.4.18.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_macro__0_2_68",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-macro/0.2.68/download",
        type = "tar.gz",
        sha256 = "6b13312a745c08c469f0b292dd2fcd6411dba5f7160f593da6ef69b64e407038",
        strip_prefix = "wasm-bindgen-macro-0.2.68",
        build_file = Label("//third_party/cargo/remote:BUILD.wasm-bindgen-macro-0.2.68.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_macro_support__0_2_68",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-macro-support/0.2.68/download",
        type = "tar.gz",
        sha256 = "f249f06ef7ee334cc3b8ff031bfc11ec99d00f34d86da7498396dc1e3b1498fe",
        strip_prefix = "wasm-bindgen-macro-support-0.2.68",
        build_file = Label("//third_party/cargo/remote:BUILD.wasm-bindgen-macro-support-0.2.68.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_shared__0_2_68",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-shared/0.2.68/download",
        type = "tar.gz",
        sha256 = "1d649a3145108d7d3fbcde896a468d1bd636791823c9921135218ad89be08307",
        strip_prefix = "wasm-bindgen-shared-0.2.68",
        build_file = Label("//third_party/cargo/remote:BUILD.wasm-bindgen-shared-0.2.68.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__web_sys__0_3_45",
        url = "https://crates.io/api/v1/crates/web-sys/0.3.45/download",
        type = "tar.gz",
        sha256 = "4bf6ef87ad7ae8008e15a355ce696bed26012b7caa21605188cfd8214ab51e2d",
        strip_prefix = "web-sys-0.3.45",
        build_file = Label("//third_party/cargo/remote:BUILD.web-sys-0.3.45.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__weezl__0_1_3",
        url = "https://crates.io/api/v1/crates/weezl/0.1.3/download",
        type = "tar.gz",
        sha256 = "3e2bb9fc8309084dd7cd651336673844c1d47f8ef6d2091ec160b27f5c4aa277",
        strip_prefix = "weezl-0.1.3",
        build_file = Label("//third_party/cargo/remote:BUILD.weezl-0.1.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wepoll_sys__3_0_1",
        url = "https://crates.io/api/v1/crates/wepoll-sys/3.0.1/download",
        type = "tar.gz",
        sha256 = "0fcb14dea929042224824779fbc82d9fab8d2e6d3cbc0ac404de8edf489e77ff",
        strip_prefix = "wepoll-sys-3.0.1",
        build_file = Label("//third_party/cargo/remote:BUILD.wepoll-sys-3.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi__0_2_8",
        url = "https://crates.io/api/v1/crates/winapi/0.2.8/download",
        type = "tar.gz",
        sha256 = "167dc9d6949a9b857f3451275e911c3f44255842c1f7a76f33c55103a909087a",
        strip_prefix = "winapi-0.2.8",
        build_file = Label("//third_party/cargo/remote:BUILD.winapi-0.2.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi__0_3_9",
        url = "https://crates.io/api/v1/crates/winapi/0.3.9/download",
        type = "tar.gz",
        sha256 = "5c839a674fcd7a98952e593242ea400abe93992746761e38641405d28b00f419",
        strip_prefix = "winapi-0.3.9",
        build_file = Label("//third_party/cargo/remote:BUILD.winapi-0.3.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi_build__0_1_1",
        url = "https://crates.io/api/v1/crates/winapi-build/0.1.1/download",
        type = "tar.gz",
        sha256 = "2d315eee3b34aca4797b2da6b13ed88266e6d612562a0c46390af8299fc699bc",
        strip_prefix = "winapi-build-0.1.1",
        build_file = Label("//third_party/cargo/remote:BUILD.winapi-build-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi_i686_pc_windows_gnu__0_4_0",
        url = "https://crates.io/api/v1/crates/winapi-i686-pc-windows-gnu/0.4.0/download",
        type = "tar.gz",
        sha256 = "ac3b87c63620426dd9b991e5ce0329eff545bccbbb34f3be09ff6fb6ab51b7b6",
        strip_prefix = "winapi-i686-pc-windows-gnu-0.4.0",
        build_file = Label("//third_party/cargo/remote:BUILD.winapi-i686-pc-windows-gnu-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi_util__0_1_5",
        url = "https://crates.io/api/v1/crates/winapi-util/0.1.5/download",
        type = "tar.gz",
        sha256 = "70ec6ce85bb158151cae5e5c87f95a8e97d2c0c4b001223f33a334e3ce5de178",
        strip_prefix = "winapi-util-0.1.5",
        build_file = Label("//third_party/cargo/remote:BUILD.winapi-util-0.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi_x86_64_pc_windows_gnu__0_4_0",
        url = "https://crates.io/api/v1/crates/winapi-x86_64-pc-windows-gnu/0.4.0/download",
        type = "tar.gz",
        sha256 = "712e227841d057c1ee1cd2fb22fa7e5a5461ae8e48fa2ca79ec42cfc1931183f",
        strip_prefix = "winapi-x86_64-pc-windows-gnu-0.4.0",
        build_file = Label("//third_party/cargo/remote:BUILD.winapi-x86_64-pc-windows-gnu-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winreg__0_7_0",
        url = "https://crates.io/api/v1/crates/winreg/0.7.0/download",
        type = "tar.gz",
        sha256 = "0120db82e8a1e0b9fb3345a539c478767c0048d842860994d96113d5b667bd69",
        strip_prefix = "winreg-0.7.0",
        build_file = Label("//third_party/cargo/remote:BUILD.winreg-0.7.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ws2_32_sys__0_2_1",
        url = "https://crates.io/api/v1/crates/ws2_32-sys/0.2.1/download",
        type = "tar.gz",
        sha256 = "d59cefebd0c892fa2dd6de581e937301d8552cb44489cdff035c6187cb63fa5e",
        strip_prefix = "ws2_32-sys-0.2.1",
        build_file = Label("//third_party/cargo/remote:BUILD.ws2_32-sys-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__yaml_rust__0_4_4",
        url = "https://crates.io/api/v1/crates/yaml-rust/0.4.4/download",
        type = "tar.gz",
        sha256 = "39f0c922f1a334134dc2f7a8b67dc5d25f0735263feec974345ff706bcf20b0d",
        strip_prefix = "yaml-rust-0.4.4",
        build_file = Label("//third_party/cargo/remote:BUILD.yaml-rust-0.4.4.bazel"),
    )
