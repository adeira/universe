// @flow

import { useRouter } from 'next/router';
import React, { type Node } from 'react';
import { fbt } from 'fbt';
import { graphql, useFragment } from '@adeira/relay';
import { useSetRecoilState } from 'recoil';

import FormSubmit from '../forms/FormSubmit';
import { uiStatusBarAtom } from '../recoil/uiStatusBarAtom';
import useApplicationLocale from '../useApplicationLocale';
import ProductForm from './ProductForm';
import type { ProductCreateFormData$key } from './__generated__/ProductCreateFormData.graphql';
import type { ProductCreateFormMutationVariables } from './__generated__/ProductCreateFormMutation.graphql';

type Props = {
  +commerceData: ProductCreateFormData$key,
};

export default function ProductCreateForm(props: Props): Node {
  const applicationLocale = useApplicationLocale();
  const router = useRouter();
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);

  const data = useFragment<ProductCreateFormData$key>(
    graphql`
      fragment ProductCreateFormData on CommerceQuery {
        productCategories: searchAllProductCategories(clientLocale: $clientLocale) {
          ...ProductFormCategoriesData
        }
        productAddons: searchAllProductAddons(clientLocale: $clientLocale) {
          ...ProductFormAddonsData
        }
      }
    `,
    props.commerceData,
  );

  return (
    <ProductForm
      // $FlowFixMe[incompatible-type]: https://github.com/facebook/relay/issues/2545
      availableCategories={data.productCategories}
      // $FlowFixMe[incompatible-type]: https://github.com/facebook/relay/issues/2545
      availableAddons={data.productAddons}
      selectedCategories={[]}
      selectedAddons={[]}
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
              $clientLocale: SupportedLocale!
              $productImagesNames: [ProductImageUploadable!]!
              $productPriceUnitAmount: Int!
              $translations: [ProductMultilingualInputTranslations!]!
              $visibility: [ProductMultilingualInputVisibility!]!
              $categories: [ID!]!
              $addons: [ID!]!
            ) {
              commerce {
                result: productCreate(
                  clientLocale: $clientLocale
                  productMultilingualInput: {
                    images: $productImagesNames
                    price: { unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN }
                    translations: $translations
                    visibility: $visibility
                    categories: $categories
                    addons: $addons
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
            clientLocale: applicationLocale.graphql,
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
            categories: [formValues.category],
            addons: formValues.addons,
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
