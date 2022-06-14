// @flow strict

// https://playwright.dev/docs/api/class-page
export type Page = {
  +goto: (url: string, options?: { ... }) => void,
  +locator: (
    selector: string,
    options: ?{
      +has?: Locator,
      +hasText?: string,
    },
  ) => Locator,
};

// https://playwright.dev/docs/api/class-locator
export type Locator = {
  +click: (options: ?{ ... }) => Promise<void>,
};
