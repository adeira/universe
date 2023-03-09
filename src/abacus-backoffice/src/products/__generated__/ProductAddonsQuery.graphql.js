/**
 * @generated SignedSource<<0753c77cc059608f22ccbc690f2e4485>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductAddonsQuery$variables = {|
  clientLocale: SupportedLocale,
|};
export type ProductAddonsQuery$data = {|
  +commerce: {|
    +productAddons: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +priceExtra: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
    |}>,
  |},
|};
export type ProductAddonsQuery = {|
  response: ProductAddonsQuery$data,
  variables: ProductAddonsQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clientLocale"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CommerceQuery",
    "kind": "LinkedField",
    "name": "commerce",
    "plural": false,
    "selections": [
      {
        "alias": "productAddons",
        "args": [
          {
            "kind": "Variable",
            "name": "clientLocale",
            "variableName": "clientLocale"
          }
        ],
        "concreteType": "ProductAddon",
        "kind": "LinkedField",
        "name": "searchAllProductAddons",
        "plural": true,
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Price",
            "kind": "LinkedField",
            "name": "priceExtra",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitAmount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitAmountCurrency",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductAddonsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductAddonsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "43218007fd29f4e7fa8dc58a05e777b1",
    "id": null,
    "metadata": {},
    "name": "ProductAddonsQuery",
    "operationKind": "query",
    "text": "query ProductAddonsQuery($clientLocale:SupportedLocale!){commerce{productAddons:searchAllProductAddons(clientLocale:$clientLocale){id,name,priceExtra{unitAmount,unitAmountCurrency}}}}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "b7b1f1b709c3e56f2a3a999bf3f03cdb";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductAddonsQuery$variables,
  ProductAddonsQuery$data,
>*/);
