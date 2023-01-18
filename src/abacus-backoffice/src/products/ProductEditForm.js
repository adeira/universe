// @flow

import React, { type Node } from 'react';
import { fbt } from 'fbt';
import { graphql, useFragment } from '@adeira/relay';
import { useFlashMessages, FlashMessageTint } from '@adeira/sx-design';
import { FormSubmit } from '@adeira/forms';

import ProductForm from './ProductForm';
import useApplicationLocale from '../useApplicationLocale';
import type { ProductEditFormData$key } from './__generated__/ProductEditFormData.graphql';
import type { ProductEditFormMutation$variables } from './__generated__/ProductEditFormMutation.graphql';

type Props = {
  +product: ProductEditFormData$key,
  +imagesToDelete: $ReadOnlyArray<string>,
};

export default function ProductEditForm(props: Props): Node {
  const applicationLocale = useApplicationLocale();
  const [displayFleshMessage] = useFlashMessages();

  const data = useFragment(
    graphql`
      fragment ProductEditFormData on Product {
        key
        revision
        availableCategories(clientLocale: $clientLocale) {
          ...ProductFormCategoriesData
        }
        price {
          unitAmount
        }
        selectedCategories(clientLocale: $clientLocale) {
          id
        }
        visibility
        enTranslation: translation(locale: en_US) {
          name
          description
        }
        esTranslation: translation(locale: es_MX) {
          name
          description
        }
        images {
          name
        }
      }
    `,
    props.product,
  );

  return (
    <ProductForm
      // $FlowFixMe[incompatible-type]: https://github.com/facebook/relay/issues/2545
      availableCategories={data.availableCategories}
      selectedCategories={data.selectedCategories.reduce((acc: Array<string>, category) => {
        if (category != null) {
          acc.push(category.id);
        }
        return acc;
      }, [])}
      name_en={data.enTranslation?.name}
      name_es={data.esTranslation?.name}
      description_en={data.enTranslation?.description}
      description_es={data.esTranslation?.description}
      price={
        data.price.unitAmount != null
          ? data.price.unitAmount / 100 // adjusted for centavo
          : 0
      }
      visibility={
        // $FlowFixMe[incompatible-type]:
        data.visibility
      }
      button={
        <FormSubmit
          mutation={graphql`
            mutation ProductEditFormMutation(
              $clientLocale: SupportedLocale!
              $productKey: ID!
              $productRevision: ID!
              $productImagesNames: [ProductImageUploadable!]!
              $productPriceUnitAmount: Int!
              $translations: [ProductMultilingualInputTranslations!]!
              $visibility: [ProductMultilingualInputVisibility!]!
              $categories: [ID!]!
            ) {
              commerce {
                result: productUpdate(
                  clientLocale: $clientLocale
                  productKey: $productKey
                  productRevision: $productRevision
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
                    id
                    name
                    revision
                    ...ProductEditFormData
                  }
                  ... on ProductError {
                    __typename
                    message
                  }
                }
              }
            }
          `}
          variables={(formValues): ProductEditFormMutation$variables => ({
            clientLocale: applicationLocale.graphql,
            productKey: data.key,
            productRevision: data.revision,
            productImagesNames: data.images
              .filter((image) => {
                // we skip images that should be deleted so server can handle it appropriately
                return props.imagesToDelete.includes(image.name) === false;
              })
              .map((image) => image.name)
              .concat(formValues.images),
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
              displayFleshMessage(
                <fbt desc="product updated success message">
                  Product{' '}
                  <fbt:param name="product name">
                    <strong>{result.name}</strong>
                  </fbt:param>{' '}
                  updated! ✅
                </fbt>,
                { tint: FlashMessageTint.Success },
              );
            }
          }}
        >
          <fbt desc="edit product form submit button title">Save changes</fbt>
        </FormSubmit>
      }
    />
  );
}
