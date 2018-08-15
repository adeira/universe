`yarn flow`

```
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/apps/autobooking/queries/Autobooking.js:27:26

Cannot call await with context.dataLoaders.autobooking.getResult(...) bound to p because property autobooking is missing
in Promise [1].

     src/apps/autobooking/queries/Autobooking.js
     24│     { bid }: argsType,
     25│     context: GraphqlContextType
     26│   ): Promise<AutobookingType> => {
     27│     const result = await context.dataLoaders.autobooking.getResult(bid)
     28│     const { autobooking, status } = result
     29│
     30│     if (autobooking === null) {

     src/apps/autobooking/Datasource.js
 [1] 19│   ): Promise<{|
     20│     +autobooking: Autobooking | null,
     21│     +status: string
     22│   |}> {
```

vs. `yarn flow --show-all-branches`

```
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/apps/autobooking/queries/Autobooking.js:27:26

Cannot call await with context.dataLoaders.autobooking.getResult(...) bound to p because:
 • Either cannot return object literal because in property status of type argument R [1]:
    • Either string [2] is incompatible with string literal pending [3].
    • Or string [2] is incompatible with string literal check_failed [4].
    • Or string [2] is incompatible with string literal ready [5].
    • Or string [2] is incompatible with string literal started [6].
    • Or string [2] is incompatible with string literal too_expensive [7].
 • Or property autobooking is missing in Promise [8].

                 src/apps/autobooking/queries/Autobooking.js
                  24│     { bid }: argsType,
                  25│     context: GraphqlContextType
                  26│   ): Promise<AutobookingType> => {
                  27│     const result = await context.dataLoaders.autobooking.getResult(bid)
                  28│     const { autobooking, status } = result
                  29│
                  30│     if (autobooking === null) {

                 /private/tmp/flow/flowlib_2c621631/core.js
             [1] 583│ declare class Promise<+R> {

                 src/apps/autobooking/Datasource.js
             [8]  19│   ): Promise<{|
                  20│     +autobooking: Autobooking | null,
             [2]  21│     +status: string
                  22│   |}> {

                 src/apps/autobooking/apiTypes/Autobooking.js
 [3][4][5][6][7]   7│   status: 'pending' | 'check_failed' | 'ready' | 'started' | 'too_expensive'
```
