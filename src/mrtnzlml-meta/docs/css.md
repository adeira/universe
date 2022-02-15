---
id: css
title: CSS
sidebar_label: CSS
---

## High color contrast via CSS

See: https://css-tricks.com/css-variables-calc-rgb-enforcing-high-contrast-colors/

```css
:root {
  --red: 28;
  --green: 150;
  --blue: 130;

  --accessible-color: calc(
    ((((var(--red) * 299) + (var(--green) * 587) + (var(--blue) * 114)) / 1000) - 128) * -1000
  );
}

.button {
  color: rgb(var(--accessible-color), var(--accessible-color), var(--accessible-color));
  background-color: rgb(var(--red), var(--green), var(--blue));
}
```

## REM units

```css
html {
  font-size: 6.25%; /* =1px */
  /* Since most browsers have a default value of 16px. Alternatively, people quite often
     use 62.5% instead and adjust children REM units accordingly. */
}
body {
  font-size: 14rem; /* =14px */
}
h1 {
  font-size: 24rem; /* =24px */
}
```

Default HTML font size: https://stackoverflow.com/questions/24542508/default-html-font-size

Even better approach: https://css-tricks.com/rems-ems/

## CSS selectors

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
