---
title: How to split strings in JavaScript
tags: ['javascript']
---

```js
'I 💖 U'.split(' '); // ✅: [ 'I', '💖', 'U' ]
'I💖U'.split(''); // ❌: [ 'I', '�', '�', 'U' ]
```

Better alternatives:

```js
[...'I💖U'];
Array.from('I💖U');
'I💖U'.split(/(?=[\s\S])/u);
```

More info: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), [stackoverflow.com](https://stackoverflow.com/a/34717402/3135248)

Please note - it's still a bit more complicated. Read this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split#reversing_a_string_using_split
