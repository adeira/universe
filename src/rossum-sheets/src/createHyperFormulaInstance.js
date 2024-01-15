// @flow

import { HyperFormula } from 'hyperformula';
import enUS from 'hyperformula/commonjs/i18n/languages/enUS';
import lodashGet from 'lodash.get';
import { findBySchemaId } from '@adeira/rossum-utils';
import type { WebhookPayload } from '@adeira/rossum-flow-types';

import isMetaField from './isMetaField';
import { RegexPlugin, RegexPluginTranslations } from './plugins/RegexPlugin';
import { RossumPlugin, RossumPluginTranslations } from './plugins/RossumPlugin';
import validateUserConfig, { type ExtensionUserConfig } from './validateUserConfig';

const options = {
  licenseKey: 'gpl-v3',

  // This configuration aligns HyperFormula with the default behavior of Microsoft Excel (set to
  // locale en-US), as closely as possible at this development stage (version 2.6.0).
  //
  // See: https://hyperformula.handsontable.com/guide/compatibility-with-microsoft-excel.html
  accentSensitive: true,
  arrayColumnSeparator: ',',
  arrayRowSeparator: ';',
  caseSensitive: false,
  currencySymbol: [], // disabled to prevent unwanted automatic detection
  dateFormats: [], // disabled to prevent unwanted automatic detection
  decimalSeparator: '.',
  evaluateNullToZero: false,
  functionArgSeparator: ',',
  ignorePunctuation: false,
  ignoreWhiteSpace: 'any',
  language: 'enUS',
  leapYear1900: true, // TODO: questionable
  localeLang: 'en-US',
  matchWholeCell: true,
  nullDate: { year: 1899, month: 12, day: 31 },
  nullYear: 30,
  smartRounding: true,
  thousandSeparator: '',
  timeFormats: [], // disabled to prevent unwanted automatic detection
  useArrayArithmetic: true,
  useRegularExpressions: false,
  useWildcards: true,
};

export default function createHyperFormulaInstance(
  payload: WebhookPayload<ExtensionUserConfig>,
): typeof HyperFormula {
  if (!HyperFormula.getRegisteredLanguagesCodes().includes('enUS')) {
    HyperFormula.registerLanguage('enUS', enUS);
  }

  HyperFormula.registerFunctionPlugin(RegexPlugin, RegexPluginTranslations);
  HyperFormula.registerFunctionPlugin(RossumPlugin, RossumPluginTranslations);

  const hfInstance = HyperFormula.buildEmpty(options);

  // define TRUE and FALSE constants
  hfInstance.addNamedExpression('TRUE', '=TRUE()');
  hfInstance.addNamedExpression('FALSE', '=FALSE()');

  const userSheets = validateUserConfig(payload.settings).sheets;

  for (const sheetName of Object.keys(userSheets)) {
    // prepare the sheets otherwise early formulas using other sheets will fail
    hfInstance.addSheet(sheetName);
  }

  for (const sheetName of Object.keys(userSheets)) {
    const sheetValues = [];
    const sheetFormulas =
      userSheets[sheetName].formulas?.map((calculation) => calculation.fx) ?? [];

    const parentDatapoint = findBySchemaId(payload.annotation.content, sheetName)[0];

    for (
      let i = 0;
      i < (parentDatapoint?.children.length ?? 1); // special case for custom keys (headers, meta, ...)
      i++
    ) {
      sheetValues.push(
        Object.values(userSheets[sheetName].columns)
          // we apply formulas only to the first row (enough for headers, later copied for line items)
          .concat(i === 0 ? sheetFormulas : []),
      );
    }

    const sheetFxStartCol = Object.values(userSheets[sheetName].columns).length;
    const sheetFxEndCol = sheetFxStartCol + sheetFormulas.length - 1;

    const sheetId = hfInstance.getSheetId(sheetName);
    hfInstance.setSheetContent(sheetId, sheetValues);

    if (sheetFormulas.length > 0) {
      // copy formulas to all rows so that the references are correct ($A1 -> $A2, $A3, etc.)
      hfInstance.copy({
        start: { sheet: sheetId, col: sheetFxStartCol, row: 0 },
        end: { sheet: sheetId, col: sheetFxEndCol, row: 0 },
      });
      for (let i = 1; i < parentDatapoint?.children.length; i++) {
        hfInstance.paste({ sheet: sheetId, col: sheetFxStartCol, row: i });
      }
    }
  }

  return hfInstance;
}
