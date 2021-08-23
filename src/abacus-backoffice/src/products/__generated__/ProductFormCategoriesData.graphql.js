/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProductFormCategoriesData$ref: FragmentReference;
declare export opaque type ProductFormCategoriesData$fragmentType: ProductFormCategoriesData$ref;
export type ProductFormCategoriesData = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +$refType: ProductFormCategoriesData$ref,
|}>;
export type ProductFormCategoriesData$data = ProductFormCategoriesData;
export type ProductFormCategoriesData$key = $ReadOnlyArray<{
  +$data?: ProductFormCategoriesData$data,
  +$fragmentRefs: ProductFormCategoriesData$ref,
  ...
}>;


const node: ReaderFragment = {
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
// prettier-ignore
(node: any).hash = 'c60bf51d24be138f3f671ef64bb967d1';
export default node;
