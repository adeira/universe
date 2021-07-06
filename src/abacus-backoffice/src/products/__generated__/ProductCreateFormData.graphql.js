/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type ProductFormData$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProductCreateFormData$ref: FragmentReference;
declare export opaque type ProductCreateFormData$fragmentType: ProductCreateFormData$ref;
export type ProductCreateFormData = {|
  +productCategories: $ReadOnlyArray<?{|
    +$fragmentRefs: ProductFormData$ref
  |}>,
  +$refType: ProductCreateFormData$ref,
|};
export type ProductCreateFormData$data = ProductCreateFormData;
export type ProductCreateFormData$key = {
  +$data?: ProductCreateFormData$data,
  +$fragmentRefs: ProductCreateFormData$ref,
  ...
};


const node: ReaderFragment = {
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
          "name": "ProductFormData"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceQuery",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '4494521b6094a173fda7c029ceb3d519';
export default node;
