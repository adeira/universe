```text
yarn add @adeira/hooks
```

Note for ReScript users:

```rescript
@module("@adeira/hooks") external useIntersectionObserver: React.ref<Js.Nullable.t<Dom.element>> => bool = "useIntersectionObserver"

let footerRef = React.useRef(Js.Nullable.null)
let isIntersecting = useIntersectionObserver(footerRef)
```
