- [Recommendations on Branching, Controlling Access to Features](https://secure.phabricator.com/book/phabflavor/article/recommendations_on_branching/)
- [Yarn Plug'n'Play Whitepaper](https://github.com/yarnpkg/rfcs/blob/master/accepted/0000-plug-an-play.md) (alternative: https://github.com/npm/tink)
- https://chris.beams.io/posts/git-commit/

What happened in last week?

```
git log --since=1.week --oneline --no-merges
```

# Keeping origin synced with upstream

```
🤓 geojson-editor [master] git remote -v
origin	git@gitlab.skypicker.com:martin.zlamal/geojson-editor.git (fetch)
origin	git@gitlab.skypicker.com:martin.zlamal/geojson-editor.git (push)
🤓 geojson-editor [master] git remote add upstream git@gitlab.skypicker.com:alex.alexeev/geojson-editor.git
🤓 geojson-editor [master] git remote -v
origin	git@gitlab.skypicker.com:martin.zlamal/geojson-editor.git (fetch)
origin	git@gitlab.skypicker.com:martin.zlamal/geojson-editor.git (push)
upstream	git@gitlab.skypicker.com:alex.alexeev/geojson-editor.git (fetch)
upstream	git@gitlab.skypicker.com:alex.alexeev/geojson-editor.git (push)
🤓 geojson-editor [master] git fetch upstream
remote: Enumerating objects: 37, done.
remote: Counting objects: 100% (31/31), done.
remote: Compressing objects: 100% (15/15), done.
remote: Total 15 (delta 7), reused 0 (delta 0)
Unpacking objects: 100% (15/15), done.
From gitlab.skypicker.com:alex.alexeev/geojson-editor
 * [new branch]      17-poi-save -> upstream/17-poi-save
 * [new branch]      master      -> upstream/master
🤓 geojson-editor [master] git checkout master
Already on 'master'
Your branch is up to date with 'origin/master'.
🤓 geojson-editor [master] git merge upstream/master
Updating c935cea..e6e1284
Fast-forward
 package.json                     |  4 ++--
 src/components/DetailsSidebar.js |  3 ---
 yarn.lock                        | 64 ++++++++++++++++++++++++++++++++++++----------------------------
 3 files changed, 38 insertions(+), 33 deletions(-)
```

# Changelog in monorepo

Get hash of the latest version:

```
git blame -- src/packages/signed-source/package.json
```
```
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 1) {
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 2)   "name": "@kiwicom/signed-source",
8755e0bb (Martin Zlámal 2018-12-05 08:37:51 -0500 3)   "private": false,
8755e0bb (Martin Zlámal 2018-12-05 08:37:51 -0500 4)   "version": "0.1.0",
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 5)   "main": "src/SignedSource.js"
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 6) }
```

OK, latest version hash is `8755e0bb`. What are the latest changes?

```
git log --oneline 8755e0bb..HEAD -- src/packages/signed-source
```
```
3ee25b4 Eslint: add new rule 'no-newline-string' to enforce os.EOL usage
```

I see, what was the hash of the version before? (means before `8755e0bb`)

```
git blame 8755e0bb^ -- src/packages/signed-source/package.json
```
```
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 1) {
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 2)   "name": "@kiwicom/signed-source",
7bf5bd4b (Martin Zlámal 2018-11-08 16:11:33 +0100 3)   "private": true,
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 4)   "version": "0.0.0",
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 5)   "main": "src/SignedSource.js"
171347dd (Martin Zlámal 2018-11-02 10:31:03 +0100 6) }
```

OK, it was `171347dd`. What are the changes between these 2 versions?

```
git log --oneline 171347dd..8755e0bb -- src/packages/signed-source
```
```
8755e0b NPM: publish `@kiwicom/signed-source` package
509f31a JS: cleanup Eslint warnings
006d256 Apply new set of eslint rules
7bf5bd4 Add monorepo packages test
```

_(repeat)_

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
