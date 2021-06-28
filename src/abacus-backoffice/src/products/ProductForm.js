// @flow

import { Kbd, Tooltip } from '@adeira/sx-design';
import { fbt } from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';

import FormMultiSelect from '../forms/FormMultiSelect';
import FormMultiSelectOption from '../forms/FormMultiSelectOption';
import FormMultiUpload from '../forms/FormMultiUpload';
import FormNumber from '../forms/FormNumber';
import FormRoot from '../forms/FormRoot';
import FormSubmit from '../forms/FormSubmit';
import FormText from '../forms/FormText';
import FormTextArea from '../forms/FormTextArea';

type SlatePayload = $ReadOnlyArray<$FlowFixMe>;

// For re-usability purposes (see ProductCreateForm vs. ProductEditForm).
export default function ProductForm(props: {
  +name_en: ?string,
  +name_es: ?string,
  +description_en: ?SlatePayload,
  +description_es: ?SlatePayload,
  +price: number,
  +visibility: $ReadOnlyArray<'POS' | 'ESHOP'>,
  +button: RestrictedElement<typeof FormSubmit>,
}): React.Node {
  return (
    <FormRoot>
      <FormMultiUpload
        name="images"
        accept="image/jpeg,image/png"
        label={<fbt desc="form field name for product pictures">Product pictures</fbt>}
      />

      <div className={styles('row')}>
        <FormText
          name="name_en"
          required={true}
          value={props.name_en}
          label={
            <fbt desc="form field name for product name in english">Product name (in English)</fbt>
          }
        />

        <FormText
          name="name_es"
          required={true}
          value={props.name_es}
          label={
            <fbt desc="form field name for product name in spanish">Product name (in Spanish)</fbt>
          }
        />
      </div>

      <FormTextArea
        name="description_en"
        value={props.description_en}
        label={
          <fbt desc="form field name for product description in english">
            Product description (in English)
          </fbt>
        }
      />

      <FormTextArea
        name="description_es"
        value={props.description_es}
        label={
          <fbt desc="form field name for product description in spanish">
            Product description (in Spanish)
          </fbt>
        }
      />

      <FormNumber
        name="price"
        required={true}
        min={0}
        value={props.price}
        label={<fbt desc="form field name for product price">Price (MXN)</fbt>}
      />

      <FormMultiSelect
        name="visibility"
        size={2}
        value={props.visibility}
        label={
          // $FlowFixMe[incompatible-type]: should be FBT
          <>
            Visibility (use <Kbd code="SHIFT" /> or <Kbd code="CTRL" /> to unselect or select more){' '}
            <Tooltip>
              <fbt desc="not on product visibility">
                The product can be visible in other places regardless of this setting. For example,
                it can be displayed in KOCHKA Café menu when it makes sense. This setting only
                affect where is the product going to be displayed automatically.
              </fbt>
            </Tooltip>
          </>
        }
      >
        <FormMultiSelectOption value="POS">
          <fbt desc="visible in POS - select option">Visible in POS</fbt>
        </FormMultiSelectOption>
        <FormMultiSelectOption value="ESHOP">
          <fbt desc="visible in eshop - select option">
            Visible in KOCHKA.com.mx eshop (PUBLIC!)
          </fbt>
        </FormMultiSelectOption>
      </FormMultiSelect>

      {props.button}
    </FormRoot>
  );
}

const styles = sx.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '1rem',
  },
});
