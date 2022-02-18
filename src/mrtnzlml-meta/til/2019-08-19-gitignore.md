---
title: Gitignore
tags: ['git']
---

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
