// @flow

import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import sx from '@adeira/sx';

import Layout from '../../src/Layout';

export default function ProductsCreatePage(): React.Node {
  const yupProductSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Product description is required'),
  });

  return (
    <Layout>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        validationSchema={yupProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // eslint-disable-next-line no-undef,no-alert
            alert(JSON.stringify(values, null, 2)); // TODO (graphql mutation)
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles('row')}>
              <label>
                Product name
                <Field type="text" name="name" />
                <ErrorMessage name="name" component={CustomErrorMessage} />
              </label>
            </div>

            <div className={styles('row')}>
              <label>
                Product description
                <Field type="text" name="description" as="textarea" />
                <ErrorMessage name="description" component={CustomErrorMessage} />
              </label>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Create
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
