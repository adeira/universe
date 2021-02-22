// @flow

import { invariant } from '@adeira/js';
import React, { useState, type Node } from 'react';
import { fbt } from 'fbt';
import { graphql, useMutation } from '@adeira/relay';
import { useSetRecoilState } from 'recoil';

import { uiStatusBarAtom } from '../recoil/uiStatusBarAtom';
import ProductForm, { type FormValues } from './form/ProductForm';
import type { CreateProductFormMutation } from './__generated__/CreateProductFormMutation.graphql';

export default function CreateProductForm(): Node {
  const [files, setFiles] = useState(undefined);
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);

  const [productCreate] = useMutation<CreateProductFormMutation>(graphql`
    mutation CreateProductFormMutation(
      $productImagesNames: [ProductImageUploadable!]!
      $productPriceUnitAmount: Int!
      $translations: [ProductMultilingualInputTranslations!]!
      $visibility: [ProductMultilingualInputVisibility!]!
    ) {
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
  `);

  const formInitialValues: FormValues = {
    name_en: '',
    name_es: '',
    description_en: '',
    description_es: '',
    price: '',
    visibility: ['POS'],
  };

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    const price = values.price;
    invariant(
      typeof price === 'number' && price > 0,
      'Product price should be at this point validated and higher than zero.',
    );

    productCreate({
      uploadables: files,
      variables: {
        productImagesNames: Array.from(files ?? []).map((file) => file.name),
        productPriceUnitAmount: price * 100, // adjusting for centavo
        translations: [
          {
            locale: 'en_US',
            name: values.name_en || null,
            description: values.description_en || null,
          },
          {
            locale: 'es_MX',
            name: values.name_es || null,
            description: values.description_es || null,
          },
        ],
        visibility: values.visibility,
      },
      onCompleted: ({ result }) => {
        setSubmitting(false);
        if (result.__typename === 'ProductError') {
          setStatusBar({ message: result.message, type: 'ERROR' });
        } else if (result.__typename === 'Product') {
          setStatusBar({
            message: (
              <>
                Product <strong>{result.name}</strong> created! ✅
              </>
            ),
            type: 'SUCCESS',
          });
          resetForm();
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
          type: 'ERROR',
        });
      },
    });
  };

  return (
    <ProductForm
      initialValues={formInitialValues}
      onUploadablesChange={(files) => setFiles(files)}
      onSubmit={handleFormSubmit}
    />
  );
}
