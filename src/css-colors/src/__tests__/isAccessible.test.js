// @flow

import isAccessible from '../isAccessible';

it.each`
  foreground         | background         | context                | AA       | AAA
  ${[0, 0, 0]}       | ${[255, 255, 255]} | ${'NORMAL_TEXT'}       | ${true}  | ${true}
  ${[0, 0, 0]}       | ${[255, 255, 255]} | ${'LARGE_TEXT'}        | ${true}  | ${true}
  ${[0, 0, 0]}       | ${[255, 255, 255]} | ${'GRAPHICAL_OBJECTS'} | ${true}  | ${true}
  ${[255, 255, 255]} | ${[0, 0, 0]}       | ${'NORMAL_TEXT'}       | ${true}  | ${true}
  ${[255, 255, 255]} | ${[0, 0, 0]}       | ${'LARGE_TEXT'}        | ${true}  | ${true}
  ${[255, 255, 255]} | ${[0, 0, 0]}       | ${'GRAPHICAL_OBJECTS'} | ${true}  | ${true}
  ${[0, 0, 0]}       | ${[0, 0, 0]}       | ${'NORMAL_TEXT'}       | ${false} | ${false}
  ${[0, 0, 0]}       | ${[0, 0, 0]}       | ${'LARGE_TEXT'}        | ${false} | ${false}
  ${[0, 0, 0]}       | ${[0, 0, 0]}       | ${'GRAPHICAL_OBJECTS'} | ${false} | ${false}
  ${[255, 255, 255]} | ${[255, 255, 255]} | ${'NORMAL_TEXT'}       | ${false} | ${false}
  ${[255, 255, 255]} | ${[255, 255, 255]} | ${'LARGE_TEXT'}        | ${false} | ${false}
  ${[255, 255, 255]} | ${[255, 255, 255]} | ${'GRAPHICAL_OBJECTS'} | ${false} | ${false}
  ${[64, 32, 17]}    | ${[201, 120, 136]} | ${'NORMAL_TEXT'}       | ${true}  | ${false}
  ${[64, 32, 17]}    | ${[201, 120, 136]} | ${'LARGE_TEXT'}        | ${true}  | ${true}
  ${[64, 32, 17]}    | ${[201, 120, 136]} | ${'GRAPHICAL_OBJECTS'} | ${true}  | ${true}
  ${[77, 38, 20]}    | ${[201, 120, 136]} | ${'NORMAL_TEXT'}       | ${false} | ${false}
  ${[77, 38, 20]}    | ${[201, 120, 136]} | ${'LARGE_TEXT'}        | ${true}  | ${false}
  ${[77, 38, 20]}    | ${[201, 120, 136]} | ${'GRAPHICAL_OBJECTS'} | ${true}  | ${true}
`(
  '$foreground on $background in $context context results in AA:$AA and AAA:$AAA',
  ({ foreground, background, context, AA, AAA }) => {
    expect(isAccessible(foreground, background, context, 'AA')).toBe(AA);
    expect(isAccessible(foreground, background, context, 'AAA')).toBe(AAA);
  },
);
