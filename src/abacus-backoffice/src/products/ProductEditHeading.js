// @flow

import Icon from '@adeira/icons';
import { useRouter } from 'next/router';
import * as React from 'react';
import { fbt } from 'fbt';
import { graphql, useMutation, useFragment } from '@adeira/relay';
import { useSetRecoilState } from 'recoil';

import LayoutPage from '../LayoutPage';
import LayoutHeadingButton from '../LayoutHeadingButton';
import LayoutHeadingLink from '../LayoutHeadingLink';
import ProductEditHeadingPublishUnpublish from './ProductEditHeadingPublishUnpublish';
import useApplicationLocale from '../useApplicationLocale';
import { uiStatusBarAtom } from '../recoil/uiStatusBarAtom';
import type { ProductEditHeadingArchiveMutation } from './__generated__/ProductEditHeadingArchiveMutation.graphql';
import type { ProductEditHeading$key } from './__generated__/ProductEditHeading.graphql';

type Props = {
  +product: ProductEditHeading$key,
  +children: React.Node,
};

export default function ProductEditHeading(props: Props): React.Node {
  const applicationLocale = useApplicationLocale();
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);
  const router = useRouter();

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

  const product = useFragment<ProductEditHeading$key>(
    graphql`
      fragment ProductEditHeading on Product {
        key
        name
        isPublished
      }
    `,
    props.product,
  );

  const handleArchiveProduct = (productKey) => {
    archiveProductMutation({
      variables: {
        productKey,
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
            message: 'Product successfully archived. ✅',
            type: 'success',
          });
          router.push('/products');
        } else if (productOrError.__typename === 'ProductError') {
          setStatusBar({
            message: productOrError.message,
            type: 'error',
          });
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
