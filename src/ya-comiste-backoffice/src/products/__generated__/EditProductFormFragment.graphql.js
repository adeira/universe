/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type EditProductFormFragment$ref: FragmentReference;
declare export opaque type EditProductFormFragment$fragmentType: EditProductFormFragment$ref;
export type EditProductFormFragment = {|
  +revision: string,
  +price: {|
    +unitAmount: number
  |},
  +visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
  +$refType: EditProductFormFragment$ref,
|};
export type EditProductFormFragment$data = EditProductFormFragment;
export type EditProductFormFragment$key = {
  +$data?: EditProductFormFragment$data,
  +$fragmentRefs: EditProductFormFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditProductFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "revision",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ProductPrice",
      "kind": "LinkedField",
      "name": "price",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitAmount",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibility",
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '9b1bbeeaa7f32755390176edc11223c6';
export default node;
