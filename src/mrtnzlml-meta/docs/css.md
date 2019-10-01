---
id: css
title: CSS
sidebar_label: CSS
---

<!-- prettier-ignore-start -->
```css
* { background-color: rgba(255,0,0,.2); }
* * { background-color: rgba(0,255,0,.2); }
* * * { background-color: rgba(0,0,255,.2); }
* * * * { background-color: rgba(255,0,255,.2); }
* * * * * { background-color: rgba(0,255,255,.2); }
* * * * * * { background-color: rgba(255,255,0,.2); }
* * * * * * * { background-color: rgba(255,0,0,.2); }
* * * * * * * * { background-color: rgba(0,255,0,.2); }
* * * * * * * * * { background-color: rgba(0,0,255,.2); }
```
<!-- prettier-ignore-end -->

Source: https://dev.to/gajus/my-favorite-css-hack-32g3

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
