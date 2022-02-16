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

## Configuration

See: https://git-scm.com/docs/git-config

Local config (`.git/config`, removed irrelevant or sensitive parts):

```ini
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
	fsmonitor = .git/hooks/fsmonitor-watchman
[remote "origin"]
	url = git@gitlab.skypicker.com:incubator/universe.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

The most interesting part is probably `core.fsmonitor`. More info about it:

- https://github.blog/2018-04-05-git-217-released/#speeding-up-status-with-watchman
- https://git-scm.com/docs/githooks#_fsmonitor_watchman
- https://github.com/git/git/commit/def4376711f607914bfb784f8de21867062fa284

Global config (`~/.gitconfig`):

```ini
[user]
	name = Martin Zlámal
	email = mrtnzlml@gmail.com
[core]
	excludesfile = ~/.gitignore_global
[rerere]
	enabled = true
[alias]
	; git config --global alias.st "status"
	st = status
[diff]
	mnemonicPrefix = true
```

Where (`.gitignore_global`):

```gitignore
.DS_Store
.idea/
```

## Gitignore

```gitignore
# Empty lines are being ignored.
# Trailing spaces are ignored unless they are quoted with backslash ("\").

\#not_a_comment.xyz
!\#not_a_comment.xyz

# If there is a separator at the beginning or middle (or both) of the pattern, then the pattern is relative to the directory level of the particular .gitignore file itself.
# Otherwise the pattern may also match at any level below the .gitignore level.

directory_only/
directory_or_file

# An asterisk "*" matches anything except a slash.
# The character "?" matches any one character except "/".
# The range notation, e.g. [a-zA-Z], can be used to match one of the characters in a range.

# Two consecutive asterisks ("**") in patterns matched against full pathname may have special meaning:
**/foo     # match in all directories
abc/**     # matches all files inside directory "abc"
a/**/b     # zero or more directories ("a/b", "a/x/b", "a/x/y/b", ...)
```

https://git-scm.com/docs/gitignore

## A..B vs A...B vs --ancestry-path

See: https://stackoverflow.com/a/36437843

## Understanding `@@ -1,2 +3,4 @@` part of the diff

```text
diff -u <(seq 16) <(seq 16 | grep -Ev '^(2|3|14|15)$')
--- /dev/fd/11	2019-09-26 15:48:31.000000000 -0500
+++ /dev/fd/12	2019-09-26 15:48:31.000000000 -0500
// highlight-next-line
@@ -1,6 +1,4 @@
 1
-2
-3
 4
 5
 6
// highlight-next-line
@@ -11,6 +9,4 @@
 11
 12
 13
-14
-15
 16
```

- `-1,6` means that this piece of the first file starts at line 1 and shows a total of 6 lines; therefore it shows lines 1 to 6 (`-` means "old", as we usually invoke it as `diff -u old new`)
- `+1,4` means that this piece of the second file starts at line 1 and shows a total of 4 lines; therefore it shows lines 1 to 4 (`+` means "new")
- `@@ -11,6 +9,4 @@` for the second hunk is analogous: in the old file, we have 6 lines, starting at line 11 of the old file; in the new file, we have 4 lines, starting at line 9 of the new file

> This is for anyone who still didn't quite understand. In `@@ -1,6 +1,4 @@` pls don't read `-1` as "minus one" or `+1` as "plus one". Instead read this as "line 1 to 6" in old (first) file. Note here `-` implies "old" _not minus_.

Source: https://stackoverflow.com/a/31615438/3135248

## Working with monorepo

- https://gitlab.com/groups/gitlab-org/-/epics/915
- https://gitlab.com/gitlab-org/gitaly/issues/1581

> In a large repository you can’t afford to rebuild and test all the source code each time you make a change. A change to a package should only test and build consumers of that package, the time to build and test the project has to be proportional to what was changed not to the size of the project.

## 4b825dc642cb6eb9a060e54bf8d69288fbee4904

This hash exists in every Git repository: https://stackoverflow.com/q/9765453/3135248

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
