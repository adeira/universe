# ESLint plugin relay-fragments

ESLint plugin to make sure tech debt is not accumulating in your GraphQL fragments.

# Installation

1. Install the package
    - either with Yarn: `yarn add --dev eslint-plugin-relay-fragments`
    - or with NPM: `npm i --save-dev eslint-plugin-relay-fragments`
2. Add to your `.eslintrc`:
    ```
    {
      "extends": [
        "plugin:relay-fragments/recommended"
      ],
      "plugins": [
        "relay-fragments"
      ],
    }
    ```

# Rules

## limit-complexity

Verifies that your fragment declaration is not too complex. This is usually a sign of bloated React component that should be split into smaller pieces. 

*How we calculate score:*

- Maximum allowed score is 20 points
- We add 1 point for every field, inline fragment & fragment spread
- We add an extra 1 for object field, e.g. `{ address { street }}` is penalized by 3 points
- query, mutation & subscription operations are penalized by 8 points
    - this is to encourage you to split query rendering from UI by utilizing relay fragment components 

Examples of **incorrect** code:

```js
graphql`
    fragment Accordion on Trip {
      departure {
        localTime
        airport {
          locationId
          city {
            name
          }
        }
      }
      arrival {
        airport {
          locationId
          city {
            name
          }
        }
      }
      legs {
        airline {
          name
          code
          logoUrl
        }
        ...CarrierLogoWrapper_legs
        ...AccordionBody_legs
      }
    }
`;
```

Examples of **correct** code:

```js
graphql`
    fragment FAQCategory_category on FAQCategory {
      id
      title
      children(first: 3) {
        ...FAQCategoryChildren_list
      }
    }
`;
```
