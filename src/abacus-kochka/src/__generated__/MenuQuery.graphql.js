/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type MenuSectionCoffee$ref = any;
type MenuSectionDumplingSavory$ref = any;
type MenuSectionDumplingSweet$ref = any;
type MenuSectionMilkshake$ref = any;
type MenuSectionSpecialities$ref = any;
type MenuSectionTea$ref = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type MenuQueryVariables = {|
  clientLocale: SupportedLocale
|};
export type MenuQueryResponse = {|
  +menu: {|
    +$fragmentRefs: MenuSectionCoffee$ref & MenuSectionTea$ref & MenuSectionMilkshake$ref & MenuSectionSpecialities$ref & MenuSectionDumplingSweet$ref & MenuSectionDumplingSavory$ref
  |}
|};
export type MenuQuery = {|
  variables: MenuQueryVariables,
  response: MenuQueryResponse,
|};

/*
query MenuQuery(
  $clientLocale: SupportedLocale!
) {
  menu {
    ...MenuSectionCoffee
    ...MenuSectionTea
    ...MenuSectionMilkshake
    ...MenuSectionSpecialities
    ...MenuSectionDumplingSweet
    ...MenuSectionDumplingSavory
  }
}

fragment MenuRow on Product {
  name
  description
  price {
    unitAmount
    unitAmountCurrency
  }
}

fragment MenuSectionCoffee on MenuQuery {
  coffeeMenu: menu(clientLocale: $clientLocale, section: COFFEE) {
    id
    ...MenuRow
  }
}

fragment MenuSectionDumplingSavory on MenuQuery {
  dumplingSavoryMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SAVORY) {
    id
    ...MenuRow
  }
}

fragment MenuSectionDumplingSweet on MenuQuery {
  sumplingSweetMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SWEET) {
    id
    ...MenuRow
  }
}

fragment MenuSectionMilkshake on MenuQuery {
  milkshakesMenu: menu(clientLocale: $clientLocale, section: MILKSHAKES) {
    id
    ...MenuRow
  }
}

fragment MenuSectionSpecialities on MenuQuery {
  specialitiesMenu: menu(clientLocale: $clientLocale, section: SPECIALITIES) {
    id
    ...MenuRow
  }
}

fragment MenuSectionTea on MenuQuery {
  teaMenu: menu(clientLocale: $clientLocale, section: TEA) {
    id
    ...MenuRow
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
            "name": "MenuSectionDumplingSweet"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuSectionDumplingSavory"
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
            "alias": "sumplingSweetMenu",
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
            "alias": "dumplingSavoryMenu",
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
    "cacheID": "baaaa2457d3fda06a1576904cb071b96",
    "id": null,
    "metadata": {},
    "name": "MenuQuery",
    "operationKind": "query",
    "text": "query MenuQuery(\n  $clientLocale: SupportedLocale!\n) {\n  menu {\n    ...MenuSectionCoffee\n    ...MenuSectionTea\n    ...MenuSectionMilkshake\n    ...MenuSectionSpecialities\n    ...MenuSectionDumplingSweet\n    ...MenuSectionDumplingSavory\n  }\n}\n\nfragment MenuRow on Product {\n  name\n  description\n  price {\n    unitAmount\n    unitAmountCurrency\n  }\n}\n\nfragment MenuSectionCoffee on MenuQuery {\n  coffeeMenu: menu(clientLocale: $clientLocale, section: COFFEE) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionDumplingSavory on MenuQuery {\n  dumplingSavoryMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SAVORY) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionDumplingSweet on MenuQuery {\n  sumplingSweetMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SWEET) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionMilkshake on MenuQuery {\n  milkshakesMenu: menu(clientLocale: $clientLocale, section: MILKSHAKES) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionSpecialities on MenuQuery {\n  specialitiesMenu: menu(clientLocale: $clientLocale, section: SPECIALITIES) {\n    id\n    ...MenuRow\n  }\n}\n\nfragment MenuSectionTea on MenuQuery {\n  teaMenu: menu(clientLocale: $clientLocale, section: TEA) {\n    id\n    ...MenuRow\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '41eac31bba01248a16eee54ae635805f';
export default node;
