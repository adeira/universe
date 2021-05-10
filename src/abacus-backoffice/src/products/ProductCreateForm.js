// @flow

import { useRouter } from 'next/router';
import React, { type Node } from 'react';
import { fbt } from 'fbt';
import { graphql } from '@adeira/relay';
import { useSetRecoilState } from 'recoil';

import FormSubmit from '../forms/FormSubmit';
import { uiStatusBarAtom } from '../recoil/uiStatusBarAtom';
import ProductForm from './ProductForm';
import type { ProductCreateFormMutationVariables } from './__generated__/ProductCreateFormMutation.graphql';

export default function ProductCreateForm(): Node {
  const router = useRouter();
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);

  return (
    <ProductForm
      name_en={''}
      name_es={''}
      description_en={''}
      description_es={''}
      price={0}
      visibility={['POS']}
      button={
        <FormSubmit
          mutation={graphql`
            mutation ProductCreateFormMutation(
              $productImagesNames: [ProductImageUploadable!]!
              $productPriceUnitAmount: Int!
              $translations: [ProductMultilingualInputTranslations!]!
              $visibility: [ProductMultilingualInputVisibility!]!
            ) {
              commerce {
                result: productCreate(
                  productMultilingualInput: {
                    images: $productImagesNames
                    price: { unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN }
                    translations: $translations
                    visibility: $visibility
                  }
                ) {
                  ... on Product {
                    __typename
                    name
                  }
                  ... on ProductError {
                    __typename
                    message
                  }
                }
              }
            }
          `}
          variables={(formValues): ProductCreateFormMutationVariables => ({
            productImagesNames: formValues.images,
            productPriceUnitAmount: formValues.price * 100, // adjusted for centavo
            translations: [
              {
                locale: 'en_US',
                name: formValues.name_en,
                description: formValues.description_en || null,
              },
              {
                locale: 'es_MX',
                name: formValues.name_es,
                description: formValues.description_es || null,
              },
            ],
            visibility: formValues.visibility,
          })}
          onCompleted={({ commerce: { result } }) => {
            if (result.__typename === 'ProductError') {
              setStatusBar({ message: result.message, type: 'error' });
            } else if (result.__typename === 'Product') {
              router.push('/products');
              setStatusBar({
                message: (
                  <fbt desc="product created success message">
                    Product{' '}
                    <fbt:param name="product name">
                      <strong>{result.name}</strong>
                    </fbt:param>{' '}
                    created! ✅
                  </fbt>
                ),
                type: 'success',
              });
            }
          }}
        >
          <fbt desc="create product form submit button title">Create a new product</fbt>
        </FormSubmit>
      }
    />
  );
}
