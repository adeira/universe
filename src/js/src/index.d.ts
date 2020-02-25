declare module '@adeira/js' {
	export function invariant(
		condition: boolean,
		format: string,
		...args: ReadonlyArray<mixed>
	): void;

	export function nullthrows<T>(x?: T | null, message?: string): void;

  export function invariant(
    condition: boolean,
    format: string,
    ...args: ReadonlyArray<mixed>
  ): void;
}
