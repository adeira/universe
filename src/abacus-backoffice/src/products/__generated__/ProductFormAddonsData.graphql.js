/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProductFormAddonsData$ref: FragmentReference;
declare export opaque type ProductFormAddonsData$fragmentType: ProductFormAddonsData$ref;
export type ProductFormAddonsData = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +priceExtra: {|
    +unitAmount: number,
    +unitAmountCurrency: SupportedCurrency,
  |},
  +$refType: ProductFormAddonsData$ref,
|}>;
export type ProductFormAddonsData$data = ProductFormAddonsData;
export type ProductFormAddonsData$key = $ReadOnlyArray<{
  +$data?: ProductFormAddonsData$data,
  +$fragmentRefs: ProductFormAddonsData$ref,
  ...
}>;


const node: ReaderFragment = {
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
// prettier-ignore
(node: any).hash = 'e9018dac3479ec0c4cb9980f78d8a753';
export default node;
