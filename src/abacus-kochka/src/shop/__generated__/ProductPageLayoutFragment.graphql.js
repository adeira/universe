/**
 * @generated SignedSource<<db002d5a5f61585c9dd2be98c6f294b6>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { ProductPageLayoutContentFragment$fragmentType } from "./ProductPageLayoutContentFragment.graphql";
import type { FragmentType } from "relay-runtime";
declare export opaque type ProductPageLayoutFragment$fragmentType: FragmentType;
export type ProductPageLayoutFragment$data = {|
  +commerce: {|
    +$fragmentSpreads: ProductPageLayoutContentFragment$fragmentType,
  |},
  +$fragmentType: ProductPageLayoutFragment$fragmentType,
|};
export type ProductPageLayoutFragment$key = {
  +$data?: ProductPageLayoutFragment$data,
  +$fragmentSpreads: ProductPageLayoutFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductPageLayoutFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceQuery",
      "kind": "LinkedField",
      "name": "commerce",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProductPageLayoutContentFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "f949ae6c4715149c94e7351e4561e1f2";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductPageLayoutFragment$fragmentType,
  ProductPageLayoutFragment$data,
>*/);
