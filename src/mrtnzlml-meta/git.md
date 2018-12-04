https://secure.phabricator.com/book/phabflavor/article/recommendations_on_branching/ (+ Controlling Access to Features)

# Changelog in monorepo

This returns changelog from one specific hash (latest version) with optional diff (`-p`) for one package in monorepo (`logz` in this case).

```
git log -p ba07665841cea30ba523b1b8402647a56fb94334..HEAD -- src/packages/logz
```

# Semver

- https://yarnpkg.com/en/docs/dependency-versions
- https://semver.npmjs.com/

MAJOR.MINOR.PATCH, increment the:

- _MAJOR_ version when you make incompatible API changes,
- _MINOR_ version when you add functionality in a backwards-compatible manner, and
- _PATCH_ version when you make backwards-compatible bug fixes.

## Caret Ranges

Allow changes that do not modify the first non-zero digit in the version,
either the `3` in `3.1.4` or the `4` in `0.4.2`.

| Version range | Expanded version range |
| ------------- | ---------------------- |
| `^3.1.4`      | `>=3.1.4 <4.0.0`       |
| `^0.4.2`      | `>=0.4.2 <0.5.0`       |
| `^0.0.2`      | `>=0.0.2 <0.0.3`       |

If part of the version is left out, the missing parts are filled in with
zeroes. However, they will still allow for that value to be changed.

| Version range | Expanded version range |
| ------------- | ---------------------- |
| `^0.0.x`      | `>=0.0.0 <0.1.0`       |
| `^0.0`        | `>=0.0.0 <0.1.0`       |
| `^0.x`        | `>=0.0.0 <1.0.0`       |
| `^0`          | `>=0.0.0 <1.0.0`       |

## Tilde Ranges

Using `~` with a minor version specified allows `patch` changes. Using `~` with
only major version specified will allow `minor` changes.

| Version range | Expanded version range      |
| ------------- | --------------------------- |
| `~3.1.4`      | `>=3.1.4 <3.2.0`            |
| `~3.1`        | `3.1.x` or `>=3.1.0 <3.2.0` |
| `~3`          | `3.x` or `>=3.0.0 <4.0.0`   |
