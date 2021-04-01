/**
 * @generated SignedSource<<ec32ff1144430f9937e0839b535a75da>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type CatsTableAdoptedFragment$fragmentType: FragmentType;
export type CatsTableAdoptedFragment$ref = CatsTableAdoptedFragment$fragmentType;
export type CatsTableAdoptedFragment$data = {|
  +adoptedCats: $ReadOnlyArray<{|
    +order: number,
    +name: string,
    +dateOfCastration: ?string,
    +dateOfDeworming: ?string,
    +dateOfAdoption: ?string,
  |}>,
  +$fragmentType: CatsTableAdoptedFragment$fragmentType,
|};
export type CatsTableAdoptedFragment = CatsTableAdoptedFragment$data;
export type CatsTableAdoptedFragment$key = {
  +$data?: CatsTableAdoptedFragment$data,
  +$fragmentSpreads: CatsTableAdoptedFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
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

if (__DEV__) {
  (node/*: any*/).hash = "9c25db35b12efbb28dcd0e1aec208a4f";
}

module.exports = ((node/*: any*/)/*: Fragment<
  CatsTableAdoptedFragment$fragmentType,
  CatsTableAdoptedFragment$data,
>*/);
