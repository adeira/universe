TODO: remove (replaced by the new Next.js application)

---

To build:

```
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker build -t adeira/abacus-tools .
docker run -d -p 3000:80 adeira/abacus-tools
```

To publish:

```
docker push adeira/abacus-tools
```

Ideas for pages (tools):

- `Intl.DateTimeFormat` and `Intl.RelativeTimeFormat` live examples
- TODO
