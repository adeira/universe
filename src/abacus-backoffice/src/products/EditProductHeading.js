// @flow

import { useRouter } from 'next/router';
import * as React from 'react';
import { fbt } from 'fbt';
import { graphql, useMutation, useFragment } from '@adeira/relay';
import { Heading } from '@adeira/sx-design';
import { useSetRecoilState } from 'recoil';

import EditProductHeadingPublishUnpublish from './EditProductHeadingPublishUnpublish';
import LayoutHeading from '../LayoutHeading';
import LayoutHeadingButton from '../LayoutHeadingButton';
import LayoutHeadingLink from '../LayoutHeadingLink';
import { uiStatusBarAtom } from '../recoil/uiStatusBarAtom';
import type { EditProductHeadingDeleteMutation } from './__generated__/EditProductHeadingDeleteMutation.graphql';
import type { EditProductHeading$key } from './__generated__/EditProductHeading.graphql';

type Props = {
  +product: EditProductHeading$key,
};

export default function EditProductHeading(props: Props): React.Node {
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);
  const router = useRouter();

  const [deleteProductMutation] = useMutation<EditProductHeadingDeleteMutation>(
    graphql`
      mutation EditProductHeadingDeleteMutation($productKey: ID!) {
        commerce {
          productOrError: productDelete(productKey: $productKey) {
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

  const product = useFragment<EditProductHeading$key>(
    graphql`
      fragment EditProductHeading on Product {
        key
        isPublished
      }
    `,
    props.product,
  );

  const handleDeleteProduct = (productKey) => {
    deleteProductMutation({
      variables: { productKey },
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
            message: 'Product successfully deleted. ✅',
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
    <LayoutHeading
      heading={
        <Heading>
          <fbt desc="edit product page heading">Edit product</fbt>
        </Heading>
      }
    >
      <LayoutHeadingLink href="/products">
        <fbt desc="go back to products navigation button">Products inventory</fbt>
      </LayoutHeadingLink>

      <EditProductHeadingPublishUnpublish
        isPublished={product.isPublished}
        productKey={product.key}
      />

      <LayoutHeadingButton
        confirmMessage={
          <fbt desc="delete product confirmation message">
            Are you sure you want to delete the product?
          </fbt>
        }
        onClick={() => handleDeleteProduct(product.key)}
      >
        <fbt desc="delete product navigation button">Delete product</fbt>
      </LayoutHeadingButton>
    </LayoutHeading>
  );
}
