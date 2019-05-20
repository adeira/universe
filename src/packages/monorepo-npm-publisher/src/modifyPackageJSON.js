// @flow strict

type PackageJSON = {|
  +main?: string,
  +module?: string,
|};

export default function modifyPackageJSON(
  packageJSONFile: PackageJSON,
): PackageJSON {
  const { main, module } = packageJSONFile;
  if (main != null) {
    return {
      module: main.replace(/\.js$/, '.mjs'),
      ...packageJSONFile,
    };
  } else if (module != null) {
    return {
      main: module.replace(/\.mjs$/, '.js'),
      ...packageJSONFile,
    };
  }
  return packageJSONFile;
}
