// @flow

import { graphql, useFragment } from '@adeira/relay';
import { Kbd, Tooltip } from '@adeira/sx-design';
import { fbt } from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';
import {
  FormMultiSelect,
  FormSelectOption,
  FormMultiUpload,
  FormNumber,
  FormRoot,
  FormSelect,
  FormSubmit,
  FormText,
  FormTextArea,
} from '@adeira/forms';

import type { ProductFormCategoriesData$key } from './__generated__/ProductFormCategoriesData.graphql';

// For re-usability purposes (see ProductCreateForm vs. ProductEditForm).
export default function ProductForm(props: {
  +availableCategories: ProductFormCategoriesData$key,
  +selectedCategories: $ReadOnlyArray<string>,
  +name_en: ?string,
  +name_es: ?string,
  +description_en: ?string,
  +description_es: ?string,
  +price: number,
  +visibility: $ReadOnlyArray<'POS' | 'ESHOP'>,
  +button: RestrictedElement<typeof FormSubmit>,
}): React.Node {
  const productCategories = useFragment(
    graphql`
      fragment ProductFormCategoriesData on ProductCategory @relay(plural: true) {
        id
        name
      }
    `,
    props.availableCategories,
  );

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
        label={
          <fbt desc="form field name for product base price without add-ons">Base price (MXN)</fbt>
        }
      />

      <FormSelect
        name="category"
        required={true}
        value={
          // we currently support only one category but it's ready for many categories
          props.selectedCategories[0] ?? null
        }
        label={<fbt desc="product category selectbox label">Product category</fbt>}
      >
        {productCategories.map((category) => {
          return (
            <FormSelectOption key={category.id} value={category.id}>
              {/* $FlowExpectedError[incompatible-type]: name should be FBT */}
              {category.name}
            </FormSelectOption>
          );
        })}
      </FormSelect>

      <FormMultiSelect
        name="visibility"
        size={2}
        value={props.visibility}
        label={
          // $FlowFixMe[incompatible-type]: should be FBT
          <>
            <fbt desc="product visibility multiselect label">
              Visibility (use{' '}
              <fbt:param name="keyboard1">
                <Kbd code="SHIFT" />
              </fbt:param>{' '}
              or{' '}
              <fbt:param name="keyboard2">
                <Kbd code="CTRL" />
              </fbt:param>{' '}
              to unselect or select more)
            </fbt>{' '}
            <Tooltip
              title={
                <fbt desc="not on product visibility">
                  The product can be visible in other places regardless of this setting. For
                  example, it can be displayed in KOCHKA Café menu when it makes sense. This setting
                  only affect where is the product going to be displayed automatically.
                </fbt>
              }
            />
          </>
        }
      >
        <FormSelectOption value="POS">
          <fbt desc="visible in POS - select option">Visible in POS</fbt>
        </FormSelectOption>
        <FormSelectOption value="ESHOP">
          <fbt desc="visible in eshop - select option">
            Visible in KOCHKA.com.mx eshop (PUBLIC!)
          </fbt>
        </FormSelectOption>
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
