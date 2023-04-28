---
title: High color contrast via CSS
tags: ['css']
---

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
