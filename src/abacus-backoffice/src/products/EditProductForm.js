// @flow

import { invariant } from '@adeira/js';
import { fbt } from 'fbt';
import React, { useState, type Node } from 'react';
import { graphql, useFragment, useMutation } from '@adeira/relay';
import { useSetRecoilState } from 'recoil';

import ProductForm, { type FormValues } from './form/ProductForm';
import { uiStatusBarAtom } from '../recoil/uiStatusBarAtom';
import type { EditProductFormFragment$key } from './__generated__/EditProductFormFragment.graphql';
import type { EditProductFormMutation } from './__generated__/EditProductFormMutation.graphql';

type Props = {
  +product: ?EditProductFormFragment$key,
};

export default function EditProductForm(props: Props): Node {
  const [, setFiles] = useState(undefined);
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);

  const product = useFragment(
    graphql`
      fragment EditProductFormFragment on Product {
        key
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
    props.product,
  );

  const [productUpdate] = useMutation<EditProductFormMutation>(graphql`
    mutation EditProductFormMutation(
      $productKey: ID!
      $productRevision: ID!
      $productImagesNames: [ProductImageUploadable!]!
      $productPriceUnitAmount: Int!
      $translations: [ProductMultilingualInputTranslations!]!
      $visibility: [ProductMultilingualInputVisibility!]!
    ) {
      commerce {
        result: productUpdate(
          productKey: $productKey
          productRevision: $productRevision
          productMultilingualInput: {
            images: $productImagesNames
            price: { unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN }
            translations: $translations
            visibility: $visibility
          }
        ) {
          ... on Product {
            __typename
            id
            name
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
          ... on ProductError {
            __typename
            message
          }
        }
      }
    }
  `);

  const getProductValues = (product): FormValues => {
    // TODO: move to the server (?)
    const en = product?.translations.find((t) => t.locale === 'en_US') ?? {};
    const es = product?.translations.find((t) => t.locale === 'es_MX') ?? {};

    const productPrice = product?.price.unitAmount;
    const productVisibility = product?.visibility ?? [];

    return {
      name_en: en.name,
      name_es: es.name,
      description_en: en.description ?? '',
      description_es: es.description ?? '',
      price: productPrice != null ? productPrice / 100 : '',
      // $FlowIssue[incompatible-return]: https://github.com/facebook/flow/issues/1414
      visibility: productVisibility,
    };
  };

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    const price = values.price;
    invariant(
      typeof price === 'number' && price > 0,
      'Product price should be at this point validated and higher than zero.',
    );

    const files = undefined; // TODO!

    productUpdate({
      uploadables: files,
      variables: {
        productKey: product?.key ?? '',
        productRevision: product?.revision ?? '',
        productImagesNames: Array.from(files ?? []).map((file) => file.name),
        productPriceUnitAmount: price * 100, // adjusting for centavo
        translations: [
          {
            locale: 'en_US',
            name: values.name_en,
            description: values.description_en || null,
          },
          {
            locale: 'es_MX',
            name: values.name_es,
            description: values.description_es || null,
          },
        ],
        visibility: values.visibility,
      },
      onCompleted: ({ commerce: { result } }) => {
        setSubmitting(false);
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
                (rev:{' '}
                <fbt:param name="product revision">
                  <code>{result.revision}</code>
                </fbt:param>) updated! ✅
              </fbt>
            ),
            type: 'success',
          });
          resetForm({
            values: getProductValues(result),
          });
          setFiles(undefined);
        }
      },
      onError: () => {
        setSubmitting(false);
        setStatusBar({
          message: fbt(
            'Something unexpected happened and server could not process the request! 🙈',
            'generic failure message after creating a product',
          ),
          type: 'error',
        });
      },
    });
  };

  return (
    <ProductForm
      submitButtonTitle={<fbt desc="edit product form submit button title">Save changes</fbt>}
      initialValues={getProductValues(product)}
      onUploadablesChange={(files) => setFiles(files)}
      onSubmit={handleFormSubmit}
    />
  );
}
