```text
yarn monorepo-babel-node src/sx/src/css-properties/generateFlowTypes.js
```

We get all the _unprefixed_ CSS properties `mdn/data` package. The correct way how to improve the generated files is to update MDN data (or improve our generator in case of some unsupported syntaxes).

## Sources of data

- https://github.com/mdn/data
- https://github.com/mdn/data/blob/master/css/syntaxes.md
- https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax

Additional sources:

- https://www.w3.org/Style/CSS/all-properties.en.json
- https://www.w3.org/Style/CSS/all-properties.en.html
