/**
 * @generated SignedSource<<cf8c779bfe1a09ba84a5386d8e7b5800>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler-experimental
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type LocationListItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type LocationsList$ref: FragmentReference;
declare export opaque type LocationsList$fragmentType: LocationsList$ref;
export type LocationsList = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +id: string,
      +$fragmentRefs: LocationListItem$ref,
    |},
  |}>,
  +$refType: LocationsList$ref,
|};
export type LocationsList$data = LocationsList;
export type LocationsList$key = {
  +$data?: LocationsList$data,
  +$fragmentRefs: LocationsList$ref,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationsList",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Location",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "LocationListItem"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "LocationConnection",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "41e58f9d458466b240d3a17bde2d7e12";
}

module.exports = node;
