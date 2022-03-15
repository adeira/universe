// @flow strict

const errors = {
  X001: 'Every non-private workspace must have a description field.',
  X002: 'Every non-private workspace must have a homepage field.',
  X003: 'Every non-private workspace must have a bugs field (https://github.com/adeira/universe/issues).',
  X004: 'Every non-private workspace must have a repository field.',
  X005: 'Every non-private workspace must have a version field.',
  X006: 'Every non-private workspace must specify its type field to be either "commonjs" or "module".',
};

module.exports = {
  name: 'plugin-monorepo-scanner',
  factory: (require /*: $FlowFixMe */) /*: { +hooks: { ... }, ... } */ => {
    return {
      hooks: {
        validateProject(project, { reportWarning, reportError }) {
          // https://yarnpkg.com/advanced/plugin-tutorial#hook-validateProject
        },
        validateWorkspace(workspace, { reportWarning, reportError }) {
          // https://yarnpkg.com/advanced/plugin-tutorial#hook-validateWorkspace
          const manifest = workspace.manifest;
          const manifestRaw = manifest.raw;

          if (manifest.private !== true) {
            if (manifestRaw.description == null) {
              reportError('X001', errors['X001']);
            }
            if (manifestRaw.homepage == null) {
              reportError('X002', errors['X002']);
            }
            if (manifestRaw.bugs == null) {
              reportError('X003', errors['X003']);
            }
            if (manifestRaw.repository == null) {
              reportError('X004', errors['X004']);
            }
            if (manifestRaw.version == null) {
              reportError('X005', errors['X005']);
            }
            if (manifestRaw.type == null) {
              reportError('X006', errors['X006']);
            }
          }
        },
      },
    };
  },
};
