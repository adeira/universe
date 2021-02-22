// @flow

import React, { useState } from 'react';
import { graphql, createFragmentContainer, type FragmentContainerType } from '@adeira/relay';

import ProductForm, { type FormValues } from './form/ProductForm';
import type { EditProductFormFragment } from './__generated__/EditProductFormFragment.graphql';

type Props = {|
  +product: null | EditProductFormFragment,
|};

function EditProductForm(props: Props) {
  const [, setFiles] = useState(undefined);

  // TODO
  const formInitialValues: FormValues = {
    name_en: '',
    name_es: '',
    description_en: '',
    description_es: '',
    price: props.product?.price.unitAmount ?? '',
    visibility: ['POS'],
  };

  return (
    <ProductForm
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
      price {
        unitAmount
      }
    }
  `,
}): FragmentContainerType<Props>);
