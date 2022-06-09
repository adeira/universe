/**
 * @generated SignedSource<<e02cb757a24ee520df2f4b7c46348086>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ProductFormAddonsData$fragmentType = any;
type ProductFormCategoriesData$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type ProductCreateFormData$fragmentType: FragmentType;
export type ProductCreateFormData$data = {|
  +productAddons: $ReadOnlyArray<?{|
    +$fragmentSpreads: ProductFormAddonsData$fragmentType,
  |}>,
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

var node/*: ReaderFragment*/ = (function(){
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

if (__DEV__) {
  (node/*: any*/).hash = "ff8090d2ca7b56d4e1f13870c0837098";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductCreateFormData$fragmentType,
  ProductCreateFormData$data,
>*/);
