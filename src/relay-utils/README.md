This package contains relay utility functions used in the Adeira ecosystem. 

## Install

```
yarn add @adeira/relay-utils
```

## Usage

### getDataFromRequest

- This function retrieves data from the relay store based on the request: 

```js
import { getDataFromRequest } from '@adeira/relay-utils';

const data = getDataFromRequest({ query: props.query, variables: props.variables }, environment);
```


