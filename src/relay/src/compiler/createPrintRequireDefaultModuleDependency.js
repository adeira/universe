// @flow strict

export default function createPrintRequireDefaultModuleDependency(): (string) => string {
  return (moduleName) => `require('./${moduleName}.js').default`;
}
