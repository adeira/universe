/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type SDUICardFragment$ref = any;
type SDUIDescriptionFragment$ref = any;
type SDUIJumbotronFragment$ref = any;
type SDUIScrollViewHorizontalFragment$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type SDUISectionRendererFragment$ref: FragmentReference;
declare export opaque type SDUISectionRendererFragment$fragmentType: SDUISectionRendererFragment$ref;
export type SDUISectionRendererFragment = $ReadOnlyArray<{|
  +id: string,
  +component: ?({|
    +__typename: "SDUICardComponent",
    +$fragmentRefs: SDUICardFragment$ref,
  |} | {|
    +__typename: "SDUIDescriptionComponent",
    +$fragmentRefs: SDUIDescriptionFragment$ref,
  |} | {|
    +__typename: "SDUIJumbotronComponent",
    +$fragmentRefs: SDUIJumbotronFragment$ref,
  |} | {|
    +__typename: "SDUIScrollViewHorizontalComponent",
    +$fragmentRefs: SDUIScrollViewHorizontalFragment$ref,
  |} | {|
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    +__typename: "%other"
  |}),
  +$refType: SDUISectionRendererFragment$ref,
|}>;
export type SDUISectionRendererFragment$data = SDUISectionRendererFragment;
export type SDUISectionRendererFragment$key = $ReadOnlyArray<{
  +$data?: SDUISectionRendererFragment$data,
  +$fragmentRefs: SDUISectionRendererFragment$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "SDUISectionRendererFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SDUICardFragment"
            }
          ],
          "type": "SDUICardComponent",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SDUIDescriptionFragment"
            }
          ],
          "type": "SDUIDescriptionComponent",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SDUIJumbotronFragment"
            }
          ],
          "type": "SDUIJumbotronComponent",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SDUIScrollViewHorizontalFragment"
            }
          ],
          "type": "SDUIScrollViewHorizontalComponent",
          "abstractKey": null
        }
      ],
      "storageKey": "component(supported:[\"SDUICardComponent\",\"SDUIDescriptionComponent\",\"SDUIJumbotronComponent\",\"SDUIScrollViewHorizontalComponent\"])"
    }
  ],
  "type": "SDUISection",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'eae6d1cfad7867e79eaaf5a79f1404f3';

module.exports = node;
