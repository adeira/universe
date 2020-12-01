/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type SDUICardFragment$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type SDUIScrollViewHorizontalFragment$ref: FragmentReference;
declare export opaque type SDUIScrollViewHorizontalFragment$fragmentType: SDUIScrollViewHorizontalFragment$ref;
export type SDUIScrollViewHorizontalFragment = {|
  +title: string,
  +cards: ?$ReadOnlyArray<?{|
    +id: string,
    +$fragmentRefs: SDUICardFragment$ref,
  |}>,
  +$refType: SDUIScrollViewHorizontalFragment$ref,
|};
export type SDUIScrollViewHorizontalFragment$data = SDUIScrollViewHorizontalFragment;
export type SDUIScrollViewHorizontalFragment$key = {
  +$data?: SDUIScrollViewHorizontalFragment$data,
  +$fragmentRefs: SDUIScrollViewHorizontalFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SDUIScrollViewHorizontalFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SDUICardComponent",
      "kind": "LinkedField",
      "name": "cards",
      "plural": true,
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
          "name": "SDUICardFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SDUIScrollViewHorizontalComponent",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'ed6cbda2f5f8676288d1a6e2831c1827';

module.exports = node;
