// @flow strict

// All these colors are valid according to:
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
export const validColors = {
  keywords: [
    ['blue', [0, 0, 255]],
    ['aliceblue', [240, 248, 255]],
    ['transparent', null],
    ['currentcolor', null],
  ],
  hexadecimal: [
    ['#f09', [255, 0, 153]],
    ['#F09', [255, 0, 153]],
    ['#ff0099', [255, 0, 153]],
    ['#FF0099', [255, 0, 153]],
    ['#f09f', null],
    ['#F09F', null],
    ['#ff0099ff', null],
    ['#FF0099FF', null],
  ],
  functional: [
    // RGB:
    ['rgb(255, 0, 153)', [255, 0, 153]],
    ['rgb(255, 0, 153.0)', [255, 0, 153]],
    ['rgb(100%, 0%, 60%)', [255, 0, 153]],
    ['rgb(255 0 153)', [255, 0, 153]],
    ['rgb(255, 0, 153, 1)', [255, 0, 153]], // TODO: we ignore the alpha channel
    ['rgb(255, 0, 153, 100%)', [255, 0, 153]], // TODO: we ignore the alpha channel
    ['rgb(255 0 153/1)', [255, 0, 153]], // TODO: we ignore the alpha channel
    ['rgb(255 0 153 / 1)', [255, 0, 153]], // TODO: we ignore the alpha channel
    ['rgb(255 0 153 / 100%)', [255, 0, 153]], // TODO: we ignore the alpha channel
    ['rgb(255, 0, 153.6, 1)', [255, 0, 153.6]], // TODO: we ignore the alpha channel
    ['rgb(1e2, .5e1, .5e0, +.25e2%)', [100, 5, 0.5]], // TODO: we ignore the alpha channel

    // RGBA:
    ['rgba(51, 170, 51, .1)', [51, 170, 51]], // TODO: we ignore the alpha channel
    ['rgba(51, 170, 51, .4)', [51, 170, 51]], // TODO: we ignore the alpha channel
    ['rgba(51, 170, 51, .7)', [51, 170, 51]], // TODO: we ignore the alpha channel
    ['rgba(51, 170, 51, 1)', [51, 170, 51]], // TODO: we ignore the alpha channel
    ['rgba(51 170 51 / 0.4)', [51, 170, 51]], // TODO: we ignore the alpha channel
    ['rgba(51 170 51 / 40%)', [51, 170, 51]], // TODO: we ignore the alpha channel
    ['rgba(255, 0, 153.6, 1)', [255, 0, 153.6]], // TODO: we ignore the alpha channel
    ['rgba(1e2, .5e1, .5e0, +.25e2%)', [100, 5, 0.5]], // TODO: we ignore the alpha channel

    // HSL:
    ['hsl(270, 60%, 70%)', null],
    ['hsl(270 60% 70%)', null],
    ['hsl(270deg, 60%, 70%)', null],
    ['hsl(4.71239rad, 60%, 70%)', null],
    ['hsl(.75turn, 60%, 70%)', null],
    ['hsl(270, 60%, 50%, .15)', null],
    ['hsl(270, 60%, 50%, 15%)', null],
    ['hsl(270 60% 50%/.15)', null],
    ['hsl(270 60% 50% / .15)', null],
    ['hsl(270 60% 50% / 15%)', null],

    // HSLA:
    ['hsla(270, 60%, 70%)', null],
    ['hsla(270 60% 70%)', null],
    ['hsla(270deg, 60%, 70%)', null],
    ['hsla(4.71239rad, 60%, 70%)', null],
    ['hsla(.75turn, 60%, 70%)', null],
    ['hsla(270, 60%, 50%, .15)', null],
    ['hsla(270, 60%, 50%, 15%)', null],
    ['hsla(270 60% 50% / .15)', null],
    ['hsla(270 60% 50% / 15%)', null],
  ],
};
