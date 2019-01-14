// @flow

/*::

type BinaryExpression = mixed;
type Identifier = mixed;
type MemberExpression = mixed;
type StringLiteral = mixed;

type Babel = {|
  +types: {|
    binaryExpression: (string, MemberExpression, StringLiteral) => BinaryExpression,
    identifier: string => Identifier,
    memberExpression: (Identifier, Identifier, boolean) => MemberExpression,
    stringLiteral: string => StringLiteral,
  |}
|}

type Path = {|
  isIdentifier: Object => boolean,
  replaceWith: BinaryExpression => void
|}

*/

module.exports = function({ types: t } /*: Babel */) {
  const DEV_EXPRESSION = t.binaryExpression(
    '!==',
    t.memberExpression(
      t.memberExpression(t.identifier('process'), t.identifier('env'), false),
      t.identifier('NODE_ENV'),
      false,
    ),
    t.stringLiteral('production'),
  );

  return {
    visitor: {
      Identifier: {
        enter: function(path /*: Path */) {
          // do nothing when testing
          if (process.env.NODE_ENV === 'test') {
            return;
          }

          // replace __DEV__ with process.env.NODE_ENV !== 'production'
          if (path.isIdentifier({ name: '__DEV__' })) {
            path.replaceWith(DEV_EXPRESSION);
          }
        },
      },
    },
  };
};
