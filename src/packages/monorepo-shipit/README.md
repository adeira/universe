Heavily inspired by https://github.com/facebook/fbshipit

This is how it more or less works:

# Shipit part

```text
$ hhvm -m debug
Welcome to HipHop Debugger!
Type "help" or "?" for a complete list of commands.

hphpd> require_once('./autoload.php')
hphpd> $repo = new \Facebook\ShipIt\ShipItRepoGIT('/tmp/gittest', 'master')
hphpd> $header = $repo->getNativeHeaderFromID('5ecc4b73aba8abb77f814a1fa0020e46e0327c53')
hphpd> $patch = $repo->getNativePatchFromID('5ecc4b73aba8abb77f814a1fa0020e46e0327c53')
hphpd> file_put_contents('tests/shipit/git-diffs/add-newline-at-eof.header', $header)
hphpd> file_put_contents('tests/shipit/git-diffs/add-newline-at-eof.patch', $patch)
```

Headers and patches are converted into "changesets" which are being filtered. They use many cool filters but we have to start with simple one: change the paths (GL => GH). After this they commit the changes (modified patches) into remote repository.

Important part of this process is this:

```text
fbshipit-source-id: 153d70b59ba8b5e9534134b1ad65e3e89ceb4d79
```

We are currently emulating it like this:

```text
git --no-pager filter-branch --subdirectory-filter src/apps/relay-example --msg-filter 'cat && echo "\nkiwicom-source-id: $GIT_COMMIT"' -- --all
```

This is a first step in order to be able to achieve this Shipit behavior. Later we have to stop filtering the branch and just start sending patches to our OSS repositories.

## Unanswered questions

- What happens when the GH repo is out of sync?
- How to modify patch paths from GL correctly?

# Importit part

Importit is basically reverse of Shipit except is much easier. Seems like they can import things back to upstream (GL for us) or import individual PR. They create patch (changesets respectively) while they apply reversed filters to much upstream paths.
