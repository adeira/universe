# TODO

- Do something with `LocalQueryRenderer` public interface. Especially check the environment and our network requirements. It's a bit awkward to pass down environment with some fetcher (see `createEnvironment`) when there is no network.
- `fetch-schema`: some people requested not to lexicographically sort `id` field (keep it first) or do not sort enums (since they can already be in a logical order)
- ...
