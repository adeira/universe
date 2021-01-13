// @flow

import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import sx from '@adeira/sx';

export default function ProductsCreatePage(): React.Node {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Product name is required';
        }
        if (!values.description) {
          errors.description = 'Product description is required';
        }
        return errors;
      }}
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
