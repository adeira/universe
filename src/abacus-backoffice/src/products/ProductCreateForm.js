// @flow

import React, { type Node } from 'react';
import { fbt } from 'fbt';
import { graphql, useFragment } from '@adeira/relay';
import { useFlashMessages, FlashMessageTint } from '@adeira/sx-design';
import { useRouter } from 'next/router';
import { FormSubmit } from '@adeira/forms';

import useApplicationLocale from '../useApplicationLocale';
import ProductForm from './ProductForm';
import type { ProductCreateFormData$key } from './__generated__/ProductCreateFormData.graphql';
import type { ProductCreateFormMutation$variables } from './__generated__/ProductCreateFormMutation.graphql';

type Props = {
  +commerceData: ProductCreateFormData$key,
};

export default function ProductCreateForm(props: Props): Node {
  const applicationLocale = useApplicationLocale();
  const router = useRouter();
  const [displayFleshMessage] = useFlashMessages();

  const data = useFragment(
    graphql`
      fragment ProductCreateFormData on CommerceQuery {
        productCategories: searchAllProductCategories(clientLocale: $clientLocale) {
          ...ProductFormCategoriesData
        }
      }
    `,
    props.commerceData,
  );

  return (
    <ProductForm
      // $FlowFixMe[incompatible-type]: https://github.com/facebook/relay/issues/2545
      availableCategories={data.productCategories}
      selectedCategories={[]}
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
                    addons: [] # TODO (currently unused)
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
          variables={(formValues): ProductCreateFormMutation$variables => ({
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
          })}
          onCompleted={({ commerce: { result } }) => {
            if (result.__typename === 'ProductError') {
              displayFleshMessage(result.message, { tint: FlashMessageTint.Error });
            } else if (result.__typename === 'Product') {
              router.push('/products');
              displayFleshMessage(
                <fbt desc="product created success message">
                  Product{' '}
                  <fbt:param name="product name">
                    <strong>{result.name}</strong>
                  </fbt:param>{' '}
                  created! ✅
                </fbt>,
                { tint: FlashMessageTint.Success },
              );
            }
          }}
        >
          <fbt desc="create product form submit button title">Create a new product</fbt>
        </FormSubmit>
      }
    />
  );
}
