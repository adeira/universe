// @flow

export default function getOptions(fixtureFile: string): any {
  switch (fixtureFile) {
    case 'custom-font.js':
      return {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              mono: '"Courier New"',
            },
          },
        },
      };

    default:
      return {};
  }
}
