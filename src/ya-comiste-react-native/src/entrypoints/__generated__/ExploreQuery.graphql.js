/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type SDUISectionRendererFragment$ref = any;
export type ExploreQueryVariables = {|
  entrypointKey: string
|};
export type ExploreQueryResponse = {|
  +mobileEntrypointSections: $ReadOnlyArray<{|
    +$fragmentRefs: SDUISectionRendererFragment$ref
  |}>
|};
export type ExploreQuery = {|
  variables: ExploreQueryVariables,
  response: ExploreQueryResponse,
|};
*/


/*
query ExploreQuery(
  $entrypointKey: String!
) {
  mobileEntrypointSections(key: $entrypointKey) {
    ...SDUISectionRendererFragment
    id
  }
}

fragment SDUICardFragment on SDUICardComponent {
  entrypointKey
  title
}

fragment SDUIDescriptionFragment on SDUIDescriptionComponent {
  text
}

fragment SDUIJumbotronFragment on SDUIJumbotronComponent {
  title
}

fragment SDUIScrollViewHorizontalFragment on SDUIScrollViewHorizontalComponent {
  title
  cards {
    id
    ...SDUICardFragment
  }
}

fragment SDUISectionRendererFragment on SDUISection {
  id
  component(supported: ["SDUICardComponent", "SDUIDescriptionComponent", "SDUIJumbotronComponent", "SDUIScrollViewHorizontalComponent"]) {
    __typename
    ... on SDUICardComponent {
      __typename
      ...SDUICardFragment
    }
    ... on SDUIDescriptionComponent {
      __typename
      ...SDUIDescriptionFragment
    }
    ... on SDUIJumbotronComponent {
      __typename
      ...SDUIJumbotronFragment
    }
    ... on SDUIScrollViewHorizontalComponent {
      __typename
      ...SDUIScrollViewHorizontalFragment
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "entrypointKey"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "key",
    "variableName": "entrypointKey"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "entrypointKey",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExploreQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SDUISection",
        "kind": "LinkedField",
        "name": "mobileEntrypointSections",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SDUISectionRendererFragment"
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
    "name": "ExploreQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SDUISection",
        "kind": "LinkedField",
        "name": "mobileEntrypointSections",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "supported",
                "value": [
                  "SDUICardComponent",
                  "SDUIDescriptionComponent",
                  "SDUIJumbotronComponent",
                  "SDUIScrollViewHorizontalComponent"
                ]
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "component",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "type": "SDUICardComponent",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "text",
                    "storageKey": null
                  }
                ],
                "type": "SDUIDescriptionComponent",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/)
                ],
                "type": "SDUIJumbotronComponent",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SDUICardComponent",
                    "kind": "LinkedField",
                    "name": "cards",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "SDUIScrollViewHorizontalComponent",
                "abstractKey": null
              }
            ],
            "storageKey": "component(supported:[\"SDUICardComponent\",\"SDUIDescriptionComponent\",\"SDUIJumbotronComponent\",\"SDUIScrollViewHorizontalComponent\"])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b7cb01cd3a25228aac2c6799a52335e5",
    "id": null,
    "metadata": {},
    "name": "ExploreQuery",
    "operationKind": "query",
    "text": "query ExploreQuery(\n  $entrypointKey: String!\n) {\n  mobileEntrypointSections(key: $entrypointKey) {\n    ...SDUISectionRendererFragment\n    id\n  }\n}\n\nfragment SDUICardFragment on SDUICardComponent {\n  entrypointKey\n  title\n}\n\nfragment SDUIDescriptionFragment on SDUIDescriptionComponent {\n  text\n}\n\nfragment SDUIJumbotronFragment on SDUIJumbotronComponent {\n  title\n}\n\nfragment SDUIScrollViewHorizontalFragment on SDUIScrollViewHorizontalComponent {\n  title\n  cards {\n    id\n    ...SDUICardFragment\n  }\n}\n\nfragment SDUISectionRendererFragment on SDUISection {\n  id\n  component(supported: [\"SDUICardComponent\", \"SDUIDescriptionComponent\", \"SDUIJumbotronComponent\", \"SDUIScrollViewHorizontalComponent\"]) {\n    __typename\n    ... on SDUICardComponent {\n      __typename\n      ...SDUICardFragment\n    }\n    ... on SDUIDescriptionComponent {\n      __typename\n      ...SDUIDescriptionFragment\n    }\n    ... on SDUIJumbotronComponent {\n      __typename\n      ...SDUIJumbotronFragment\n    }\n    ... on SDUIScrollViewHorizontalComponent {\n      __typename\n      ...SDUIScrollViewHorizontalFragment\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '279bf4fcacf67a4b2436fea7080e80ca';

module.exports = node;
