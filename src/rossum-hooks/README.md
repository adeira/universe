Allows to perform various string operations on any fields. Supported functions:

- `CONCATENATE` - joins array of sources (inputs) together
- `CONCATENATE(,)` - joins array of sources (inputs) together using the separator
- `REGEX_REPLACE([0-9],🧮)` - replaces matches found by the regex (first parameter) with the second parameter (🧮)
- `REMOVE_SPECIAL_CHARACTERS` - removes anything that is not alphanumeric character (or space)
- `REMOVE_WHITESPACE` - removes any whitespaces
- `REVERSE` - reverses the input
- `SPLIT(,)` - splits the input using the separator; note: it automatically concatenates the split chunks if left alone
- `SQUISH` - squishes and trims the input to only have one repeating space
- `TRANSFORM(uppercase|lowercase|capitalize)` - applies selected transformation
- `TRIM` - removes whitespaces from start and end of the string

Example configuration:

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
