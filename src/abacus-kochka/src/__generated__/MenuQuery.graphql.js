/**
 * @generated SignedSource<<fdfbb6f596754e44d5b0d799fead664a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type MenuSectionCoffee$fragmentType = any;
type MenuSectionKochkadaSavory$fragmentType = any;
type MenuSectionKochkadaSweet$fragmentType = any;
type MenuSectionMilkshake$fragmentType = any;
type MenuSectionSpecialities$fragmentType = any;
type MenuSectionTea$fragmentType = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type MenuQuery$variables = {|
  clientLocale: SupportedLocale,
|};
export type MenuQueryVariables = MenuQuery$variables;
export type MenuQuery$data = {|
  +menu: {|
    +$fragmentSpreads: MenuSectionCoffee$fragmentType & MenuSectionTea$fragmentType & MenuSectionMilkshake$fragmentType & MenuSectionSpecialities$fragmentType & MenuSectionKochkadaSweet$fragmentType & MenuSectionKochkadaSavory$fragmentType,
  |},
|};
export type MenuQueryResponse = MenuQuery$data;
export type MenuQuery = {|
  variables: MenuQueryVariables,
  response: MenuQuery$data,
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
v1 = {
  "kind": "Variable",
  "name": "clientLocale",
  "variableName": "clientLocale"
},
v2 = [
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
    "kind": "ScalarField",
    "name": "description",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Price",
    "kind": "LinkedField",
    "name": "price",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MenuQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MenuQuery",
        "kind": "LinkedField",
        "name": "menu",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionCoffee"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionTea"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionMilkshake"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionSpecialities"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionKochkadaSweet"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionKochkadaSavory"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MenuQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MenuQuery",
        "kind": "LinkedField",
        "name": "menu",
        "plural": false,
        "selections": [
          {
            "alias": "coffeeMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "COFFEE"
              }
            ],
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "menu",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": "teaMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "TEA"
              }
            ],
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "menu",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": "milkshakesMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "MILKSHAKES"
              }
            ],
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "menu",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": "specialitiesMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "SPECIALITIES"
              }
            ],
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "menu",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": "kochkadaSweetMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "DUMPLING_SWEET"
              }
            ],
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "menu",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": "kochkadaSavoryMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "DUMPLING_SAVORY"
              }
            ],
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "menu",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a6ee8495f72444f2211149b20993468b",
    "id": null,
    "metadata": {},
    "name": "MenuQuery",
    "operationKind": "query",
    "text": "query MenuQuery(\n  $clientLocale: SupportedLocale!\n) {\n  menu {\n    ...MenuSectionCoffee\n    ...MenuSectionTea\n    ...MenuSectionMilkshake\n    ...MenuSectionSpecialities\n    ...MenuSectionKochkadaSweet\n    ...MenuSectionKochkadaSavory\n  }\n}\n\nfragment MenuRow on Product {\n  name\n  description\n  price {\n    unitAmount\n    unitAmountCurrency\n  }\n}\n\nfragment MenuSectionCoffee on MenuQuery {\n  coffeeMenu: menu(clientLocale: $clientLocale, section: COFFEE) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionKochkadaSavory on MenuQuery {\n  kochkadaSavoryMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SAVORY) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionKochkadaSweet on MenuQuery {\n  kochkadaSweetMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SWEET) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionMilkshake on MenuQuery {\n  milkshakesMenu: menu(clientLocale: $clientLocale, section: MILKSHAKES) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionSpecialities on MenuQuery {\n  specialitiesMenu: menu(clientLocale: $clientLocale, section: SPECIALITIES) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionTea on MenuQuery {\n  teaMenu: menu(clientLocale: $clientLocale, section: TEA) {\n    id\n    ...MenuRow\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "fe5ebd8591713ee5370319d526a77ebd";
}

module.exports = ((node/*: any*/)/*: Query<
  MenuQuery$variables,
  MenuQuery$data,
>*/);
