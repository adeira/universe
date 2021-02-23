// @flow

import { fbt } from 'fbt';
import React, { useState } from 'react';
import { graphql, createFragmentContainer, type FragmentContainerType } from '@adeira/relay';

import ProductForm, { type FormValues } from './form/ProductForm';
import type { EditProductFormFragment } from './__generated__/EditProductFormFragment.graphql';

type Props = {|
  +product: null | EditProductFormFragment,
|};

function EditProductForm(props: Props) {
  const [, setFiles] = useState(undefined);

  const productPrice = props.product?.price.unitAmount;
  const productVisibility = props.product?.visibility ?? [];

  const formInitialValues: FormValues = {
    name_en: '', // TODO
    name_es: '', // TODO
    description_en: '', // TODO
    description_es: '', // TODO
    price: productPrice != null ? productPrice / 100 : '',
    // $FlowIssue[incompatible-type]: https://github.com/facebook/flow/issues/1414
    visibility: productVisibility,
  };

  // TODO: use product revision

  return (
    <ProductForm
      submitButtonTitle={<fbt desc="edit product form submit button title">Save changes</fbt>}
      initialValues={formInitialValues}
      onUploadablesChange={(files) => setFiles(files)}
      onSubmit={() => {
        // TODO
      }}
    />
  );
}

export default (createFragmentContainer(EditProductForm, {
  product: graphql`
    fragment EditProductFormFragment on Product {
      # eslint-disable-next-line relay/unused-fields
      revision
      price {
        unitAmount
      }
      visibility
    }
  `,
}): FragmentContainerType<Props>);
