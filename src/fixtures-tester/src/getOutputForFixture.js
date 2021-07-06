// @flow

type OperationOutput = any | Promise<any>;

export default async function getOutputForFixture(
  input: string,
  operation: (input: string) => OperationOutput,
  file: string,
): Promise<any> {
  const shouldThrow = /\.error\.\w+$/.test(file);
  if (shouldThrow) {
    let result;
    try {
      result = await operation(input);
    } catch (error) {
      return `THROWN EXCEPTION:\n\n${error.toString()}`;
    }
    throw new Error(`Expected test file '${file}' to throw, but it passed:\n${result}`);
  } else {
    return operation(input);
  }
}
