// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { fbt } from 'fbt';
import { Kbd } from '@adeira/sx-design';

import createProductFormSchema from '../createProductFormSchema';
import CustomErrorMessage from './CustomErrorMessage';

export type FormValues = {
  +name_en: string,
  +name_es: string,
  +description_en: string,
  +description_es: string,
  +price: string | number,
  +visibility: $ReadOnlyArray<'POS' | 'ESHOP'>,
};

// https://formik.org/docs/api/withFormik#the-formikbag
type FormikBag = {
  +resetForm: ({ +values: FormValues } | void) => void,
  +setSubmitting: (boolean) => void,
};

type Props = {
  +submitButtonTitle: FbtWithoutString,
  +initialValues: FormValues,
  +onUploadablesChange: (FileList) => void,
  +onSubmit: (FormValues, FormikBag) => void,
};

// TODO: https://formik.org/docs/tutorial#reducing-boilerplate
export default function ProductForm(props: Props): Node {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={createProductFormSchema()}
      onSubmit={props.onSubmit}
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
                onChange={({ target }) => props.onUploadablesChange(target.files)}
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
            {props.submitButtonTitle}
          </button>
        </Form>
      )}
    </Formik>
  );
}

const styles = sx.create({
  row: {
    marginBottom: 5,
  },
});
