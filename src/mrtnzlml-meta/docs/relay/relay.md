---
id: match-module
title: Match, Module
sidebar_label: Match, Module
---

These directives allow you to lazily load union results. First, it requires `JSDependency` GraphQL scalar. Next it's necessary to use Union field with this shape:

```graphql
union FormattedContent = PlainContent | BoldContent

type Todo implements Node {
  id: ID!
  content(supported: [String!]!): FormattedContent
  complete: Boolean!
}
```

Directive `@match` can be used on the field `content` only if it follows this shape. And lastly, directive `@module` can be used on `JSDependency` fields:

```graphql
type BoldContent {
  data: BoldContentData
  js(module: String): JSDependency
}
```

Usage:

```graphql
fragment Todo_todo on Todo {
  complete
  id
  content @match {
    ...PlainTodoRenderer_value @module(name: "PlainTodoRenderer.react")
    ...BoldTodoRenderer_value @module(name: "BoldTodoRenderer.react")
  }
}
```

```js
const PlainTodoRenderer = React.lazy(() =>
  import(/* webpackChunkName: "PlainTodoRenderer" */ './PlainTodoRenderer'),
);
const BoldTodoRenderer = React.lazy(() =>
  import(/* webpackChunkName: "BoldTodoRenderer" */ './BoldTodoRenderer'),
);

const MatchContainer = ({ match, fallback }: Props) => {
  switch (match.__module_component) {
    case 'BoldTodoRenderer.react':
      return (
        <React.Suspense fallback={fallback}>
          <BoldTodoRenderer value={match} />
        </React.Suspense>
      );
    case 'PlainTodoRenderer.react':
      return (
        <React.Suspense fallback={fallback}>
          <PlainTodoRenderer value={match} />
        </React.Suspense>
      );
    default:
      return 'Nothing matched...';
  }
};
```

_still researching_

- https://github.com/relayjs/relay-examples/pull/95
- https://github.com/relayjs/relay-examples/pull/96
