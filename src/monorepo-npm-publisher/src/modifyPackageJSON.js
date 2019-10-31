// @flow strict

type PackageJSON = {|
  +main?: string,
  // Field `module` can be string when you want to use your custom
  // implementation or `false` when you want to disable ESM completely.
  +module?: string | false,
|};

export default function modifyPackageJSON(packageJSONFile: PackageJSON): PackageJSON {
  const { main, module, ...rest } = packageJSONFile;

  if (main == null && module == null) {
    // nothing to do here (no main, no module)
    return { ...rest };
  }

  if (module === false) {
    // module disabled
    return { main, ...rest }; // TODO: should we remove the JS extension here as well?
  }

  if (main == null) {
    // add main as a module without extension
    return {
      // $FlowIssue: https://github.com/facebook/flow/issues/8074
      main: module.replace(/\.mjs$/, ''),
      module,
      ...rest,
    };
  }

  if (module == null) {
    // remove JS extension from main
    // add module as a main with MJS extension
    return {
      main: main.replace(/\.js$/, ''),
      module: main.replace(/(?:\.js)?$/, '.mjs'),
      ...rest,
    };
  }

  // return as is but try to remove JS extension from main
  return {
    main: main.replace(/\.js$/, ''),
    module,
    ...rest,
  };
}
