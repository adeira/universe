```text
yarn install
yarn dev
```

## TODO (final checklist)

- [ ] check 404 pages
- [ ] check multilanguage variants

## Localization

```text
yarn run fbt
```

https://poeditor.com/docs/api

```text
curl -X POST https://api.poeditor.com/v2/languages/available \
     -d api_token="XYZ"

curl -X POST https://api.poeditor.com/v2/terms/add \
     -d api_token="XYZ" \
     -d id="366279" \
     -d data="[{\"term\":\"Add new list\"}]"
```

## Images, SVGs, PNGs, JPGs

- https://unsplash.com/
- https://vecta.io/nano
- https://svg2jsx.com/
- https://tinypng.com/
