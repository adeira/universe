// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { Kbd, Heading } from '@adeira/sx-design';
import { fbt } from 'fbt';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { graphql, useMutation } from '@adeira/relay';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import Layout from '../../src/Layout';
import createProductFormSchema from '../../src/products/createProductFormSchema';
import { uiStatusBarMessageAtom } from '../../src/recoil/uiStatusBarMessageAtom';
import type { createProductCreateMutation } from './__generated__/createProductCreateMutation.graphql';

export default function ProductsCreatePage(): React.Node {
  const [files, setFiles] = useState();
  const setStatusBarMessage = useSetRecoilState(uiStatusBarMessageAtom);

  const [productCreate] = useMutation<createProductCreateMutation>(graphql`
    mutation createProductCreateMutation(
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

  const formInitialValues = {
    name_en: '',
    name_es: '',
    description_en: '',
    description_es: '',
    price: '',
    visibility: ['POS'],
  };

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    productCreate({
      uploadables: files,
      variables: {
        productImagesNames: ['TODO'], // TODO
        productPriceUnitAmount: values.price * 100, // adjusting for centavo
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
          setStatusBarMessage(result.message);
        } else if (result.__typename === 'Product') {
          setStatusBarMessage(
            <>
              Product <strong>{result.name}</strong> created!
            </>,
          );
          resetForm();
        }
      },
      onError: () => {
        setSubmitting(false);
        setStatusBarMessage(
          fbt(
            'Something unexpected happened and server could not process the request! 🙈',
            'generic failure message after creating a product',
          ),
        );
      },
    });
  };

  return (
    <Layout heading={<Heading>Create a new product</Heading>}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={createProductFormSchema()}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles('row')}>
              <label>
                <fbt desc="form field name for product name in english">Product name (English)</fbt>
                <Field type="text" name="name_en" />
                <ErrorMessage name="name_en" component={CustomErrorMessage} />
              </label>
            </div>

            <div className={styles('row')}>
              <label>
                <fbt desc="form field name for product name in spanish">Product name (Spanish)</fbt>
                <Field type="text" name="name_es" />
                <ErrorMessage name="name_es" component={CustomErrorMessage} />
              </label>
            </div>

            <div className={styles('row')}>
              <label>
                <fbt desc="form field name for product description in english">
                  Product description (English)
                </fbt>
                <Field type="text" name="description_en" as="textarea" />
                <ErrorMessage name="description_en" component={CustomErrorMessage} />
              </label>
            </div>

            <div className={styles('row')}>
              <label>
                <fbt desc="form field name for product description in spanish">
                  Product description (Spanish)
                </fbt>
                <Field type="text" name="description_es" as="textarea" />
                <ErrorMessage name="description_es" component={CustomErrorMessage} />
              </label>
            </div>

            <div className={styles('row')}>
              <label>
                <fbt desc="form field name for product price">Price (MXN)</fbt>
                <Field type="number" name="price" />
                <ErrorMessage name="price" component={CustomErrorMessage} />
              </label>
            </div>

            <div className={styles('row')}>
              <label>
                <fbt desc="form field name for product pictures">Product pictures</fbt>
                <Field
                  type="file"
                  name="images"
                  multiple={true}
                  accept="image/jpeg,image/png"
                  onChange={({ target }) => setFiles(target.files)}
                />
              </label>
            </div>

            <div className={styles('row')}>
              <label>
                Visibility (use <Kbd code="SHIFT" /> or <Kbd code="CTRL" /> to select more)
                <Field name="visibility" as="select" multiple={true} size={2}>
                  <option value="POS">Visible in POS</option>
                  <option value="ESHOP">Visible in eshop (public!)</option>
                </Field>
              </label>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Create a new product
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

function CustomErrorMessage({ children }) {
  return <div className={styles('error')}>{children}</div>;
}

const styles = sx.create({
  row: {
    marginBottom: 5,
  },
  error: {
    color: 'red',
  },
});
