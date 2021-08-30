// @flow

const { ERROR, OFF, WARN } = require('../constants');
const detectReactVersion = require('../detectReactVersion');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: [
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-native',
    'eslint-plugin-jsx-a11y',
  ],
  rules: {
    // React (https://github.com/yannickcr/eslint-plugin-react)
    'react/boolean-prop-naming': OFF,
    'react/button-has-type': [ERROR, { button: true, submit: true, reset: false }],
    'react/default-props-match-prop-types': OFF,
    'react/destructuring-assignment': OFF,
    'react/display-name': OFF,
    'react/forbid-component-props': OFF,
    'react/forbid-dom-props': [
      ERROR,
      {
        forbid: [
          'class', // https://reactjs.org/docs/dom-elements.html#classname
          'for', // https://reactjs.org/docs/dom-elements.html#htmlfor
        ],
      },
    ],
    'react/forbid-elements': OFF,
    'react/forbid-foreign-prop-types': OFF,
    'react/forbid-prop-types': OFF,
    'react/jsx-boolean-value': OFF,
    'react/jsx-curly-brace-presence': OFF,
    'react/jsx-filename-extension': OFF,
    'react/jsx-fragments': OFF,
    'react/jsx-handler-names': OFF,
    'react/jsx-key': ERROR,
    'react/jsx-max-depth': OFF,
    'react/jsx-no-bind': [
      ERROR,
      {
        ignoreDOMComponents: true,
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    'react/jsx-no-comment-textnodes': ERROR,
    'react/jsx-no-constructed-context-values': ERROR,
    'react/jsx-no-duplicate-props': ERROR,
    'react/jsx-no-literals': OFF,
    'react/jsx-no-target-blank': ERROR,
    'react/jsx-no-undef': ERROR,
    'react/jsx-no-useless-fragment': ERROR,
    'react/jsx-pascal-case': ERROR,
    'react/jsx-props-no-spreading': OFF,
    'react/jsx-sort-default-props': OFF,
    'react/jsx-sort-props': OFF,
    'react/jsx-uses-react': WARN,
    'react/jsx-uses-vars': ERROR,
    'react/no-access-state-in-setstate': ERROR,
    'react/no-array-index-key': OFF,
    'react/no-children-prop': OFF,
    'react/no-danger': OFF,
    'react/no-danger-with-children': ERROR,
    'react/no-deprecated': ERROR,
    'react/no-did-mount-set-state': OFF, // https://github.com/airbnb/javascript/issues/684#issuecomment-264094930
    'react/no-did-update-set-state': ERROR,
    'react/no-direct-mutation-state': ERROR,
    'react/no-find-dom-node': ERROR,
    'react/no-is-mounted': ERROR,
    'react/no-multi-comp': [ERROR, { ignoreStateless: true }],
    'react/no-redundant-should-component-update': ERROR,
    'react/no-render-return-value': ERROR,
    'react/no-set-state': OFF,
    'react/no-string-refs': OFF,
    'react/no-this-in-sfc': ERROR,
    'react/no-typos': OFF,
    'react/no-unescaped-entities': ERROR,
    'react/no-unknown-property': ERROR,
    'react/no-unsafe': OFF,
    'react/no-unstable-nested-components': [ERROR, { allowAsProps: true }],
    'react/no-unused-prop-types': OFF,
    'react/no-unused-state': OFF, // Enable when they fix this issue: https://github.com/yannickcr/eslint-plugin-react/issues/1910
    'react/no-will-update-set-state': OFF,
    'react/prefer-es6-class': [ERROR, 'always'],
    'react/prefer-exact-props': OFF, // see: fb-flow/use-exact-by-default-object-type
    'react/prefer-read-only-props': OFF,
    'react/prefer-stateless-function': OFF,
    'react/prop-types': OFF, // we use Flow instead,
    'react/react-in-jsx-scope': OFF,
    'react/require-default-props': OFF,
    'react/require-optimization': OFF,
    'react/require-render-return': ERROR,
    'react/self-closing-comp': ERROR,
    'react/sort-comp': [
      ERROR,
      {
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        order: [
          'type-annotations',
          'static-variables',
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps', // this is added
            'getDerivedStateFromError', // this is added
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/sort-prop-types': OFF,
    'react/state-in-constructor': OFF,
    'react/static-property-placement': OFF,
    'react/style-prop-object': ERROR,
    'react/void-dom-elements-no-children': ERROR,
    'react/function-component-definition': OFF,
    'react/jsx-no-script-url': ERROR,
    'react/no-adjacent-inline-elements': OFF,

    // React Hooks (https://www.npmjs.com/package/eslint-plugin-react-hooks)
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': [
      ERROR,
      {
        // https://recoiljs.org/docs/introduction/installation/#eslint
        additionalHooks: 'useRecoilCallback', // should be regex!
      },
    ],

    // React Native (https://github.com/intellicode/eslint-plugin-react-native)
    'react-native/no-color-literals': OFF,
    'react-native/no-inline-styles': OFF,
    'react-native/no-raw-text': OFF, // TODO: takes normal React into account as well, not only RN
    'react-native/no-single-element-style-arrays': ERROR,
    'react-native/no-unused-styles': ERROR,
    'react-native/sort-styles': OFF,
    'react-native/split-platform-components': OFF,

    // React Accessibility (https://github.com/evcohen/eslint-plugin-jsx-a11y)
    'jsx-a11y/accessible-emoji': ERROR,
    'jsx-a11y/alt-text': ERROR,
    'jsx-a11y/anchor-has-content': ERROR,
    'jsx-a11y/anchor-is-valid': ERROR,
    'jsx-a11y/aria-activedescendant-has-tabindex': OFF,
    'jsx-a11y/aria-props': ERROR,
    'jsx-a11y/aria-proptypes': ERROR,
    'jsx-a11y/aria-role': ERROR,
    'jsx-a11y/aria-unsupported-elements': ERROR,
    'jsx-a11y/autocomplete-valid': ERROR,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/control-has-associated-label': OFF,
    'jsx-a11y/heading-has-content': ERROR,
    'jsx-a11y/html-has-lang': ERROR,
    'jsx-a11y/iframe-has-title': ERROR,
    'jsx-a11y/img-redundant-alt': OFF,
    'jsx-a11y/interactive-supports-focus': ERROR,
    'jsx-a11y/label-has-associated-control': OFF,
    'jsx-a11y/label-has-for': OFF,
    'jsx-a11y/lang': ERROR,
    'jsx-a11y/media-has-caption': OFF,
    'jsx-a11y/mouse-events-have-key-events': OFF,
    'jsx-a11y/no-access-key': ERROR,
    'jsx-a11y/no-autofocus': [ERROR, { ignoreNonDOM: true }],
    'jsx-a11y/no-distracting-elements': [ERROR, { elements: ['marquee', 'blink'] }],
    'jsx-a11y/no-interactive-element-to-noninteractive-role': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/no-noninteractive-element-to-interactive-role': OFF,
    'jsx-a11y/no-noninteractive-tabindex': ERROR,
    'jsx-a11y/no-onchange': OFF,
    'jsx-a11y/no-redundant-roles': ERROR,
    'jsx-a11y/no-static-element-interactions': OFF,
    'jsx-a11y/role-has-required-aria-props': ERROR,
    'jsx-a11y/role-supports-aria-props': ERROR,
    'jsx-a11y/scope': ERROR,
    'jsx-a11y/tabindex-no-positive': ERROR,
  },
  settings: {
    react: {
      version: detectReactVersion(),
    },
  },
} /*: EslintConfig */);
