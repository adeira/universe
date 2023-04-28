---
title: CSS selectors
tags: ['css']
---

https://gist.github.com/magicznyleszek/809a69dd05e1d5f12d01

```css
/* Present: selects .foo elements with bar attribute present, regardless of its value */
.foo[bar] {
  fum: baz;
}

/* Exact: selects .foo elements where the bar attribute has the exact value of fum */
.foo[bar='fum'] {
  baz: qux;
}

/* Whitespace separated: selects .foo elements with bar attribute values contain specified partial value of fum (whitespace separated) */
.foo[bar~='fum'] {
  baz: qux;
}

/* Hyphen separated: selects .foo elements with bar attribute values contain specified partial value of fum immediately followed by hyphen (-) character */
.foo[bar|='fum'] {
  baz: qux;
}

/* Begins with: selects .foo elements where the bar attribute begins with fum */
.foo[bar^='fum'] {
  baz: qux;
}

/* Ends with: selects .foo elements where the bar attribute ends with fum */
.foo[bar$='fum'] {
  baz: qux;
}

/* Containts: selects .foo elements where the bar attribute contains string fum followed and preceded by any number of other characters */
.foo[bar*='fum'] {
  baz: qux;
}
```
