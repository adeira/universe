// @flow strict

enum StatusDefault1 {
  Active,
  Paused,
  Off,
}

// eslint-disable-next-line no-unused-vars
enum StatusDefault2 of string {
  Active,
  Paused,
  Off,
}

enum StatusString1 {
  Active = 'active',
  Paused = 'paused',
  Off = 'off',
}

// eslint-disable-next-line no-unused-vars
enum StatusString2 of string {
  Active = 'active',
  Paused = 'paused',
  Off = 'off',
}

enum StatusNumber1 {
  Active = 1,
  Paused = 2,
  Off = 3,
}

// eslint-disable-next-line no-unused-vars
enum StatusNumber2 of number {
  Active = 1,
  Paused = 2,
  Off = 3,
}

// eslint-disable-next-line no-unused-vars
enum StatusBoolean1 {
  Active = true,
  Off = false,
}

enum StatusBoolean2 of boolean {
  Active = true,
  Off = false,
}

enum StatusSymbol of symbol {
  Active,
  Paused,
  Off,
}

enum StatusUnknownMembers {
  Active,
  Paused,
  Off,
  ...
}

export const a: StatusDefault1 = StatusDefault1.Active;
export const b: StatusString1 = StatusString1.Active;
export const c: StatusNumber1 = StatusNumber1.Active;
export const d: StatusBoolean2 = StatusBoolean2.Active;
export const e: StatusSymbol = StatusSymbol.Active;
export const f: StatusUnknownMembers = StatusUnknownMembers.Active;
