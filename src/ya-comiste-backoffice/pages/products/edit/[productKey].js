// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';
import { Heading } from '@adeira/sx-design';
import { graphql, useMutation } from '@adeira/relay';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import LayoutHeading from '../../../src/LayoutHeading';
import EditProductForm from '../../../src/products/EditProductForm';
import LayoutQueryRenderer from '../../../src/LayoutQueryRenderer';
import { uiStatusBarAtom } from '../../../src/recoil/uiStatusBarAtom';

export default function ProductsEditPage(): React.Node {
  const setStatusBar = useSetRecoilState(uiStatusBarAtom);
  const router = useRouter();
  const { productKey } = router.query;

  const [deleteProductMutation] = useMutation(
    graphql`
      mutation ProductKeyDeleteMutation($productKey: ID!) {
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

  if (!productKey) {
    // It will be an empty object during prerendering, see:
    // https://nextjs.org/docs/api-reference/next/router#router-object
    return null;
  }

  const handleDeleteProduct = (productKey) => {
    deleteProductMutation({
      variables: { productKey },
      onError: () => {
        setStatusBar({
          // TODO: DRY and improve these unexpected messages (see product creation)
          message: 'Something unexpected happened',
          type: 'ERROR',
        });
      },
      onCompleted: ({ commerce: { productOrError } }) => {
        if (productOrError.__typename === 'Product') {
          setStatusBar({
            message: 'Product successfully deleted. ✅',
            type: 'SUCCESS',
          });
          router.push('/products');
        } else if (productOrError.__typename === 'ProductError') {
          setStatusBar({
            message: productOrError.message,
            type: 'ERROR',
          });
        }
      },
    });
  };

  return (
    <LayoutQueryRenderer
      variables={{
        productKey: productKey,
        clientLocale: 'en_US', // TODO: customizable locale
      }}
      query={graphql`
        query ProductKeyGetQuery($clientLocale: SupportedLocale!, $productKey: ID!) {
          commerce {
            product: getProductByKey(clientLocale: $clientLocale, productKey: $productKey) {
              key
              ...EditProductFormFragment
            }
          }
        }
      `}
      onResponse={({ commerce }) => (
        <>
          <LayoutHeading
            heading={
              <Heading>
                <fbt desc="edit product page heading">Edit product</fbt>
              </Heading>
            }
            links={[
              {
                href: '/products',
                title: <fbt desc="go back to products navigation button">Products inventory</fbt>,
              },
              {
                onClick: () => handleDeleteProduct(commerce.product.key),
                confirmMessage: (
                  <fbt desc="delete product confirmation message">
                    Are you sure you want to delete the product?
                  </fbt>
                ),
                title: <fbt desc="delete product navigation button">Delete product</fbt>,
                titleStyle: styles.delete,
              },
            ]}
          />
          <EditProductForm product={commerce.product} />
        </>
      )}
    />
  );
}

const styles = sx.create({
  delete: {
    'color': 'darkred',
    ':hover': {
      color: 'red',
    },
  },
});
