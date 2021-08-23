/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type ProductFormAddonsData$ref = any;
type ProductFormCategoriesData$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProductCreateFormData$ref: FragmentReference;
declare export opaque type ProductCreateFormData$fragmentType: ProductCreateFormData$ref;
export type ProductCreateFormData = {|
  +productCategories: $ReadOnlyArray<?{|
    +$fragmentRefs: ProductFormCategoriesData$ref
  |}>,
  +productAddons: $ReadOnlyArray<?{|
    +$fragmentRefs: ProductFormAddonsData$ref
  |}>,
  +$refType: ProductCreateFormData$ref,
|};
export type ProductCreateFormData$data = ProductCreateFormData;
export type ProductCreateFormData$key = {
  +$data?: ProductCreateFormData$data,
  +$fragmentRefs: ProductCreateFormData$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
  }
];
return {
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
      "args": (v0/*: any*/),
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
    },
    {
      "alias": "productAddons",
      "args": (v0/*: any*/),
      "concreteType": "ProductAddon",
      "kind": "LinkedField",
      "name": "searchAllProductAddons",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProductFormAddonsData"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceQuery",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'ff8090d2ca7b56d4e1f13870c0837098';
export default node;
