/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type CardFragment$ref = any;
type DescriptionFragment$ref = any;
type JumbotronFragment$ref = any;
type ScrollViewHorizontalFragment$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type BlockRendererFragment$ref: FragmentReference;
declare export opaque type BlockRendererFragment$fragmentType: BlockRendererFragment$ref;
export type BlockRendererFragment = {|
  +block: ?({|
    +__typename: "CardBlock",
    +$fragmentRefs: CardFragment$ref,
  |} | {|
    +__typename: "DescriptionBlock",
    +$fragmentRefs: DescriptionFragment$ref,
  |} | {|
    +__typename: "JumbotronBlock",
    +$fragmentRefs: JumbotronFragment$ref,
  |} | {|
    +__typename: "ScrollViewHorizontalBlock",
    +$fragmentRefs: ScrollViewHorizontalFragment$ref,
  |} | {|
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    +__typename: "%other"
  |}),
  +$refType: BlockRendererFragment$ref,
|};
export type BlockRendererFragment$data = BlockRendererFragment;
export type BlockRendererFragment$key = {
  +$data?: BlockRendererFragment$data,
  +$fragmentRefs: BlockRendererFragment$ref,
  ...
};
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
  "argumentDefinitions": [
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "allowRecursion"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "BlockRendererFragment",
  "selections": [
    {
      "alias": null,
      "args": [
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "block",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CardFragment"
            }
          ],
          "type": "CardBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DescriptionFragment"
            }
          ],
          "type": "DescriptionBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "JumbotronFragment"
            }
          ],
          "type": "JumbotronBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "condition": "allowRecursion",
              "kind": "Condition",
              "passingValue": true,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ScrollViewHorizontalFragment"
                }
              ]
            }
          ],
          "type": "ScrollViewHorizontalBlock",
          "abstractKey": null
        }
      ],
      "storageKey": "block(supported:[\"Card\",\"Description\",\"Jumbotron\",\"ScrollViewHorizontal\"])"
    }
  ],
  "type": "EntrypointBlock",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b3a869ee43eb7159c2b4920bf2bfa395';

module.exports = node;
