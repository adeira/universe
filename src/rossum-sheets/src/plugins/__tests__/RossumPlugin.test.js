// @flow

import createMockPayload from '../../__tests__/createMockPayload';
import payload from '../../__tests__/fixtures/payload.json';
import settings from '../../__tests__/fixtures/settings.json';
import createHyperFormulaInstance from '../../createHyperFormulaInstance';

let hfInstance;
let sheetId;
beforeAll(() => {
  globalThis.__rossum_payload__ = payload; // TODO: should this be done in `createHyperFormulaInstance`?
  hfInstance = createHyperFormulaInstance({ ...payload, settings });
  // hfInstance = createHyperFormulaInstance(createMockPayload({ sheets: {} }));
  sheetId = hfInstance.getSheetId(hfInstance.addSheet('__tests__'));
});

afterAll(() => {
  hfInstance.destroy();
});

describe('ROSSUM.DP', () => {
  it('returns datapoint value', () => {
    expect(hfInstance.calculateFormula('=ROSSUM.DP("document_id")', sheetId)).toBe('123456');
  });

  it('normalizes datapoint value', () => {
    expect(hfInstance.calculateFormula('=ROSSUM.DP("document_id", true)', sheetId)).toBe('123456'); // TODO: better test with better value
  });
});

describe('ROSSUM.DP_CONFIDENCE', () => {
  it('returns confidence score', () => {
    expect(hfInstance.calculateFormula('=ROSSUM.DP_CONFIDENCE("document_id")', sheetId)).toBe(
      0.949393730634665,
    );
  });
});

describe('ROSSUM.DP_VALIDATION_SOURCES', () => {
  it('returns validation sources', () => {
    expect(hfInstance.calculateFormula('=ROSSUM.DP_VALIDATION_SOURCES("notes")', sheetId)).toBe(
      'non_required',
    );

    expect(
      hfInstance.calculateFormula(
        '=MATCH("non_required", ROSSUM.DP_VALIDATION_SOURCES("notes"))',
        sheetId,
      ),
    ).toBe(1);
  });
});

describe('ROSSUM.PAYLOAD', () => {
  it('returns annotation details', () => {
    expect(
      hfInstance.calculateFormula('=ROSSUM.PAYLOAD("annotation.url")', sheetId),
    ).toMatchInlineSnapshot(`"https://api.elis.rossum.ai/v1/annotations/45455385"`);
  });

  it('returns document details', () => {
    expect(
      hfInstance.calculateFormula('=ROSSUM.PAYLOAD("document.url")', sheetId),
    ).toMatchInlineSnapshot(`"https://api.elis.rossum.ai/v1/documents/49064686"`);
  });
});
