/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductAddonsQueryVariables = {|
  clientLocale: SupportedLocale
|};
export type ProductAddonsQueryResponse = {|
  +commerce: {|
    +productAddons: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +priceExtra: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
    |}>
  |}
|};
export type ProductAddonsQuery = {|
  variables: ProductAddonsQueryVariables,
  response: ProductAddonsQueryResponse,
|};

/*
query ProductAddonsQuery(
  $clientLocale: SupportedLocale!
) {
  commerce {
    productAddons: searchAllProductAddons(clientLocale: $clientLocale) {
      id
      name
      priceExtra {
        unitAmount
        unitAmountCurrency
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
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
    "cacheID": "41b11e8aafe6429cd12f908d53e9e3b7",
    "id": null,
    "metadata": {},
    "name": "ProductAddonsQuery",
    "operationKind": "query",
    "text": "query ProductAddonsQuery(\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    productAddons: searchAllProductAddons(clientLocale: $clientLocale) {\n      id\n      name\n      priceExtra {\n        unitAmount\n        unitAmountCurrency\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'b7b1f1b709c3e56f2a3a999bf3f03cdb';
export default node;
