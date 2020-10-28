# TODO

- Add some kind of Rollout into our runner to be able to enable some rule for only let's say 10% of your files (deterministically). This way you could be increasing this number based on how you progress with some rule. Alternatively:
- Keep track of the number of warnings/errors so you can fail when this number change. Examples:
  - previously: 33 warnings for no-console, now 32 warnings -> something was fixed -> fail so dev is forced to update limits/kind-of-snapshot
  - previously: 33 warnings, now 34 -> fail because more problems were introduced, alternatively:
- Keep already existing warnings but make them errors for newly edited files.
- ...
