// @flow

const styleImprovements = document.createElement('style');

// TODO: apply only on /settings/extensions/logs (?)
styleImprovements.textContent = `
  div:has(> ul.MuiMenu-list) {
    min-width: 400px !important;
  }`;

document.head?.appendChild(styleImprovements);
