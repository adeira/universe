/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type EditProductFormFragment$ref: FragmentReference;
declare export opaque type EditProductFormFragment$fragmentType: EditProductFormFragment$ref;
export type EditProductFormFragment = {|
  +price: {|
    +unitAmount: number
  |},
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
    }
  ],
  "type": "Product",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '53231412314e3cbb7bf4baa93487c424';
export default node;
