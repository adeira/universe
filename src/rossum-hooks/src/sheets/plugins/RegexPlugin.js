// @flow

import { FunctionPlugin, FunctionArgumentType, CellError } from 'hyperformula';

export const RegexPluginTranslations = {
  enUS: {
    REGEXEXTRACT: 'REGEXEXTRACT',
    REGEXMATCH: 'REGEXMATCH',
    REGEXREPLACE: 'REGEXREPLACE',
  },
};

export class RegexPlugin extends FunctionPlugin {
  regexExtract(ast: $FlowFixMe, state: $FlowFixMe): $FlowFixMe {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('REGEXEXTRACT'),
      (text, regularExpression) => {
        if (typeof text !== 'string') {
          return new CellError('VALUE', 'Function REGEXEXTRACT operates only on string.');
        }
        if (typeof regularExpression !== 'string') {
          return new CellError(
            'VALUE',
            'Function REGEXEXTRACT accepts string as a second argument.',
          );
        }

        const match = text.match(regularExpression);
        if (match == null) {
          return '';
        }
        return match[1] ?? match[0];
      },
    );
  }

  regexMatch(ast: $FlowFixMe, state: $FlowFixMe): $FlowFixMe {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('REGEXMATCH'),
      (text, regularExpression) => {
        if (typeof text !== 'string') {
          return new CellError('VALUE', 'Function REGEXMATCH operates only on string.');
        }
        if (typeof regularExpression !== 'string') {
          return new CellError('VALUE', 'Function REGEXMATCH accepts string as a second argument.');
        }

        return text.match(regularExpression) != null;
      },
    );
  }

  regexReplace(ast: $FlowFixMe, state: $FlowFixMe): $FlowFixMe {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('REGEXREPLACE'),
      (text, regularExpression, replacement) => {
        if (typeof text !== 'string') {
          return new CellError('VALUE', 'Function REGEXREPLACE operates only on string.');
        }
        if (typeof regularExpression !== 'string') {
          return new CellError(
            'VALUE',
            'Function REGEXREPLACE accepts string as a second argument.',
          );
        }
        if (typeof replacement !== 'string') {
          return new CellError('VALUE', 'Function REGEXREPLACE accepts only strings.');
        }

        return text.replaceAll(new RegExp(regularExpression, 'g'), replacement);
      },
    );
  }
}

RegexPlugin.implementedFunctions = {
  REGEXEXTRACT: {
    // https://support.google.com/docs/answer/3098244
    method: 'regexExtract',
    parameters: [
      { argumentType: FunctionArgumentType.STRING },
      { argumentType: FunctionArgumentType.STRING },
    ],
  },
  REGEXMATCH: {
    // https://support.google.com/docs/answer/3098292
    method: 'regexMatch',
    parameters: [
      { argumentType: FunctionArgumentType.STRING },
      { argumentType: FunctionArgumentType.STRING },
    ],
  },
  REGEXREPLACE: {
    // https://support.google.com/docs/answer/3098245
    method: 'regexReplace',
    parameters: [
      { argumentType: FunctionArgumentType.STRING },
      { argumentType: FunctionArgumentType.STRING },
      { argumentType: FunctionArgumentType.STRING },
    ],
  },
};
