# ESLint plugin relay-fragments

ESLint plugin to make sure tech debt is not accumulating in your GraphQL fragments.

# Rules

## limit-complexity

Verifies that your fragment declaration is not too complex. This is usually a sign of bloated React component that should be split into smaller pieces. 

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
