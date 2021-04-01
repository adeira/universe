/**
 * @generated SignedSource<<ba8e8fc67410c1e65becf754f1a648c8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ProductFormCategoriesData$fragmentType: FragmentType;
export type ProductFormCategoriesData$ref = ProductFormCategoriesData$fragmentType;
export type ProductFormCategoriesData$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +$fragmentType: ProductFormCategoriesData$fragmentType,
|}>;
export type ProductFormCategoriesData = ProductFormCategoriesData$data;
export type ProductFormCategoriesData$key = $ReadOnlyArray<{
  +$data?: ProductFormCategoriesData$data,
  +$fragmentSpreads: ProductFormCategoriesData$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ProductFormCategoriesData",
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
    }
  ],
  "type": "ProductCategory",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "c60bf51d24be138f3f671ef64bb967d1";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductFormCategoriesData$fragmentType,
  ProductFormCategoriesData$data,
>*/);
