> [!IMPORTANT]
> This is a community project supported by enthusiasts and volunteers. For official support, please get in touch with [Rossum Sales](https://rossum.ai/form/contact/).

Chrome extension adding small enhancements to **Rossum UI** as well as **NetSuite UI** for easier onboarding (created by the SA team).

## Install

Head over to https://chrome.google.com/webstore/detail/bljkbinljmhdbipklfcljongikhmnneh and click **Add to Chrome**

## Rossum UI improvements

- shows datapoint `schema_id` on the annotation screen (headers and line items)
- adds `devFeatureEnabled` toggle
- adds `devDebugEnabled` toggle

![header fields](./assets/header_fields.png)

![line items](./assets/line_items.png)

## NetSuite UI improvements

- shows field internal names where available

![NetSuite field names](./assets/netsuite_field_names.png)

## Build and release

- bump version in `manifest.json`, `package.json` and `popup/popup.html`
- ZIP the `rossum-sa-extension` folder
- https://chrome.google.com/webstore/devconsole

## Ideas for further improvement (NOT IMPLEMENTED)

Allow Unleash overrides:

```text
javascript: {
  localStorage.setItem(
    'localUnleashOverrides',
    JSON.stringify({ 'ac-XYZ-ABC-v2': true })
  );
  location.reload();
}
```
