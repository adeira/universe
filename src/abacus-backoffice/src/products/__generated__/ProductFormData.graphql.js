/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProductFormData$ref: FragmentReference;
declare export opaque type ProductFormData$fragmentType: ProductFormData$ref;
export type ProductFormData = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +$refType: ProductFormData$ref,
|}>;
export type ProductFormData$data = ProductFormData;
export type ProductFormData$key = $ReadOnlyArray<{
  +$data?: ProductFormData$data,
  +$fragmentRefs: ProductFormData$ref,
  ...
}>;


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ProductFormData",
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
(node: any).hash = 'ab1f207eecd3d9a7196b6448110a997e';
export default node;
