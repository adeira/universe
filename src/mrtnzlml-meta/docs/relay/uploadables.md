---
id: uploadables
title: Uploadables
sidebar_label: Uploadables
---

Sending normal GraphQL mutation is trivial:

```js
commitMutation(graphql`
  mutation TestMutation {
    test(input: "test")
  }
`);
```

It sends POST request with these headers:

```http
Accept: application/json
Content-type: application/json
User-Agent: Mozilla/5.0
 ...
```

And with this request payload:

```json
{ "query": "mutation TestMutation {\n  test(input: \"test\")\n}\n", "variables": {} }
```

We can use the same POST request to send our files as well. To do so, you have to use uploadables from Relay and `multipart/form-data` content type. Mutation is similar:

```js
commitMutation(
  graphql`
    mutation TestMutation {
      test(input: "test")
    }
  `,
  {
    uploadables: {
      file1: new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      }),
      file2: new File(['bar'], 'bar.txt', {
        type: 'text/plain',
      }),
    },
  },
);
```

With these headers:

```http
Accept: */*
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryshXxygBlT4ATOyhW
User-Agent: Mozilla/5.0
 ...
```

And with these form data:

```
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="query"

mutation TestMutation {
  test(input: "test")
}

------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="variables"

{}
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="file1"; filename="foo.txt"
Content-Type: text/plain

foo
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="file2"; filename="bar.txt"
Content-Type: text/plain

bar
------WebKitFormBoundaryshXxygBlT4ATOyhW--
```

Plase note - it's good idea to create GraphQL type representing the file and send it in the query as well. Look at how Absinthe is doing it:

```
$ curl -X POST \\
-F query="{mutation uploadFile(users: \"users_csv\", metadata: \"metadata_json\")" \\
-F users_csv=@users.csv \\
-F metadata_json=@metadata.json \\
localhost:4000/graphql
```

They send the actual files and query as `multipart/form-data` as well but they require the file name (with underscore) in the query and it will fail if these two things do not match. Simple and elegant.

- https://github.com/facebook/relay/issues/1844#issuecomment-316893590
- https://hexdocs.pm/absinthe/file-uploads.html
