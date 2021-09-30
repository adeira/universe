// @flow

declare module 'msw' {
  declare type Context = {
    status: (number) => void,
    delay: (number) => void,
    json: (any) => void,
    ...
  };

  declare type RestMethod = (
    url: string,
    (req: any, res: any, ctx: Context) => Promise<any>,
  ) => void;
  declare type Rest = {
    get: RestMethod,
    put: RestMethod,
    post: RestMethod,
    delete: RestMethod,
  };
  declare export var rest: Rest;
}

declare module 'msw/node' {
  declare export type Server = {
    listen: (config: { [key: string]: mixed }) => Promise<void>,
    resetHandlers: () => Promise<void>,
    close: () => Promise<void>,
    use: (any) => void,
    ...
  };
  declare export function setupServer(): Server;
}
