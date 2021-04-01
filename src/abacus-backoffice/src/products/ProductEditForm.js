// @flow

import React, { type Node } from 'react';
import { useSetRecoilState } from 'recoil';
import { graphql, useFragment } from '@adeira/relay';
import { fbt } from 'fbt';

import FormSubmit from '../forms/FormSubmit';
import { uiStatusBarAtom } from '../recoil/uiStatusBarAtom';
import useApplicationLocale from '../useApplicationLocale';
import type { ProductEditFormData$key } from './__generated__/ProductEditFormData.graphql';
import type { ProductEditFormMutation$variables } from './__generated__/ProductEditFormMutation.graphql';
import ProductForm from './ProductForm';

type Props = {
  +product: ProductEditFormData$key,
  +imagesToDelete: $ReadOnlyArray<string>,
};

export default function ProductEditForm(props: Props): Node {
  const applicationLocale = useApplicationLocale();
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);

  const data = useFragment(
    graphql`
      fragment ProductEditFormData on Product {
        key
        revision
        availableCategories(clientLocale: $clientLocale) {
          ...ProductFormCategoriesData
        }
        availableAddons(clientLocale: $clientLocale) {
          ...ProductFormAddonsData
        }
        price {
          unitAmount
        }
        selectedCategories(clientLocale: $clientLocale) {
          id
        }
        selectedAddons(clientLocale: $clientLocale) {
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
      // $FlowFixMe[incompatible-type]: https://github.com/facebook/relay/issues/2545
      availableAddons={data.availableAddons}
      selectedCategories={data.selectedCategories.reduce((acc, category) => {
        if (category != null) {
          acc.push(category.id);
        }
        return acc;
      }, [])}
      selectedAddons={data.selectedAddons.reduce((acc, addon) => {
        if (addon != null) {
          acc.push(addon.id);
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
              $addons: [ID!]!
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
                    addons: $addons
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
            addons: formValues.addons,
          })}
          onCompleted={({ commerce: { result } }) => {
            if (result.__typename === 'ProductError') {
              setStatusBar({ message: result.message, type: 'error' });
            } else if (result.__typename === 'Product') {
              setStatusBar({
                message: (
                  <fbt desc="product updated success message">
                    Product{' '}
                    <fbt:param name="product name">
                      <strong>{result.name}</strong>
                    </fbt:param>{' '}
                    updated! ✅
                  </fbt>
                ),
                type: 'success',
              });
            }
          }}
        >
          <fbt desc="edit product form submit button title">Save changes</fbt>
        </FormSubmit>
      }
    />
  );
}
