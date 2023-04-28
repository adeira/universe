---
id: git
title: Git
sidebar_label: Git
---

- [Recommendations on Branching, Controlling Access to Features](https://secure.phabricator.com/book/phabflavor/article/recommendations_on_branching/)
- [Yarn Plug'n'Play Whitepaper](https://github.com/yarnpkg/rfcs/blob/master/accepted/0000-plug-an-play.md) (alternative: https://github.com/npm/tink)
- https://chris.beams.io/posts/git-commit/
- https://stackoverflow.com/questions/600079/how-do-i-clone-a-subdirectory-only-of-a-git-repository/13738951
- https://medium.com/@porteneuve/fix-conflicts-only-once-with-git-rerere-7d116b2cec67
- https://git-scm.com/book/en/v2/Git-Internals-Transfer-Protocols
- [How can I prevent git from thinking I did a rename](https://stackoverflow.com/questions/15031576/how-can-i-prevent-git-from-thinking-i-did-a-rename)

## New repo with copied history of only currently tracked files

```bash
git rev-list --all --count
```

Filtering:

```bash
git checkout master
git ls-files > keep-these.txt
git filter-branch --force --index-filter \
  "git rm  --ignore-unmatch --cached -qr . ; \
  cat $PWD/keep-these.txt | tr '\n' '\0' | xargs -0 git reset -q \$GIT_COMMIT --" \
  --prune-empty --tag-name-filter cat -- --all
```

Cleanup:

```bash
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now

# optional extra gc. Slow and may not further-reduce the repo size
git gc --aggressive --prune=now
```

Source: https://stackoverflow.com/a/17909526/3135248

Please note: you should delete everything you want to remove and run the filter. However, do not move the directories structure otherwise you will lose their history! Make these changes part of your history.

## Keeping origin synced with upstream

```bash
$ git remote -v
origin	git@gitlab.skypicker.com:martin.zlamal/geojson-editor.git (fetch)
origin	git@gitlab.skypicker.com:martin.zlamal/geojson-editor.git (push)

$ git remote add upstream git@gitlab.skypicker.com:alex.alexeev/geojson-editor.git
$ git remote -v
origin	git@gitlab.skypicker.com:martin.zlamal/geojson-editor.git (fetch)
origin	git@gitlab.skypicker.com:martin.zlamal/geojson-editor.git (push)
upstream	git@gitlab.skypicker.com:alex.alexeev/geojson-editor.git (fetch)e
upstream	git@gitlab.skypicker.com:alex.alexeev/geojson-editor.git (push)

$ git fetch upstream
remote: Enumerating objects: 37, done.
remote: Counting objects: 100% (31/31), done.
remote: Compressing objects: 100% (15/15), done.
remote: Total 15 (delta 7), reused 0 (delta 0)
Unpacking objects: 100% (15/15), done.
From gitlab.skypicker.com:alex.alexeev/geojson-editor
 * [new branch]      17-poi-save -> upstream/17-poi-save
 * [new branch]      master      -> upstream/master

$ git checkout master
Already on 'master'
Your branch is up to date with 'origin/master'.

$ git merge upstream/master
Updating c935cea..e6e1284
Fast-forward
 package.json                     |  4 ++--
 src/components/DetailsSidebar.js |  3 ---
 yarn.lock                        | 64 ++++++++++++++++++++++++++++++++++++----------------------------
 3 files changed, 38 insertions(+), 33 deletions(-)
```

## Changelog in monorepo

Get hash of the latest version:

```bash
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

```bash
git log --oneline 8755e0bb..HEAD -- src/packages/signed-source
```

```
3ee25b4 Eslint: add new rule 'no-newline-string' to enforce os.EOL usage
```

I see, what was the hash of the version before? (means before `8755e0bb`)

```bash
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

```bash
git log --oneline 171347dd..8755e0bb -- src/packages/signed-source
```

```
8755e0b NPM: publish `@kiwicom/signed-source` package
509f31a JS: cleanup Eslint warnings
006d256 Apply new set of eslint rules
7bf5bd4 Add monorepo packages test
```

_(repeat)_

## Semver

- https://yarnpkg.com/en/docs/dependency-versions
- https://semver.npmjs.com/

MAJOR.MINOR.PATCH, increment the:

- _MAJOR_ version when you make incompatible API changes,
- _MINOR_ version when you add functionality in a backwards-compatible manner, and
- _PATCH_ version when you make backwards-compatible bug fixes.

### Caret Ranges

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

### Tilde Ranges

Using `~` with a minor version specified allows `patch` changes. Using `~` with
only major version specified will allow `minor` changes.

| Version range | Expanded version range      |
| ------------- | --------------------------- |
| `~3.1.4`      | `>=3.1.4 <3.2.0`            |
| `~3.1`        | `3.1.x` or `>=3.1.0 <3.2.0` |
| `~3`          | `3.x` or `>=3.0.0 <4.0.0`   |

## Global .gitignore

```bash
git config --global core.excludesfile ~/.gitignore_global
```

```text
.DS_Store
.idea/
```

- https://help.github.com/en/articles/ignoring-files#create-a-global-gitignore
- https://gist.github.com/subfuzion/db7f57fff2fb6998a16c
