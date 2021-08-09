// @flow

import expandMarginPadding from '../expandMarginPadding';
import expandShorthandProperties from '../../expandShorthandProperties';
import printNodes from './printNodes';

describe('physical margins and paddings', () => {
  it('expands margins and paddings with single number as expected', () => {
    expect(expandMarginPadding('margin', 0)).toEqual(expandShorthandProperties('margin', 0, ''));
    expect(expandMarginPadding('margin', 0).map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._4pgUgJ{margin-top:0px}",
        "._37wPvZ{margin-right:0px}",
        "._32zari{margin-bottom:0px}",
        "._3DMcik{margin-left:0px}",
      ]
    `);

    expect(expandMarginPadding('padding', 0)).toEqual(expandShorthandProperties('padding', 0, ''));
    expect(expandMarginPadding('padding', 0).map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._2YU8Lt{padding-top:0px}",
        "._1b3SDU{padding-right:0px}",
        "._4vQ4Ez{padding-bottom:0px}",
        "._1lfgYw{padding-left:0px}",
      ]
    `);
  });

  it('expands margins and paddings with single string value as expected', () => {
    expect(expandMarginPadding('margin', '10px')).toEqual(
      expandShorthandProperties('margin', '10px', ''),
    );
    expect(expandMarginPadding('margin', '10px').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._3sgLnu{margin-top:10px}",
        "._42OSNq{margin-right:10px}",
        "._27cO38{margin-bottom:10px}",
        "._21Xfw8{margin-left:10px}",
      ]
    `);

    expect(expandMarginPadding('padding', '10px')).toEqual(
      expandShorthandProperties('padding', '10px', ''),
    );
    expect(expandMarginPadding('padding', '10px').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._2h8fCA{padding-top:10px}",
        "._18S2bQ{padding-right:10px}",
        "._1Dvao8{padding-bottom:10px}",
        "._3RfpBN{padding-left:10px}",
      ]
    `);
  });

  it('expands margins and paddings with two values as expected', () => {
    expect(expandMarginPadding('margin', '10px 20px')).toEqual(
      expandShorthandProperties('margin', '10px 20px', ''),
    );
    expect(expandMarginPadding('margin', '10px 20px').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._3sgLnu{margin-top:10px}",
        "._4098WN{margin-right:20px}",
        "._27cO38{margin-bottom:10px}",
        "._1yVWfq{margin-left:20px}",
      ]
    `);

    expect(expandMarginPadding('padding', '10px 20px')).toEqual(
      expandShorthandProperties('padding', '10px 20px', ''),
    );
    expect(expandMarginPadding('padding', '10px 20px').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._2h8fCA{padding-top:10px}",
        "._3PTJRo{padding-right:20px}",
        "._1Dvao8{padding-bottom:10px}",
        "._2EBnAo{padding-left:20px}",
      ]
    `);
  });

  it('expands margins and paddings with three values as expected', () => {
    expect(expandMarginPadding('margin', '10px 20px 30px')).toEqual(
      expandShorthandProperties('margin', '10px 20px 30px', ''),
    );
    expect(expandMarginPadding('margin', '10px 20px 30px').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._3sgLnu{margin-top:10px}",
        "._4098WN{margin-right:20px}",
        "._2ynoCr{margin-bottom:30px}",
        "._1yVWfq{margin-left:20px}",
      ]
    `);

    expect(expandMarginPadding('padding', '10px 20px 30px')).toEqual(
      expandShorthandProperties('padding', '10px 20px 30px', ''),
    );
    expect(expandMarginPadding('padding', '10px 20px 30px').map(printNodes)).toMatchInlineSnapshot(`
      Array [
        "._2h8fCA{padding-top:10px}",
        "._3PTJRo{padding-right:20px}",
        "._2iKTDO{padding-bottom:30px}",
        "._2EBnAo{padding-left:20px}",
      ]
    `);
  });

  it('expands margins and paddings with four values as expected', () => {
    expect(expandMarginPadding('margin', '10px 20px 30px 40px')).toEqual(
      expandShorthandProperties('margin', '10px 20px 30px 40px', ''),
    );
    expect(expandMarginPadding('margin', '10px 20px 30px 40px').map(printNodes))
      .toMatchInlineSnapshot(`
        Array [
          "._3sgLnu{margin-top:10px}",
          "._4098WN{margin-right:20px}",
          "._2ynoCr{margin-bottom:30px}",
          "._2frFkL{margin-left:40px}",
        ]
      `);

    expect(expandMarginPadding('padding', '10px 20px 30px 40px')).toEqual(
      expandShorthandProperties('padding', '10px 20px 30px 40px', ''),
    );
    expect(expandMarginPadding('padding', '10px 20px 30px 40px').map(printNodes))
      .toMatchInlineSnapshot(`
        Array [
          "._2h8fCA{padding-top:10px}",
          "._3PTJRo{padding-right:20px}",
          "._2iKTDO{padding-bottom:30px}",
          "._3I54Zi{padding-left:40px}",
        ]
      `);
  });
});

describe('logical margins and paddings', () => {
  describe('block', () => {
    it('expands margins and paddings with single number as expected', () => {
      expect(expandMarginPadding('marginBlock', 0)).toEqual(
        expandShorthandProperties('marginBlock', 0, ''),
      );
      expect(expandMarginPadding('marginBlock', 0).map(printNodes)).toMatchInlineSnapshot(`
        Array [
          "._25SxSQ{margin-block-start:0px}",
          "._158wp2{margin-block-end:0px}",
        ]
      `);

      expect(expandMarginPadding('paddingBlock', 0)).toEqual(
        expandShorthandProperties('paddingBlock', 0, ''),
      );
      expect(expandMarginPadding('paddingBlock', 0).map(printNodes)).toMatchInlineSnapshot(`
        Array [
          "._1O81fK{padding-block-start:0px}",
          ".SUXP0{padding-block-end:0px}",
        ]
      `);
    });

    it('expands margins and paddings with single string value as expected', () => {
      expect(expandMarginPadding('marginBlock', '10px')).toEqual(
        expandShorthandProperties('marginBlock', '10px', ''),
      );
      expect(expandMarginPadding('marginBlock', '10px').map(printNodes)).toMatchInlineSnapshot(`
        Array [
          "._1nc20y{margin-block-start:10px}",
          "._2l302d{margin-block-end:10px}",
        ]
      `);

      expect(expandMarginPadding('paddingBlock', '10px')).toEqual(
        expandShorthandProperties('paddingBlock', '10px', ''),
      );
      expect(expandMarginPadding('paddingBlock', '10px').map(printNodes)).toMatchInlineSnapshot(`
        Array [
          ".GxDBi{padding-block-start:10px}",
          "._24iYWp{padding-block-end:10px}",
        ]
      `);
    });

    it('expands margins and paddings with two values as expected', () => {
      expect(expandMarginPadding('marginBlock', '10px 20px')).toEqual(
        expandShorthandProperties('marginBlock', '10px 20px', ''),
      );
      expect(expandMarginPadding('marginBlock', '10px 20px').map(printNodes))
        .toMatchInlineSnapshot(`
          Array [
            "._1nc20y{margin-block-start:10px}",
            "._1pDbp4{margin-block-end:20px}",
          ]
        `);

      expect(expandMarginPadding('paddingBlock', '10px 20px')).toEqual(
        expandShorthandProperties('paddingBlock', '10px 20px', ''),
      );
      expect(expandMarginPadding('paddingBlock', '10px 20px').map(printNodes))
        .toMatchInlineSnapshot(`
          Array [
            ".GxDBi{padding-block-start:10px}",
            "._2oCq2r{padding-block-end:20px}",
          ]
        `);
    });

    it('throws on margins and paddings with three values', () => {
      expect(() =>
        expandMarginPadding('marginBlock', '10px 20px 30px'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Logical property \\"marginBlock\\" cannot have more than 2 values (got 3: \\"10px 20px 30px\\")."`,
      );

      expect(() =>
        expandMarginPadding('paddingBlock', '10px 20px 30px'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Logical property \\"paddingBlock\\" cannot have more than 2 values (got 3: \\"10px 20px 30px\\")."`,
      );
    });

    it('throws on margins and paddings with four values', () => {
      expect(() =>
        expandMarginPadding('marginBlock', '10px 20px 30px 40px'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Logical property \\"marginBlock\\" cannot have more than 2 values (got 4: \\"10px 20px 30px 40px\\")."`,
      );

      expect(() =>
        expandMarginPadding('paddingBlock', '10px 20px 30px 40px'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Logical property \\"paddingBlock\\" cannot have more than 2 values (got 4: \\"10px 20px 30px 40px\\")."`,
      );
    });
  });

  describe('inline', () => {
    it('expands margins and paddings with single number as expected', () => {
      expect(expandMarginPadding('marginInline', 0)).toEqual(
        expandShorthandProperties('marginInline', 0, ''),
      );
      expect(expandMarginPadding('marginInline', 0).map(printNodes)).toMatchInlineSnapshot(`
        Array [
          "._1DdmZI{margin-inline-start:0px}",
          "._1eBmRo{margin-inline-end:0px}",
        ]
      `);

      expect(expandMarginPadding('paddingInline', 0)).toEqual(
        expandShorthandProperties('paddingInline', 0, ''),
      );
      expect(expandMarginPadding('paddingInline', 0).map(printNodes)).toMatchInlineSnapshot(`
        Array [
          "._4pSWz9{padding-inline-start:0px}",
          "._408iOB{padding-inline-end:0px}",
        ]
      `);
    });

    it('expands margins and paddings with single string value as expected', () => {
      expect(expandMarginPadding('marginInline', '10px')).toEqual(
        expandShorthandProperties('marginInline', '10px', ''),
      );
      expect(expandMarginPadding('marginInline', '10px').map(printNodes)).toMatchInlineSnapshot(`
        Array [
          ".yzECG{margin-inline-start:10px}",
          "._3A63S0{margin-inline-end:10px}",
        ]
      `);

      expect(expandMarginPadding('paddingInline', '10px')).toEqual(
        expandShorthandProperties('paddingInline', '10px', ''),
      );
      expect(expandMarginPadding('paddingInline', '10px').map(printNodes)).toMatchInlineSnapshot(`
        Array [
          "._4rhIVJ{padding-inline-start:10px}",
          "._2NdLFn{padding-inline-end:10px}",
        ]
      `);
    });

    it('expands margins and paddings with two values as expected', () => {
      expect(expandMarginPadding('marginInline', '10px 20px')).toEqual(
        expandShorthandProperties('marginInline', '10px 20px', ''),
      );
      expect(expandMarginPadding('marginInline', '10px 20px').map(printNodes))
        .toMatchInlineSnapshot(`
          Array [
            ".yzECG{margin-inline-start:10px}",
            "._4ySuLD{margin-inline-end:20px}",
          ]
        `);

      expect(expandMarginPadding('paddingInline', '10px 20px')).toEqual(
        expandShorthandProperties('paddingInline', '10px 20px', ''),
      );
      expect(expandMarginPadding('paddingInline', '10px 20px').map(printNodes))
        .toMatchInlineSnapshot(`
          Array [
            "._4rhIVJ{padding-inline-start:10px}",
            "._216A2m{padding-inline-end:20px}",
          ]
        `);
    });

    it('throws on margins and paddings with three values', () => {
      expect(() =>
        expandMarginPadding('marginInline', '10px 20px 30px'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Logical property \\"marginInline\\" cannot have more than 2 values (got 3: \\"10px 20px 30px\\")."`,
      );

      expect(() =>
        expandMarginPadding('paddingInline', '10px 20px 30px'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Logical property \\"paddingInline\\" cannot have more than 2 values (got 3: \\"10px 20px 30px\\")."`,
      );
    });

    it('throws on margins and paddings with four values', () => {
      expect(() =>
        expandMarginPadding('marginInline', '10px 20px 30px 40px'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Logical property \\"marginInline\\" cannot have more than 2 values (got 4: \\"10px 20px 30px 40px\\")."`,
      );

      expect(() =>
        expandMarginPadding('paddingInline', '10px 20px 30px 40px'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Logical property \\"paddingInline\\" cannot have more than 2 values (got 4: \\"10px 20px 30px 40px\\")."`,
      );
    });
  });
});
