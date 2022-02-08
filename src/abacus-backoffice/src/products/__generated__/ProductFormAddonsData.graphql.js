/**
 * @generated SignedSource<<f5c71526ef0dc641c6fb159c9c36becd>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ProductFormAddonsData$fragmentType: FragmentType;
export type ProductFormAddonsData$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +priceExtra: {|
    +unitAmount: number,
    +unitAmountCurrency: SupportedCurrency,
  |},
  +$fragmentType: ProductFormAddonsData$fragmentType,
|}>;
export type ProductFormAddonsData$key = $ReadOnlyArray<{
  +$data?: ProductFormAddonsData$data,
  +$fragmentSpreads: ProductFormAddonsData$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ProductFormAddonsData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "priceExtra",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitAmount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitAmountCurrency",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ProductAddon",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "e9018dac3479ec0c4cb9980f78d8a753";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductFormAddonsData$fragmentType,
  ProductFormAddonsData$data,
>*/);
