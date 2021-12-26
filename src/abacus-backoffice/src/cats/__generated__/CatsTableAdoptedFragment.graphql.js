/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CatsTableAdoptedFragment$ref: FragmentReference;
declare export opaque type CatsTableAdoptedFragment$fragmentType: CatsTableAdoptedFragment$ref;
export type CatsTableAdoptedFragment = {|
  +adoptedCats: $ReadOnlyArray<{|
    +order: number,
    +name: string,
    +dateOfCastration: ?string,
    +dateOfDeworming: ?string,
    +dateOfAdoption: ?string,
  |}>,
  +$refType: CatsTableAdoptedFragment$ref,
|};
export type CatsTableAdoptedFragment$data = CatsTableAdoptedFragment;
export type CatsTableAdoptedFragment$key = {
  +$data?: CatsTableAdoptedFragment$data,
  +$fragmentRefs: CatsTableAdoptedFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CatsTableAdoptedFragment",
  "selections": [
    {
      "alias": "adoptedCats",
      "args": [
        {
          "kind": "Literal",
          "name": "allCatsFilter",
          "value": {
            "adopted": true
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfAdoption",
          "storageKey": null
        }
      ],
      "storageKey": "listAllCats(allCatsFilter:{\"adopted\":true})"
    }
  ],
  "type": "CatsQuery",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '9c25db35b12efbb28dcd0e1aec208a4f';
export default node;
