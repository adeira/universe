declare module '@adeira/js' {
  export function invariant(condition: boolean, format: string, ...args: ReadonlyArray<any>): void;

  export function isBrowser(): boolean;

  export function isNumeric(value: any): boolean;

  export function isObject(value: any): boolean;

  export function isObjectEmpty(value: any): boolean;

  export function nullthrows<T>(x?: T | null, message?: string): void;

  export function sprintf(format: string, ...args: ReadonlyArray<any>): void;

  export function warning(condition: boolean, format: string, ...args: ReadonlyArray<any>): void;
}
