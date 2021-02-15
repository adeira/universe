// @flow

import { fbt } from 'fbt';
import * as Yup from 'yup';

export default function createProductFormSchema(): $FlowFixMe {
  Yup.addMethod(Yup.string, 'requiredIf', function (fieldName, message) {
    return this.test('requiredIf', message, function (value, context) {
      const { path, createError, parent } = context;
      const anyHasValue = parent[fieldName] != null && parent[fieldName] !== '';

      // returns `CreateError` current value is empty and no value is found
      // returns `false` if current value is not empty and one other field is not empty.
      return !value && !anyHasValue ? createError({ path, message }) : true;
    });
  });

  return Yup.object().shape({
    name_en: Yup.string()
      .nullable()
      // $FlowExpectedError[prop-missing] custom method
      .requiredIf(
        'name_es',
        fbt(
          'At least one product name version (english or spanish) is required',
          'EN name form field validation message',
        ),
      ),
    name_es: Yup.string()
      .nullable()
      // $FlowExpectedError[prop-missing] custom method
      .requiredIf(
        'name_en',
        fbt(
          'At least one product name version (english or spanish) is required',
          'ES name form field validation message',
        ),
      ),
    description_en: Yup.string().nullable(),
    description_es: Yup.string().nullable(),
    price: Yup.number()
      .nullable()
      // $FlowExpectedError[incompatible-call] YUP expects string and not FBTString
      .required(fbt('Product price is a required field', 'price form field validation message'))
      .positive(
        // $FlowExpectedError[incompatible-call] YUP expects string and not FBTString
        fbt('Product price must be a positive number', 'price form field validation message'),
      ),
    // images: Yup.mixed().required(
    //   fbt('Product image is a required field', 'image form field validation message'),
    // ),
  });
}
