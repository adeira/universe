// @flow

import payload from '../../__tests__/fixtures/payload.json';
import settings from '../../__tests__/fixtures/settings.json';
import createHyperFormulaInstance from '../../createHyperFormulaInstance';

let hfInstance;
let sheetId;
beforeAll(() => {
  hfInstance = createHyperFormulaInstance({ ...payload, settings });
  sheetId = hfInstance.getSheetId(hfInstance.addSheet('__tests__'));
});

afterAll(() => {
  hfInstance.destroy();
});

describe('REGEXEXTRACT', () => {
  it('works as expected', () => {
    expect(
      hfInstance.calculateFormula(
        '=REGEXEXTRACT("My favorite number is 241, but my friend\'s is 17", "\\d+")',
        sheetId,
      ),
    ).toBe('241');

    expect(hfInstance.calculateFormula('=REGEXEXTRACT("Google Doc 101", "[0-9]+")', sheetId)).toBe(
      '101',
    );

    expect(
      hfInstance.calculateFormula(
        '=REGEXEXTRACT("The price today is $826.25", "[0-9]*\\.[0-9]+[0-9]+")',
        sheetId,
      ),
    ).toBe('826.25');

    expect(
      hfInstance.calculateFormula(
        '=REGEXEXTRACT("(Content) between brackets", "\\(([A-Za-z]+)\\)")',
        sheetId,
      ),
    ).toBe('Content');

    expect(hfInstance.calculateFormula('=REGEXEXTRACT("nothing", "something")', sheetId)).toBe('');
  });
});

describe('REGEXMATCH', () => {
  it('works as expected', () => {
    expect(hfInstance.calculateFormula('=REGEXMATCH("Spreadsheets", "S.r")', sheetId)).toBe(true);
    expect(hfInstance.calculateFormula('=REGEXMATCH("Spreadsheets", "S.rX")', sheetId)).toBe(false);

    expect(hfInstance.calculateFormula('=REGEXMATCH("Google Doc 101", "[0-9]+")', sheetId)).toBe(
      true,
    );

    expect(
      hfInstance.calculateFormula(
        '=REGEXMATCH("The price today is $826.25", "[0-9]*\\.[0-9]+[0-9]+")',
        sheetId,
      ),
    ).toBe(true);

    expect(
      hfInstance.calculateFormula(
        '=REGEXMATCH("(Content) between brackets", "\\(([A-Za-z]+)\\)")',
        sheetId,
      ),
    ).toBe(true);
  });
});

describe('REGEXREPLACE', () => {
  it('works as expected', () => {
    expect(
      hfInstance.calculateFormula('=REGEXREPLACE("Spreadsheets", "S.*d", "Bed")', sheetId),
    ).toBe('Bedsheets');

    expect(
      hfInstance.calculateFormula('=REGEXREPLACE("Google Doc 101", "[0-9]+", "777")', sheetId),
    ).toBe('Google Doc 777');

    expect(
      hfInstance.calculateFormula(
        '=REGEXREPLACE("The price today is $826.25", "[0-9]*\\.[0-9]+[0-9]+", "315.75")',
        sheetId,
      ),
    ).toBe('The price today is $315.75');

    expect(
      hfInstance.calculateFormula(
        '=REGEXREPLACE("(Content) between brackets", "\\(([A-Za-z]+)\\)", "Word")',
        sheetId,
      ),
    ).toBe('Word between brackets');
  });

  it('replaces all occurrences', () => {
    expect(
      hfInstance.calculateFormula('=REGEXREPLACE("<>123:45*6", "[^a-zA-Z\\d]", "")', sheetId),
    ).toBe('123456');
  });
});
