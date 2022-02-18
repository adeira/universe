---
title: Clearing/resetting/restoring Jest mocks
tags: ['javascript', 'jest']
---

I am never gonna remember this correctly I guess. 🤷

- `jest.clearAllMocks()` only clears the internal state of the mock
- `jest.resetAllMocks()` does the same + it removes any mocked implementations or return values
- `jest.restoreAllMocks()` does everything above but it restores the original non-mocked implementation (and works only with `jest.spyOn`)

https://github.com/facebook/jest/issues/5143
