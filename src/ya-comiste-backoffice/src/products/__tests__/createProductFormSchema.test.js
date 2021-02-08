// @flow

import initTranslations from '../../../translations/init';
import createProductFormSchema from '../createProductFormSchema';

beforeEach(() => {
  initTranslations();
});

it('accepts valid form', () => {
  const schema = createProductFormSchema();
  expect(
    schema.isValidSync({
      name_en: 'EN name',
      name_es: 'ES name',
      description_en: 'EN desc',
      description_es: 'ES desc',
      price: 100,
      images: ['AAA.png'],
    }),
  ).toBe(true);
});

it('allows missing translations', () => {
  const schema = createProductFormSchema();

  // spanish versions not defined:
  expect(
    schema.isValidSync({
      name_en: 'EN name',
      // name_es missing on purpose
      description_en: 'EN desc',
      // description_es missing on purpose
      price: 100,
      images: ['AAA.png'],
    }),
  ).toBe(true);

  // english versions not defined:
  expect(
    schema.isValidSync({
      // name_en missing on purpose
      name_es: 'ES name',
      // description_en missing on purpose
      description_es: 'ES desc',
      price: 100,
      images: ['AAA.png'],
    }),
  ).toBe(true);
});

it('disallows missing name', () => {
  expect.assertions(1);
  try {
    const schema = createProductFormSchema();
    schema.validateSync(
      {
        // name_en missing on purpose
        // name_es missing on purpose
        description_en: 'EN desc',
        description_es: 'ES desc',
        price: 100,
        images: ['AAA.png'],
      },
      { abortEarly: false },
    );
  } catch (e) {
    expect(e.inner).toMatchInlineSnapshot(`
      Array [
        [ValidationError: At least one product name version (english or spanish) is required],
        [ValidationError: At least one product name version (english or spanish) is required],
      ]
    `);
  }
});

it('disallows missing description', () => {
  expect.assertions(1);
  try {
    const schema = createProductFormSchema();
    schema.validateSync(
      {
        name_en: 'EN name',
        name_es: 'ES name',
        // description_en missing on purpose
        // description_es missing on purpose
        price: 100,
        images: ['AAA.png'],
      },
      { abortEarly: false },
    );
  } catch (e) {
    expect(e.inner).toMatchInlineSnapshot(`
      Array [
        [ValidationError: At least one product description (english or spanish) is required],
        [ValidationError: At least one product description (english or spanish) is required],
      ]
    `);
  }
});

it('disallows missing price', () => {
  expect.assertions(1);
  try {
    const schema = createProductFormSchema();
    schema.validateSync(
      {
        name_en: 'EN name',
        name_es: 'ES name',
        description_en: 'EN desc',
        description_es: 'ES desc',
        // price missing on purpose
        images: ['AAA.png'],
      },
      { abortEarly: false },
    );
  } catch (e) {
    expect(e.inner).toMatchInlineSnapshot(`
      Array [
        [ValidationError: Product price is a required field],
      ]
    `);
  }
});

it('disallows negative price', () => {
  expect.assertions(1);
  try {
    const schema = createProductFormSchema();
    schema.validateSync(
      {
        name_en: 'EN name',
        name_es: 'ES name',
        description_en: 'EN desc',
        description_es: 'ES desc',
        price: -1,
        images: ['AAA.png'],
      },
      { abortEarly: false },
    );
  } catch (e) {
    expect(e.inner).toMatchInlineSnapshot(`
      Array [
        [ValidationError: Product price must be a positive number],
      ]
    `);
  }
});

it.todo('disallows missing images'); // images are not ready yet
