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

  // TODO: move to the server (?)
  const en = props.product?.translations.find((t) => t.locale === 'en_US') ?? {};
  const es = props.product?.translations.find((t) => t.locale === 'es_MX') ?? {};

  const productPrice = props.product?.price.unitAmount;
  const productVisibility = props.product?.visibility ?? [];

  const formInitialValues: FormValues = {
    name_en: en.name,
    name_es: es.name,
    description_en: en.description ?? '',
    description_es: es.description ?? '',
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
      translations {
        locale
        name
        description
      }
    }
  `,
}): FragmentContainerType<Props>);
