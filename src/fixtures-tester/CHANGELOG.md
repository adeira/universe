# Unreleased

# 1.1.0

- New function `verifyTestsFromFixtures` added - it has similar interface as `generateTestsFromFixtures` except it verifies that the operation result is `true` instead of creating Jest snapshots. This is useful when you want to run some tests on your fixtures files but there is not much to snapshot.

# 1.0.1

Note for all Flow users: all projects in [`adeira/universe`](https://github.com/adeira/universe) now use implicit exact Flow types (`{}` for strict objects and `{ ... }` for open objects, syntax `{||}` is deprecated). We do not expect any issues as long as you are using `exact_by_default=true` Flow option.

- Fix failure on unexpected subfolders, see: https://github.com/adeira/universe/pull/2257

# 1.0.0

Initial release.
