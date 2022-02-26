/**
 * @generated SignedSource<<44912aeead8fce43aae27f0dba8c7de9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type MenuSectionCiabattas$fragmentType = any;
type MenuSectionCoffee$fragmentType = any;
type MenuSectionKochkadas$fragmentType = any;
type MenuSectionOthers$fragmentType = any;
type MenuSectionSpecialities$fragmentType = any;
type MenuSectionTea$fragmentType = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type MenuQuery$variables = {|
  clientLocale: SupportedLocale,
|};
export type MenuQuery$data = {|
  +menu: {|
    +$fragmentSpreads: MenuSectionCoffee$fragmentType & MenuSectionTea$fragmentType & MenuSectionSpecialities$fragmentType & MenuSectionOthers$fragmentType & MenuSectionKochkadas$fragmentType & MenuSectionCiabattas$fragmentType,
  |},
|};
export type MenuQuery = {|
  variables: MenuQuery$variables,
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
            "name": "MenuSectionSpecialities"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionOthers"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionKochkadas"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionCiabattas"
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
            "alias": "othersMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "OTHERS"
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
            "alias": "kochkadasMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "KOCHKADAS"
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
            "alias": "ciabattasMenu",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "section",
                "value": "CIABATTAS"
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
    "cacheID": "06a1abba789aea54bdd8b95c900fc8ce",
    "id": null,
    "metadata": {},
    "name": "MenuQuery",
    "operationKind": "query",
    "text": "query MenuQuery(\n  $clientLocale: SupportedLocale!\n) {\n  menu {\n    ...MenuSectionCoffee\n    ...MenuSectionTea\n    ...MenuSectionSpecialities\n    ...MenuSectionOthers\n    ...MenuSectionKochkadas\n    ...MenuSectionCiabattas\n  }\n}\n\nfragment MenuRow on Product {\n  name\n  description\n  price {\n    unitAmount\n    unitAmountCurrency\n  }\n}\n\nfragment MenuSectionCiabattas on MenuQuery {\n  ciabattasMenu: menu(clientLocale: $clientLocale, section: CIABATTAS) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionCoffee on MenuQuery {\n  coffeeMenu: menu(clientLocale: $clientLocale, section: COFFEE) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionKochkadas on MenuQuery {\n  kochkadasMenu: menu(clientLocale: $clientLocale, section: KOCHKADAS) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionOthers on MenuQuery {\n  othersMenu: menu(clientLocale: $clientLocale, section: OTHERS) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionSpecialities on MenuQuery {\n  specialitiesMenu: menu(clientLocale: $clientLocale, section: SPECIALITIES) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionTea on MenuQuery {\n  teaMenu: menu(clientLocale: $clientLocale, section: TEA) {\n    id\n    ...MenuRow\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "3ff31fb1abea8c770e7133bae7f9c138";
}

module.exports = ((node/*: any*/)/*: Query<
  MenuQuery$variables,
  MenuQuery$data,
>*/);
