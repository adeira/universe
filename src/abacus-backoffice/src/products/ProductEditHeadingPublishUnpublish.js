// @flow

import * as React from 'react';
import { fbt } from 'fbt';
import { graphql, useMutation } from '@adeira/relay';
import { useSetRecoilState } from 'recoil';

import LayoutHeadingButton from '../LayoutHeadingButton';
import { uiStatusBarAtom } from '../recoil/uiStatusBarAtom';
import useApplicationLocale from '../useApplicationLocale';
import type { ProductEditHeadingPublishUnpublishPublishMutation } from './__generated__/ProductEditHeadingPublishUnpublishPublishMutation.graphql';
import type { ProductEditHeadingPublishUnpublishUnpublishMutation } from './__generated__/ProductEditHeadingPublishUnpublishUnpublishMutation.graphql';

type Props = {
  +isPublished: boolean,
  +productKey: string,
};

export default function ProductEditHeadingPublishUnpublish(
  props: Props,
): React.Element<typeof LayoutHeadingButton> {
  const applicationLocale = useApplicationLocale();
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);

  const [publishProductMutation] = useMutation<ProductEditHeadingPublishUnpublishPublishMutation>(
    graphql`
      mutation ProductEditHeadingPublishUnpublishPublishMutation(
        $productKey: ID!
        $clientLocale: SupportedLocale!
      ) {
        commerce {
          productOrError: productPublish(productKey: $productKey, clientLocale: $clientLocale) {
            ... on Product {
              __typename
            }
            ... on ProductError {
              __typename
              message
            }
          }
        }
      }
    `,
  );

  const [unpublishProductMutation] =
    useMutation<ProductEditHeadingPublishUnpublishUnpublishMutation>(
      graphql`
        mutation ProductEditHeadingPublishUnpublishUnpublishMutation(
          $productKey: ID!
          $clientLocale: SupportedLocale!
        ) {
          commerce {
            productOrError: productUnpublish(productKey: $productKey, clientLocale: $clientLocale) {
              ... on Product {
                __typename
              }
              ... on ProductError {
                __typename
                message
              }
            }
          }
        }
      `,
    );

  return props.isPublished === false ? (
    <LayoutHeadingButton
      confirmMessage={
        <fbt desc="publish product button confirmation message">
          Are you sure you want to publish this product? Published products are immediately
          available to be used across our product based on the selected visibility (potentially
          public).
        </fbt>
      }
      onClick={() => {
        publishProductMutation({
          variables: {
            productKey: props.productKey,
            clientLocale: applicationLocale.graphql,
          },
          onError: () => {
            setStatusBar({
              // TODO: DRY and improve these unexpected messages (see product creation)
              message: 'Something unexpected happened',
              type: 'error',
            });
          },
          onCompleted: ({ commerce: { productOrError } }) => {
            if (productOrError.__typename === 'Product') {
              setStatusBar({
                message: 'Product successfully published. ✅',
                type: 'success',
              });
              // router.push('/products');
            } else if (productOrError.__typename === 'ProductError') {
              setStatusBar({
                message: productOrError.message,
                type: 'error',
              });
            }
          },
        });
      }}
    >
      <fbt desc="publish product button title">Publish product</fbt>
    </LayoutHeadingButton>
  ) : (
    <LayoutHeadingButton
      confirmMessage={
        <fbt desc="unpublish product button confirmation message">
          Are you sure you want to unpublish this product?
        </fbt>
      }
      onClick={() => {
        unpublishProductMutation({
          variables: {
            productKey: props.productKey,
            clientLocale: applicationLocale.graphql,
          },
          onError: () => {
            setStatusBar({
              // TODO: DRY and improve these unexpected messages (see product creation)
              message: 'Something unexpected happened',
              type: 'error',
            });
          },
          onCompleted: ({ commerce: { productOrError } }) => {
            if (productOrError.__typename === 'Product') {
              setStatusBar({
                message: 'Product successfully unpublished. ✅',
                type: 'success',
              });
              // router.push('/products');
            } else if (productOrError.__typename === 'ProductError') {
              setStatusBar({
                message: productOrError.message,
                type: 'error',
              });
            }
          },
        });
      }}
    >
      <fbt desc="publish product button title">Unpublish product</fbt>
    </LayoutHeadingButton>
  );
}
