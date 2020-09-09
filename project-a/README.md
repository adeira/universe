```text
yarn install
yarn dev
```

```text
yarn run flow && yarn run lint --all && yarn run test && yarn run fbt
```

## TODO (final checklist)

- [ ] check 404 and other error pages
- [ ] check multilanguage variants and translations
- [ ] check accessibility

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
