/**
 * @flow
 */

/* eslint-disable */

import type { ReaderInlineDataFragment } from 'relay-runtime';
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type EditProductFormData$ref: FragmentReference;
declare export opaque type EditProductFormData$fragmentType: EditProductFormData$ref;
export type EditProductFormData = {|
  +key: string,
  +revision: string,
  +price: {|
    +unitAmount: number
  |},
  +visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
  +enTranslation: ?{|
    +name: string,
    +description: ?string,
  |},
  +esTranslation: ?{|
    +name: string,
    +description: ?string,
  |},
  +$refType: EditProductFormData$ref,
|};
export type EditProductFormData$data = EditProductFormData;
export type EditProductFormData$key = {
  +$data?: EditProductFormData$data,
  +$fragmentRefs: EditProductFormData$ref,
  ...
};


const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "EditProductFormData"
};
// prettier-ignore
(node: any).hash = '8c0e440f6b44a60293382bea1c9d5d91';
export default node;
