// @flow

import * as React from 'react';
import Icon from '@adeira/icons';
import { fbt } from 'fbt';
import { graphql, useMutation, useFragment } from '@adeira/relay';
import { useFlashMessages, FlashMessageTint } from '@adeira/sx-design';
import { useRouter } from 'next/router';

import LayoutPage from '../LayoutPage';
import LayoutHeadingButton from '../LayoutHeadingButton';
import LayoutHeadingLink from '../LayoutHeadingLink';
import ProductEditHeadingPublishUnpublish from './ProductEditHeadingPublishUnpublish';
import useApplicationLocale from '../useApplicationLocale';
import type { ProductEditHeading$key } from './__generated__/ProductEditHeading.graphql';
import type { ProductEditHeadingArchiveMutation } from './__generated__/ProductEditHeadingArchiveMutation.graphql';

type Props = {
  +product: ProductEditHeading$key,
  +children: React.Node,
};

export default function ProductEditHeading(props: Props): React.Node {
  const applicationLocale = useApplicationLocale();
  const router = useRouter();
  const [displayFleshMessage] = useFlashMessages();

  const [archiveProductMutation] = useMutation<ProductEditHeadingArchiveMutation>(
    graphql`
      mutation ProductEditHeadingArchiveMutation(
        $productKey: ID!
        $clientLocale: SupportedLocale!
      ) {
        commerce {
          productOrError: productArchive(productKey: $productKey, clientLocale: $clientLocale) {
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

  const product = useFragment(
    graphql`
      fragment ProductEditHeading on Product {
        key
        name
        isPublished
      }
    `,
    props.product,
  );

  const handleArchiveProduct = (productKey: string) => {
    archiveProductMutation({
      variables: {
        productKey,
        clientLocale: applicationLocale.graphql,
      },
      onError: () => {
        // TODO: DRY and improve these unexpected messages (see product creation)
        displayFleshMessage(
          fbt(
            'Something unexpected happened',
            'something unexpected happened message when trying to archive the product',
          ),
          { tint: FlashMessageTint.Error },
        );
      },
      onCompleted: ({ commerce: { productOrError } }) => {
        if (productOrError.__typename === 'Product') {
          displayFleshMessage(
            fbt('Product successfully archived. ✅', 'success message when archiving a product'),
            { tint: FlashMessageTint.Success },
          );
          /* $FlowFixMe[unused-promise-in-sync-scope] This comment suppresses
           * an error when upgrading Flow to version 0.200.0. To see the error
           * delete this comment and run Flow. */
          router.push('/products');
        } else if (productOrError.__typename === 'ProductError') {
          displayFleshMessage(productOrError.message, { tint: FlashMessageTint.Error });
        }
      },
    });
  };

  return (
    <LayoutPage
      heading={
        <fbt desc="edit product page heading">
          Edit product: <fbt:param name="productName">{product.name}</fbt:param>
        </fbt>
      }
      actionButtons={[
        <LayoutHeadingLink key="back" href="/products">
          <fbt desc="go back to products navigation button">Products inventory</fbt>
        </LayoutHeadingLink>,

        <ProductEditHeadingPublishUnpublish
          key="publish"
          isPublished={product.isPublished}
          productKey={product.key}
        />,

        <LayoutHeadingButton
          key="archive"
          confirmMessage={
            <fbt desc="archive product confirmation message">
              Are you sure you want to archive the product? Archiving makes it unavailable and
              behaves similar to deleting the product.
            </fbt>
          }
          onClick={() => handleArchiveProduct(product.key)}
          prefix={<Icon name="archive" />}
        >
          <fbt desc="archive product navigation button">Archive product</fbt>
        </LayoutHeadingButton>,
      ]}
    >
      {props.children}
    </LayoutPage>
  );
}
