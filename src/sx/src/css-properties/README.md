```text
yarn monorepo-babel-node src/sx/src/css-properties/generateFlowTypes.js
```

First, we get all the _unprefixed_ CSS properties from W3 and later we try to resolve the property values from `mdn/data` package. The correct way how to improve the generated files is to update MDN data (or improve our generator in case of some unsupported syntaxes).

## Sources of data

- https://www.w3.org/Style/CSS/all-properties.en.json (https://www.w3.org/Style/CSS/all-properties.en.html)
- https://github.com/mdn/data (https://github.com/mdn/data/blob/master/css/syntaxes.md, https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax)
