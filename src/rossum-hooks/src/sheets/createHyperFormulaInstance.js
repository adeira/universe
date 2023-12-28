// @flow

import { HyperFormula } from 'hyperformula';
import enUS from 'hyperformula/commonjs/i18n/languages/enUS';
import lodashGet from 'lodash.get';

import findBySchemaId from '../utils/findBySchemaId';
import type { WebhookPayload } from '../flowTypes';

export type ExtensionUserConfig = {
  +debug: boolean,
  +sheets: {
    +[sheetName: string]: {
      +columns: {
        +[columnName: string]: string,
      },
      +formulas?: Array<{
        +fx: string,
        +target: string,
        +validation?: {
          +message: string,
          +type?: 'error' | 'warning' | 'info',
          +automation_blocker?: boolean,
        },
      }>,
    },
  },
};

const options = {
  licenseKey: 'gpl-v3',

  // This configuration aligns HyperFormula with the default behavior of Microsoft Excel (set to
  // locale en-US), as closely as possible at this development stage (version 2.6.0).
  //
  // See: https://hyperformula.handsontable.com/guide/compatibility-with-microsoft-excel.html
  accentSensitive: true,
  arrayColumnSeparator: ',', // set by default
  arrayRowSeparator: ';', // set by default
  caseSensitive: false, // set by default
  currencySymbol: ['$', 'USD'],
  dateFormats: ['MM/DD/YYYY', 'MM/DD/YY', 'YYYY/MM/DD'],
  decimalSeparator: '.', // set by default
  evaluateNullToZero: true,
  functionArgSeparator: ',', // set by default
  ignorePunctuation: false, // set by default
  ignoreWhiteSpace: 'any',
  language: 'enUS',
  leapYear1900: true,
  localeLang: 'en-US',
  matchWholeCell: true, // set by default
  nullDate: { year: 1899, month: 12, day: 31 },
  nullYear: 30, // set by default
  smartRounding: true, // set by default
  thousandSeparator: '', // set by default
  timeFormats: ['hh:mm', 'hh:mm:ss.sss'], // set by default
  useArrayArithmetic: true,
  useRegularExpressions: false, // set by default
  useWildcards: true, // set by default
};

export default function createHyperFormulaInstance(
  payload: WebhookPayload<ExtensionUserConfig>,
): typeof HyperFormula {
  HyperFormula.registerLanguage('enUS', enUS);
  const hfInstance = HyperFormula.buildEmpty(options);

  // define TRUE and FALSE constants
  hfInstance.addNamedExpression('TRUE', '=TRUE()');
  hfInstance.addNamedExpression('FALSE', '=FALSE()');

  for (const sheetName of Object.keys(payload.settings.sheets)) {
    // prepare the sheets otherwise early formulas using other sheets will fail
    hfInstance.addSheet(sheetName);
  }

  for (const sheetName of Object.keys(payload.settings.sheets)) {
    const sheetValues = [];
    const sheetFormulas =
      payload.settings.sheets[sheetName].formulas?.map((calculation) => calculation.fx) ?? [];

    const parentDatapoint = findBySchemaId(payload.annotation.content, sheetName)[0];

    for (
      let i = 0;
      i < (parentDatapoint?.children.length ?? 1); // special case for custom keys (headers, meta, ...)
      i++
    ) {
      sheetValues.push(
        Object.values(payload.settings.sheets[sheetName].columns)
          .map((datapointID) => {
            if (datapointID.startsWith('annotation.') || datapointID.startsWith('document.')) {
              return lodashGet(payload, datapointID);
            }

            return (
              findBySchemaId(payload.annotation.content, datapointID)[i].content.normalized_value ??
              findBySchemaId(payload.annotation.content, datapointID)[i].content.value
            );
          })
          .concat(i === 0 ? sheetFormulas : []), // we apply formulas only to the first row (enough for headers, later copied for line items)
      );
    }

    const sheetFxStartCol = Object.values(payload.settings.sheets[sheetName].columns).length;
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
