/**
 * @generated SignedSource<<313f429764b1db964fb9b0861284aa27>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { ProductFormCategoriesData$fragmentType } from "./ProductFormCategoriesData.graphql";
import type { FragmentType } from "relay-runtime";
declare export opaque type ProductCreateFormData$fragmentType: FragmentType;
export type ProductCreateFormData$data = {|
  +productCategories: $ReadOnlyArray<?{|
    +$fragmentSpreads: ProductFormCategoriesData$fragmentType,
  |}>,
  +$fragmentType: ProductCreateFormData$fragmentType,
|};
export type ProductCreateFormData$key = {
  +$data?: ProductCreateFormData$data,
  +$fragmentSpreads: ProductCreateFormData$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "clientLocale"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductCreateFormData",
  "selections": [
    {
      "alias": "productCategories",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        }
      ],
      "concreteType": "ProductCategory",
      "kind": "LinkedField",
      "name": "searchAllProductCategories",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProductFormCategoriesData"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceQuery",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "bbfce75012a833b5ee776c3aac48e58a";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductCreateFormData$fragmentType,
  ProductCreateFormData$data,
>*/);
