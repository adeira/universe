/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import Image from '../Image';
import { render } from '../../test-utils';

it('renders without any issues', () => {
  const { getByAltText, getByTestId } = render(
    <Image alt={'yadada'} data-testid={'image-test-id'} />,
  );

  expect(getByAltText('yadada')).toBeDefined();
  expect(getByTestId('image-test-id')).toBeDefined();
});

it('warns with missing img alt', () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});

  const { getByTestId } = render(<Image src={'mock'} data-testid={'image-test-id'} />);

  expect(getByTestId('image-test-id')).toBeDefined();

  expect(warnSpy).toBeCalledWith(
    "You should specify alternative image text via `alt` property. This is an important part of accessibility for screen reader users in order for them to understand the content's purpose on the page.",
  );
  warnSpy.mockRestore();
});

it('handles invalid blurhash without any issues', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});

  const { getByAltText, getByTestId } = render(
    <Image
      alt={'yadada'}
      blurhash={'invalid-blurhash-format'} // <<<
      data-testid={'image-test-id'}
    />,
  );

  expect(getByAltText('yadada')).toBeDefined();
  expect(getByTestId('image-test-id')).toBeDefined();

  expect(consoleSpy).toHaveBeenCalledWith(
    'The specified blurhash value is not valid: "invalid-blurhash-format"',
  );
  consoleSpy.mockRestore();
});
