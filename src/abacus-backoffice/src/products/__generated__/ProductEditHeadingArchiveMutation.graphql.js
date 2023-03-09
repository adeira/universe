/**
 * @generated SignedSource<<9d748631a0a0e752e426e14b061a7492>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductEditHeadingArchiveMutation$variables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductEditHeadingArchiveMutation$data = {|
  +commerce: {|
    +productOrError: {|
      +__typename: "Product",
    |} | {|
      +__typename: "ProductError",
      +message: string,
    |} | {|
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      +__typename: "%other",
    |},
  |},
|};
export type ProductEditHeadingArchiveMutation = {|
  response: ProductEditHeadingArchiveMutation$data,
  variables: ProductEditHeadingArchiveMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "clientLocale"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productKey"
},
v2 = [
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
  },
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductEditHeadingArchiveMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommerceMutation",
        "kind": "LinkedField",
        "name": "commerce",
        "plural": false,
        "selections": [
          {
            "alias": "productOrError",
            "args": (v2/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productArchive",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "type": "ProductError",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProductEditHeadingArchiveMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommerceMutation",
        "kind": "LinkedField",
        "name": "commerce",
        "plural": false,
        "selections": [
          {
            "alias": "productOrError",
            "args": (v2/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productArchive",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/)
                ],
                "type": "ProductError",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a9a570524f0696df2aa0471d95192d38",
    "id": null,
    "metadata": {},
    "name": "ProductEditHeadingArchiveMutation",
    "operationKind": "mutation",
    "text": "mutation ProductEditHeadingArchiveMutation($productKey:ID!,$clientLocale:SupportedLocale!){commerce{productOrError:productArchive(productKey:$productKey,clientLocale:$clientLocale){__typename,...on Product{__typename,id},...on ProductError{__typename,message}}}}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "22797745c2fcdec81744a3a8632619e1";
}

module.exports = ((node/*: any*/)/*: Mutation<
  ProductEditHeadingArchiveMutation$variables,
  ProductEditHeadingArchiveMutation$data,
>*/);
