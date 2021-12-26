/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CatsTableCurrentFragment$ref: FragmentReference;
declare export opaque type CatsTableCurrentFragment$fragmentType: CatsTableCurrentFragment$ref;
export type CatsTableCurrentFragment = {|
  +currentCats: $ReadOnlyArray<{|
    +order: number,
    +name: string,
    +dateOfCastration: ?string,
    +dateOfDeworming: ?string,
  |}>,
  +$refType: CatsTableCurrentFragment$ref,
|};
export type CatsTableCurrentFragment$data = CatsTableCurrentFragment;
export type CatsTableCurrentFragment$key = {
  +$data?: CatsTableCurrentFragment$data,
  +$fragmentRefs: CatsTableCurrentFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CatsTableCurrentFragment",
  "selections": [
    {
      "alias": "currentCats",
      "args": [
        {
          "kind": "Literal",
          "name": "allCatsFilter",
          "value": {
            "adopted": false
          }
        }
      ],
      "concreteType": "CatInfo",
      "kind": "LinkedField",
      "name": "listAllCats",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "order",
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
          "name": "dateOfCastration",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfDeworming",
          "storageKey": null
        }
      ],
      "storageKey": "listAllCats(allCatsFilter:{\"adopted\":false})"
    }
  ],
  "type": "CatsQuery",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '516ea0e99686f2972199dd02137dd22d';
export default node;
