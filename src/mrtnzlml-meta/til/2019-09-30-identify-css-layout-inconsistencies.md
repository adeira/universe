---
title: How to easily identify inconsistencies in your CSS layout
tags: ['css']
---

<!-- prettier-ignore-start -->
```css
* { outline: 1px solid rgba(255,0,0,.2); :hover { outline: 1px solid rgba(255,0,0,0.6); } }
* * { outline: 1px solid rgba(0,255,0,.2); :hover { outline: 1px solid rgba(0,255,0,0.6); } }
* * * { outline: 1px solid rgba(0,0,255,.2); :hover { outline: 1px solid rgba(0,0,255,0.6); } }
* * * * { outline: 1px solid rgba(255,0,255,.2); :hover { outline: 1px solid rgba(255,0,0,0.6); } }
* * * * * { outline: 1px solid rgba(0,255,255,.2); :hover { outline: 1px solid rgba(0,255,0,0.6); } }
* * * * * * { outline: 1px solid rgba(255,255,0,.2); :hover { outline: 1px solid rgba(0,0,255,0.6); } }
* * * * * * * { outline: 1px solid rgba(255,0,0,.2); :hover { outline: 1px solid rgba(255,0,0,0.6); } }
* * * * * * * * { outline: 1px solid rgba(0,255,0,.2); :hover { outline: 1px solid rgba(0,255,0,0.6); } }
* * * * * * * * * { outline: 1px solid rgba(0,0,255,.2); :hover { outline: 1px solid rgba(0,0,255,0.6); } }
```
<!-- prettier-ignore-end -->

> Different depth of nodes will use different colour allowing you to see the size of each element on the page, their margin and their padding. Now you can easily identify inconsistencies.

Source: https://dev.to/gajus/my-favorite-css-hack-32g3
