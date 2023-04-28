---
title: Computing average in a constant time
tags: ['javascript']
---

_Also known as average streaming._

Source: https://stackoverflow.com/a/22999488/3135248

> The following function adds a number to an average. average is the current average, size is the current number of values in the average, and value is the number to add to the average:

```
double addToAverage(double average, int size, double value)
{
    return (size * average + value) / (size + 1);
}
```

> Likewise, the following function removes a number from the average:

```
double subtractFromAverage(double average, int size, double value)
{
    // if (size == 1) return 0;       // wrong but then adding a value "works"
    // if (size == 1) return NAN;     // mathematically proper
    // assert(size > 1);              // debug-mode check
    // if(size < 2) throw(...)        // always check
    return (size * average - value) / (size - 1);
}
```
