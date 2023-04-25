import flow from './rollup-plugin-flow.mjs';

export default {
  input: 'src/string-manipulations/index.js',
  output: {
    file: 'build/string-manipulations.js',
    format: 'cjs',
  },
  plugins: [flow()],
};
