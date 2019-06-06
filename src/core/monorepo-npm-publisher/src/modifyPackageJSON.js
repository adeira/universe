// @flow strict

type PackageJSON = {|
  +main?: string,
  // Field `module` can be string when you want to use your custom
  // implementation or `false` when you want to disable ESM completely.
  +module?: string | false,
|};

function deleteField(packageJSONFile, field) {
  // eslint-disable-next-line no-unused-vars
  const { [field]: _, ...packageJSONFileWithoutField } = packageJSONFile;
  return packageJSONFileWithoutField;
}

export default function modifyPackageJSON(
  packageJSONFile: PackageJSON,
): PackageJSON {
  const { main, module } = packageJSONFile;

  if (module === false) {
    return deleteField(packageJSONFile, 'module');
  }

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
