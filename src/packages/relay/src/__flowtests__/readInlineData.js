// @flow

import * as React from 'react';

import { graphql, readInlineData, createFragmentContainer } from '../index';

const sendToThirdPartyApi = obj => obj;

// By default, Relay will only expose the data for fields explicitly requested by a component's
// fragment, which is known as data masking. Fragment data is unmasked for use in React components
// by createFragmentContainer. However, you may want to use fragment data in non-React functions
// that are called from React.
//
// Non-React functions can also take advantage of data masking. A fragment can be defined with
// the @inline directive and stored in a local variable. The non-React function can then "unmask"
// the data using the readInlineData function.
//
// In the example below, the function processItemData is called from a React component. It requires
// an item object with a specific set of fields. All React components that use this function should
// spread the processItemData_item fragment to ensure all of the correct item data is loaded for
// this function.
//
// See: https://relay.dev/docs/en/graphql-in-relay.html#inline

// non-React function called from React
function processItemData(itemRef) {
  const item = readInlineData(
    graphql`
      fragment processItemData_item on Item @inline {
        title
        price
        creator {
          name
        }
      }
    `,
    itemRef,
  );
  sendToThirdPartyApi({
    title: item.title,
    price: item.price,
    creatorName: item.creator.name,
  });
}

// React Component
function MyComponent({ item }) {
  function handleClick() {
    processItemData(item);
  }
  return (
    <button onClick={handleClick} type="button">
      Process {item.title}
    </button>
  );
}

module.exports = {
  fragmentContainer() {
    return createFragmentContainer(MyComponent, {
      item: graphql`
        fragment readInlineData_item on Item {
          ...processItemData_item
          title
        }
      `,
    });
  },

  // Invalid usages:
  missingFragmentRef() {
    // $FlowExpectedError: Cannot call readInlineData because function [1] requires another argument.
    return readInlineData(
      graphql`
        fragment processItemData_item on Item @inline {
          __typename
        }
      `,
    );
  },
};
