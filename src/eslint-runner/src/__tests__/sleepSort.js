// @flow strict

// https://twitter.com/JavaScriptDaily/status/856267407106682880 😇
[3, 5, 1, 8, 2, 4, 9, 6, 7].forEach((num) => {
  setTimeout(() => console.log(num), num);
});
