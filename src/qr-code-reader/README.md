React component that allows you to open a camera in your browser (desktop or mobile) and read QR codes.

Typical usage (TODO):

```js
<QrCodeReader
  onData={(data) => setQrCodeReaderData(data)}
  onNotAllowedError={(error) => {
    // TODO: display "not allowed" UI
    setQrCodeReaderError(error);
  }}
  onUnknownError={(error) => {
    // TODO: display "unknown error" UI
    setQrCodeReaderError(error);
  }}
/>
```
