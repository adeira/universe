/**
 * @generated SignedSource<<36289ca98ac06f8a041c26a93b2ac9c0>>
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
declare export opaque type CatsTableCurrentFragment$fragmentType: FragmentType;
export type CatsTableCurrentFragment$ref = CatsTableCurrentFragment$fragmentType;
export type CatsTableCurrentFragment$data = {|
  +currentCats: $ReadOnlyArray<{|
    +order: number,
    +name: string,
    +dateOfCastration: ?string,
    +dateOfDeworming: ?string,
  |}>,
  +$fragmentType: CatsTableCurrentFragment$fragmentType,
|};
export type CatsTableCurrentFragment = CatsTableCurrentFragment$data;
export type CatsTableCurrentFragment$key = {
  +$data?: CatsTableCurrentFragment$data,
  +$fragmentSpreads: CatsTableCurrentFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
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

if (__DEV__) {
  (node/*: any*/).hash = "516ea0e99686f2972199dd02137dd22d";
}

module.exports = ((node/*: any*/)/*: Fragment<
  CatsTableCurrentFragment$fragmentType,
  CatsTableCurrentFragment$data,
>*/);
