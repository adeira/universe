// @flow

import { fbt } from 'fbt';
import * as Yup from 'yup';

/**
 * To simplify things, product must have filled names in all languages and it must have a price.
 * Rest of the fields is optional but the product cannot be activated before all the fields are
 * filled.
 */
export default function createProductFormSchema(): $FlowFixMe {
  return Yup.object().shape({
    name_en: Yup.string().required(
      // $FlowExpectedError[incompatible-call] YUP expects string and not FBTString
      fbt('English product name version is required', 'english name form field validation message'),
    ),
    name_es: Yup.string().required(
      // $FlowExpectedError[incompatible-call] YUP expects string and not FBTString
      fbt('Spanish product name version is required', 'spanish name form field validation message'),
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
