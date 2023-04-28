---
title: 'Understanding `@@ -1,2 +3,4 @@` part of the Git diff'
tags: ['git']
---

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
