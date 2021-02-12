// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { graphql, useMutation } from '@adeira/relay';
import { useState } from 'react';

import Layout from '../../src/Layout';
import createProductFormSchema from '../../src/products/createProductFormSchema';
import type { createProductCreateMutation } from './__generated__/createProductCreateMutation.graphql';

export default function ProductsCreatePage(): React.Node {
  const [files, setFiles] = useState();
  const [statusBarMessage, setStatusBarMessage] = useState(null);

  const [productCreate] = useMutation<createProductCreateMutation>(graphql`
    mutation createProductCreateMutation(
      $productImagesNames: [ProductImageUploadable!]!
      $productPriceUnitAmount: Int!
      $translations: [ProductMultilingualInputTranslations!]!
    ) {
      productCreate(
        productMultilingualInput: {
          images: $productImagesNames
          price: { unitAmount: $productPriceUnitAmount }
          translations: $translations
        }
      ) {
        ... on Product {
          __typename
        }
        ... on ProductError {
          __typename
          message
        }
      }
    }
  `);

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    productCreate({
      uploadables: files,
      variables: {
        productImagesNames: ['TODO'], // TODO
        productPriceUnitAmount: values.price,
        translations: [
          {
            locale: 'en_US',
            name: values.name_en,
            description: values.description_en,
          },
          {
            locale: 'es_MX',
            name: values.name_es,
            description: values.description_es,
          },
        ],
      },
      onCompleted: ({ productCreate }) => {
        if (productCreate.__typename === 'ProductError') {
          setStatusBarMessage(productCreate.message);
          setSubmitting(false);
        } else {
          setStatusBarMessage(fbt('All good! ✅', 'success message after creating a product'));
          resetForm();
        }
      },
      onError: () => {
        setStatusBarMessage(
          fbt(
            'Something unexpected happened and server could not process the request! 🙈',
            'generic failure message after creating a product',
          ),
        );
        setSubmitting(false);
      },
    });
  };

  const formInitialValues = {
    name_en: null,
    name_es: null,
    description_en: null,
    description_es: null,
    price: null,
  };

  return (
    <Layout>
      {/* TODO: extract this into some global status bar for the whole application */}
      {statusBarMessage != null ? (
        <div className={styles('statusBar')}>{statusBarMessage}</div>
      ) : null}

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
  statusBar: {
    backgroundColor: 'orange',
  },
});
