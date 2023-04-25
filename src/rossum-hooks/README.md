Allows to perform various string operations on any fields. Example configuration (not all features are showcased):

```json5
{
  mappings: [
    {
      sources: 'order_id',
      target: 'order_id_ext_test_1',
      transformations: [
        'TRANSFORM(lowercase)', // "#AB - 123" → "#ab - 123"
        'REMOVE_SPECIAL_CHARACTERS', // "#ab - 123" → "ab  123"
        'SQUISH', // "ab  123" → "ab 123"
      ],
    },
    {
      sources: 'order_id',
      target: 'order_id_ext_test_2',
      transformations: [
        'SPLIT( )', // "AB 123" → ["AB", "123"]
        'CONCATENATE(+)', // ["AB", "123"] → "AB+123"
      ],
    },
    {
      sources: ['order_id', 'date_due'],
      target: 'order_id_ext_test_3',
      transformations: [
        'CONCATENATE(___)', // ["aaa", "2023-12-24"] → "aaa___2023-12-24"
        'REGEX_REPLACE(_{3,},~~)', // "aaa___2023-12-24" → "aaa~~2023-12-24"
      ],
    },
  ],
}
```

The transformations are applied sequentially from top to bottom. Alternatively, extensions can be chained via Rossum UI.

## Building for Rossum extension deployment

```
yarn workspace @adeira/rossum-hooks build
```
