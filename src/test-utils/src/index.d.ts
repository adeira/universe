export function generateTestsFromFixtures(
  fixturesPath: string,
  operation: (input: string) => any | Promise<any>,
): void;

export function evaluateGraphQLResolver(
  field: Record<string, any>,
  testValue: any,
  argsValue?: Record<string, any>,
  contextValue?: Record<string, any>,
): any;
