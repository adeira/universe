// @flow

import * as React from 'react';
import { fbt } from 'fbt';
import { graphql, useMutation } from '@adeira/relay';
import { useFlashMessages, FlashMessageTint } from '@adeira/sx-design';

import LayoutHeadingButton from '../LayoutHeadingButton';
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
  const [displayFleshMessage] = useFlashMessages();

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
            // TODO: DRY and improve these unexpected messages (see product creation)
            displayFleshMessage(
              fbt(
                'Something unexpected happened',
                'something unexpected happened message when trying to publish the product',
              ),
              { tint: FlashMessageTint.Error },
            );
          },
          onCompleted: ({ commerce: { productOrError } }) => {
            if (productOrError.__typename === 'Product') {
              displayFleshMessage(
                fbt(
                  'Product successfully published. ✅',
                  'success message when publishing a product',
                ),
                { tint: FlashMessageTint.Success },
              );
              // router.push('/products');
            } else if (productOrError.__typename === 'ProductError') {
              displayFleshMessage(productOrError.message, { tint: FlashMessageTint.Error });
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
            // TODO: DRY and improve these unexpected messages (see product creation)
            displayFleshMessage(
              fbt(
                'Something unexpected happened',
                'something unexpected happened message when trying to unpublish the product',
              ),
              { tint: FlashMessageTint.Error },
            );
          },
          onCompleted: ({ commerce: { productOrError } }) => {
            if (productOrError.__typename === 'Product') {
              displayFleshMessage(
                fbt(
                  'Product successfully unpublished. ✅',
                  'success message when unpublishing a product',
                ),
                { tint: FlashMessageTint.Success },
              );
              // router.push('/products');
            } else if (productOrError.__typename === 'ProductError') {
              displayFleshMessage(productOrError.message, { tint: FlashMessageTint.Error });
            }
          },
        });
      }}
    >
      <fbt desc="publish product button title">Unpublish product</fbt>
    </LayoutHeadingButton>
  );
}
