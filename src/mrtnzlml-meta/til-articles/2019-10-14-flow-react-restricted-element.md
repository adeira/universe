---
title: 'Flow: React RestrictedElement'
---

`RestrictedElement<typeof MenuItem>`

```js
export type RestrictedElement<+TElementType: React$ElementType> = {|
  +type:
    | TElementType
    | ClassComponentRender<RestrictedElement<TElementType>>
    | FunctionComponentRender<RestrictedElement<TElementType>>,
  +props: any, // The props type is already captured in the type field,
  // and using ElementProps recursively can get very expensive. Instead
  // of paying for that computation, I decided to use any

  +key: React$Key | null,
  +ref: any,
|};
```

[flow.org/try](https://flow.org/try/#0PTAEAEDMBsHsHcBQjgCpQFMDO0CWA7AFwFoATXLAQwCNoNRVhkBjWfLQ0AJQ0uc4C8oAE4YAjgFdcogBQByUX0JyAlAG5khAJ4AHegDEJ+frjYBhWAFsdbDER75SGYQB4A1ABUHT4QD5QQjI6wrA6WABcoJT4WioB-l52PhqI2nqgZtCUWFgW1rb2Sc7uiY7O-kKZ2VguiKDcvPwAJHk2+HaELtFaADRRMf4AZKAEhM6QfPQA3iJFwjIqkaU+oAC+PYi+KRgAHjbCnGn0PBzCuPwYpACidJYdJTcYd0QeuhiRPEpNj8+Er3oVUBTAA+dVAbiO4TB9WBoA8Pw6-ww0NAsKqOVaBUI3mKJ0IZwu11u93hxJeb18vhRsMMxkIpnwmPahTKrjxBLGRKeJIR5IBvg29TcwVCEX6vVAIDhAAt6CKwqAjiMsFFoIpSFpQMxKDpCBJRKQRvhFbLFW9QJBcBhoKRBZKwNFDRIsAQAOagXmEAAKIQVomY+pdADdrZrtcbXRhOCHhJrdnp2LgQwA6UAASXYY0opDBUtgkFAOkoWjdFtgwhNlE4rGsEkIVYZfTToCczFwTkNhFgoGd9G6yCFAGsMFoPo1CE0ANIj1GgfASaDQO1uUSQSLdDbA1YpKUATVgEi10Uw+Eg5eY9BrNhd9LYlGgharY2E7FA8FwhGlDVO505nqhzBZDkoAALJ2BIaZjJYmA7GMjgqp8-DJky9wglu-hTKsiCAdUoHgQAyhgRbCFW5YwXBpAIeOyFWG0qHAuhQJYThwFgfO5FJFRSg0fkzKdCCYLMNKuA2qI+BjtxZjCaJdgAILCCRWi1PU9Tsr+lyei4Rz5nh86QU8-iwmphKadpBZsRIhHEaRfh2gKiCMZh2FASqABysCELJFkoUQHHwQ0km0ViLhoasGFYSgYCyYuJqXtJpBiWaegqvecDwJcybYWwHCKtghAAIwBKAMhgi4FlUipoBleB+nQcAFUqdV85WZQJFdhW9WlcA5WIOoyBSu5nneUFfHKnOHn9KqaWXFq8WZawma5RwABMRUlfUTUSA1G0WbVkrbVVFktW1ZGdZVUxoKATT6GlVx7BgJkKeWkSDV54E+ZwFDjZwqUIDNBCxbMP6ErNIkJXYmBkoQWAogwRq6YeV5YqmADy+DQJqu1Qf0hpHURrU2VEohTX9pCpoAoOQMMAWGVS4r3DbxHT7V1PV9c5uE4sIWBvXp2O7BRXFIR9IUMWFQJgmJPgLBJSGmW8OlYwZ4uVaIeovodNXY-VGj1FhEULTlYwcAAzGtpU9bTit1Qdm3HYTZ2NZz3NW8zG3deBVJsyxVGslg+FWFGwn4K6HjSlWTs8xBfOwZxAVCyN9GObmYD7oeiiLpqWDSgeNqgAAVs6nC9t++LqVyvygLKoh9NQdbpm+0SEMnirdk4ljZfiVb0J+9AwLsuDUCJH5aJl9SS840tx4QyZy3oOkR1bGEoqr+rGi4C+a08+062siARVKIHlt3YfGoVdAhg+ThEVli1G4QAAsZs7R7KKbXtDvP81+MnR1NtO-7dxPxulDuHOYztN7WxZi-NmUoABCuBXSRhyglSg8BqB8EHMVXA7c4hfU-FWUAslqCnCUB9ZU+A5DVlog2Wg9B3yfkiiaL6RZCDPnwKmZs8BG4t1mtESMlZCAAEJipBlwJQSurCwjhBAK6D80oJDUGTDWYAedqAhHgPgZa+UACsKhEBAA), alternative to: https://flow.org/en/docs/react/children/#toc-only-allowing-a-specific-element-type-as-children

The one recommended in the docs is just for children with exactly that type. `RestrictedElement` lets you also use things that _render_ things of that type. So suppose you have some Button class. Let's say the button has a disabled flag. You might want to make another class:

```js
class DisabledButton {
  render(): React.Element<typeof Button> { ... }
}
```

You can't use `DisabledButton` inside a children array for `React.Element<typeof Button>` but you can in `RestrictedElement<typeof Button>`. (via [@jbrown215](https://github.com/jbrown215))

Real example:

```js
// @flow

import * as React from 'react';

import { type RestrictedElement } from './RestrictedElement';

class Button extends React.Component<{| +disabled?: boolean |}> {
  render() {
    return null;
  }
}

class DisabledButton extends React.Component<{||}> {
  // The return type is not necessary - it's here only to demonstrate what is going on.
  render(): React.Element<typeof Button> {
    return <Button disabled={true} />;
  }
}

class WrapperStupid extends React.Component<{|
  children: React.ChildrenArray<
    // You have to specify every single supported component here.
    React.Element<typeof Button> | React.Element<typeof DisabledButton>,
  >,
|}> {}

class WrapperSmart extends React.Component<{|
  // Type `RestrictedElement` understands what is being rendered so it accepts even `DisabledButton` (because it returns `Button`).
  children: React.ChildrenArray<RestrictedElement<typeof Button>>,
|}> {}

const testStupid = (
  <WrapperStupid>
    <Button />
    <Button />
    <DisabledButton />
  </WrapperStupid>
);

const testSmart = (
  <WrapperSmart>
    <Button />
    <Button />
    <DisabledButton />
  </WrapperSmart>
);
```
