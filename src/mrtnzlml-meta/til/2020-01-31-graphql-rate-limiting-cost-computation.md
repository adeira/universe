---
title: 'GraphQL: Rate Limiting, Cost Computation'
tags: ['graphql']
---

So far the best idea I've ever seen is this one: https://github.com/adeira/universe/blob/5d2c15e1767a6e91c5eb82f41abc1e856811d0df/src/graphql-result-size/semantics-and-complexity-of-graphql.pdf (alternative reading: [Result size calculation for Facebook’s GraphQL query language](https://www.diva-portal.org/smash/get/diva2:1237221/FULLTEXT01.pdf))

Experimental implementation here: https://github.com/adeira/universe/tree/5d2c15e1767a6e91c5eb82f41abc1e856811d0df/src/graphql-result-size

Alternative approaches:

- https://developer.github.com/v4/guides/resource-limitations/ (TODO: explain why it's worse and when you should consider it)
- https://twitter.com/__xuorig__/status/1148653318069207041
