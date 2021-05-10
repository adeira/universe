// @flow

import { Kbd } from '@adeira/sx-design';
import { fbt } from 'fbt';
import * as React from 'react';

import Form from '../forms/Form';
import FormSubmit from '../forms/FormSubmit';
import InputFiles from '../forms/InputFiles';
import InputNumber from '../forms/InputNumber';
import InputText from '../forms/InputText';
import SelectMultiple from '../forms/SelectMultiple';
import SelectMultipleOption from '../forms/SelectMultipleOption';

// For re-usability purposes (see ProductCreateForm vs. ProductEditForm).
export default function ProductForm(props: {
  +name_en: ?string,
  +name_es: ?string,
  +description_en: ?string,
  +description_es: ?string,
  +price: number,
  +visibility: $ReadOnlyArray<'POS' | 'ESHOP'>,
  +button: RestrictedElement<typeof FormSubmit>,
}): React.Node {
  return (
    <Form>
      <InputFiles
        name="images"
        accept="image/jpeg,image/png"
        label={<fbt desc="form field name for product pictures">Product pictures</fbt>}
      />

      <InputText
        name="name_en"
        required={true}
        value={props.name_en}
        label={
          <fbt desc="form field name for product name in english">Product name (in English)</fbt>
        }
      />

      <InputText
        name="name_es"
        required={true}
        value={props.name_es}
        label={
          <fbt desc="form field name for product name in spanish">Product name (in Spanish)</fbt>
        }
      />

      <InputText
        name="description_en"
        value={props.description_en}
        label={
          <fbt desc="form field name for product description in english">
            Product description (in English)
          </fbt>
        }
      />

      <InputText
        name="description_es"
        value={props.description_es}
        label={
          <fbt desc="form field name for product description in spanish">
            Product description (in Spanish)
          </fbt>
        }
      />

      <InputNumber
        name="price"
        required={true}
        min={0}
        value={props.price}
        label={<fbt desc="form field name for product price">Price (MXN)</fbt>}
      />

      <SelectMultiple
        name="visibility"
        size={2}
        value={props.visibility}
        label={
          // $FlowFixMe[incompatible-type]: should be FBT
          <>
            Visibility (use <Kbd code="SHIFT" /> or <Kbd code="CTRL" /> to unselect or select more)
          </>
        }
      >
        <SelectMultipleOption value="POS">
          <fbt desc="visible in POS - select option">Visible in POS</fbt>
        </SelectMultipleOption>
        <SelectMultipleOption value="ESHOP">
          <fbt desc="visible in eshop - select option">
            Visible in KOCHKA.com.mx eshop (PUBLIC!)
          </fbt>
        </SelectMultipleOption>
      </SelectMultiple>

      {props.button}
    </Form>
  );
}
