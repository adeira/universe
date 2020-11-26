/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type EntrypointRendererFragment$ref = any;
export type ExploreDetailQueryVariables = {|
  entrypointID: string
|};
export type ExploreDetailQueryResponse = {|
  +entrypoint: ?{|
    +$fragmentRefs: EntrypointRendererFragment$ref
  |}
|};
export type ExploreDetailQuery = {|
  variables: ExploreDetailQueryVariables,
  response: ExploreDetailQueryResponse,
|};
*/


/*
query ExploreDetailQuery(
  $entrypointID: String!
) {
  entrypoint(id: $entrypointID) {
    ...EntrypointRendererFragment
  }
}

fragment BlockRendererFragment on EntrypointBlock {
  block(supported: ["Card", "Description", "Jumbotron", "ScrollViewHorizontal"]) {
    __typename
    ... on CardBlock {
      __typename
      ...CardFragment
    }
    ... on DescriptionBlock {
      __typename
      ...DescriptionFragment
    }
    ... on JumbotronBlock {
      __typename
      ...JumbotronFragment
    }
    ... on ScrollViewHorizontalBlock {
      __typename
      ...ScrollViewHorizontalFragment
    }
  }
}

fragment BlockRendererFragment_1oSDhm on EntrypointBlock {
  block(supported: ["Card", "Description", "Jumbotron", "ScrollViewHorizontal"]) {
    __typename
    ... on CardBlock {
      __typename
      ...CardFragment
    }
    ... on DescriptionBlock {
      __typename
      ...DescriptionFragment
    }
    ... on JumbotronBlock {
      __typename
      ...JumbotronFragment
    }
    ... on ScrollViewHorizontalBlock {
      __typename
    }
  }
}

fragment CardFragment on CardBlock {
  pageID
}

fragment DescriptionFragment on DescriptionBlock {
  text
}

fragment EntrypointRendererFragment on Entrypoint {
  blocks {
    id
    ...BlockRendererFragment
  }
}

fragment JumbotronFragment on JumbotronBlock {
  title
}

fragment ScrollViewHorizontalFragment on ScrollViewHorizontalBlock {
  title
  blocks {
    id
    ...BlockRendererFragment_1oSDhm
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "entrypointID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "entrypointID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "supported",
    "value": [
      "Card",
      "Description",
      "Jumbotron",
      "ScrollViewHorizontal"
    ]
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pageID",
      "storageKey": null
    }
  ],
  "type": "CardBlock",
  "abstractKey": null
},
v6 = {
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
  "type": "DescriptionBlock",
  "abstractKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    (v7/*: any*/)
  ],
  "type": "JumbotronBlock",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExploreDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Entrypoint",
        "kind": "LinkedField",
        "name": "entrypoint",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EntrypointRendererFragment"
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
    "name": "ExploreDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Entrypoint",
        "kind": "LinkedField",
        "name": "entrypoint",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EntrypointBlock",
            "kind": "LinkedField",
            "name": "blocks",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": null,
                "kind": "LinkedField",
                "name": "block",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v8/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EntrypointBlock",
                        "kind": "LinkedField",
                        "name": "blocks",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "block",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v5/*: any*/),
                              (v6/*: any*/),
                              (v8/*: any*/)
                            ],
                            "storageKey": "block(supported:[\"Card\",\"Description\",\"Jumbotron\",\"ScrollViewHorizontal\"])"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "ScrollViewHorizontalBlock",
                    "abstractKey": null
                  }
                ],
                "storageKey": "block(supported:[\"Card\",\"Description\",\"Jumbotron\",\"ScrollViewHorizontal\"])"
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
    "cacheID": "f6296aa45cdc8e26e42626af4d6c0aca",
    "id": null,
    "metadata": {},
    "name": "ExploreDetailQuery",
    "operationKind": "query",
    "text": "query ExploreDetailQuery(\n  $entrypointID: String!\n) {\n  entrypoint(id: $entrypointID) {\n    ...EntrypointRendererFragment\n  }\n}\n\nfragment BlockRendererFragment on EntrypointBlock {\n  block(supported: [\"Card\", \"Description\", \"Jumbotron\", \"ScrollViewHorizontal\"]) {\n    __typename\n    ... on CardBlock {\n      __typename\n      ...CardFragment\n    }\n    ... on DescriptionBlock {\n      __typename\n      ...DescriptionFragment\n    }\n    ... on JumbotronBlock {\n      __typename\n      ...JumbotronFragment\n    }\n    ... on ScrollViewHorizontalBlock {\n      __typename\n      ...ScrollViewHorizontalFragment\n    }\n  }\n}\n\nfragment BlockRendererFragment_1oSDhm on EntrypointBlock {\n  block(supported: [\"Card\", \"Description\", \"Jumbotron\", \"ScrollViewHorizontal\"]) {\n    __typename\n    ... on CardBlock {\n      __typename\n      ...CardFragment\n    }\n    ... on DescriptionBlock {\n      __typename\n      ...DescriptionFragment\n    }\n    ... on JumbotronBlock {\n      __typename\n      ...JumbotronFragment\n    }\n    ... on ScrollViewHorizontalBlock {\n      __typename\n    }\n  }\n}\n\nfragment CardFragment on CardBlock {\n  pageID\n}\n\nfragment DescriptionFragment on DescriptionBlock {\n  text\n}\n\nfragment EntrypointRendererFragment on Entrypoint {\n  blocks {\n    id\n    ...BlockRendererFragment\n  }\n}\n\nfragment JumbotronFragment on JumbotronBlock {\n  title\n}\n\nfragment ScrollViewHorizontalFragment on ScrollViewHorizontalBlock {\n  title\n  blocks {\n    id\n    ...BlockRendererFragment_1oSDhm\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b3b1c5358adfa71af1d9c2b899f032c4';

module.exports = node;
